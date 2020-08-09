import {
  Guild,
  GuildChannel,
  Message,
  Snowflake,
  TextChannel,
} from "discord.js";
import admin from "firebase-admin";
import _ from "lodash";
import { forkJoin, Observable, of } from "rxjs";
import { mapTo, mergeMap, take } from "rxjs/operators";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { getRandomValueFromEnum } from "../../../functions/randoms/get-random-value-from-enum";
import { AppConfigService } from "../../app/services/config/app-config.service";
import { isDiscordGuildChannel } from "../../discord/channels/functions/is-discord-guild-channel";
import { isDiscordGuildChannelWritable } from "../../discord/channels/functions/types/is-discord-guild-channel-writable";
import { DiscordChannelGuildService } from "../../discord/channels/services/discord-channel-guild.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../discord/guilds/enums/discord-guild-sonia-channel-name.enum";
import { isDiscordGuild } from "../../discord/guilds/functions/is-discord-guild";
import { DiscordGuildSoniaService } from "../../discord/guilds/services/discord-guild-sonia.service";
import { DiscordGuildService } from "../../discord/guilds/services/discord-guild.service";
import { DiscordLoggerErrorService } from "../../discord/logger/services/discord-logger-error.service";
import { IDiscordMessageResponse } from "../../discord/messages/interfaces/discord-message-response";
import { DiscordMessageCommandReleaseNotesService } from "../../discord/messages/services/command/release-notes/discord-message-command-release-notes.service";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseGuildNewVersionResponseEnum } from "../enums/firebase-guild-new-version-response.enum";
import { getUpdatedFirebaseGuildLastReleaseNotesVersion } from "../functions/get-updated-firebase-guild-last-release-notes-version";
import { IFirebaseGuild } from "../types/firebase-guild";
import { FirebaseGuildsBreakingChangeService } from "./firebase-guilds-breaking-change.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import WriteBatch = admin.firestore.WriteBatch;

export class FirebaseGuildsNewVersionService extends AbstractService {
  private static _instance: FirebaseGuildsNewVersionService;

  public static getInstance(): FirebaseGuildsNewVersionService {
    if (_.isNil(FirebaseGuildsNewVersionService._instance)) {
      FirebaseGuildsNewVersionService._instance = new FirebaseGuildsNewVersionService();
    }

    return FirebaseGuildsNewVersionService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _firebaseGuildsService: FirebaseGuildsService = FirebaseGuildsService.getInstance();
  private readonly _discordMessageCommandReleaseNotesService: DiscordMessageCommandReleaseNotesService = DiscordMessageCommandReleaseNotesService.getInstance();
  private readonly _discordGuildService: DiscordGuildService = DiscordGuildService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  private readonly _discordLoggerErrorService: DiscordLoggerErrorService = DiscordLoggerErrorService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();
  private readonly _firebaseGuildsBreakingChangeService: FirebaseGuildsBreakingChangeService = FirebaseGuildsBreakingChangeService.getInstance();

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_SERVICE);
  }

  public init(): void {
    this.sendNewReleaseNotesToEachGuild$().subscribe();
  }

  public isReady$(): Observable<[true]> {
    return forkJoin([this._firebaseGuildsBreakingChangeService.hasFinished()]);
  }

  public sendNewReleaseNotesToEachGuild$(): Observable<true> {
    return this._sendNewReleaseNotesToEachGuild$();
  }

  public sendNewReleaseNotesFromFirebaseGuild(
    firebaseGuild: Readonly<IFirebaseGuild>
  ): Promise<Message | void> {
    if (!_.isNil(firebaseGuild.id)) {
      const guild: Guild | undefined = this._discordGuildService.getGuildById(
        firebaseGuild.id
      );

      if (isDiscordGuild(guild)) {
        return this._sendNewReleaseNotesFromDiscordGuild(guild);
      }

      this._loggerService.error({
        context: this._serviceName,
        message: this._chalkService.text(
          `Discord guild ${this._chalkService.value(
            firebaseGuild.id
          )} does not exists`
        ),
      });

      return Promise.reject(new Error(`Discord guild not found`));
    }

    this._loggerService.error({
      context: this._serviceName,
      message: this._chalkService.text(`Firebase guild id nil`),
    });

    return Promise.reject(new Error(`Firebase guild id nil`));
  }

  private _sendNewReleaseNotesToEachGuild$(): Observable<true> {
    return this.isReady$().pipe(
      take(1),
      mergeMap(
        (): Promise<QuerySnapshot<IFirebaseGuild>> => {
          this._loggerService.debug({
            context: this._serviceName,
            message: this._chalkService.text(
              `processing the sending of release notes to each guild...`
            ),
          });

          return this._firebaseGuildsService.getGuilds();
        }
      ),
      mergeMap(
        (
          querySnapshot: QuerySnapshot<IFirebaseGuild>
        ): Promise<IFirebaseGuild[] | void> => {
          this._loggerService.debug({
            context: this._serviceName,
            message: this._chalkService.text(`guilds fetched`),
          });

          return this._sendNewReleaseNotesToEachGuild(querySnapshot);
        }
      ),
      mergeMap(
        (
          firebaseGuilds: IFirebaseGuild[] | void
        ): Observable<[Message | void] | false> => {
          if (_.isArray(firebaseGuilds)) {
            this._loggerService.debug({
              context: this._serviceName,
              message: this._chalkService.text(
                `sending release notes messages to each guild...`
              ),
            });

            return forkJoin(
              ...firebaseGuilds.map(
                (firebaseGuild: IFirebaseGuild): Promise<Message | void> => {
                  return this.sendNewReleaseNotesFromFirebaseGuild(
                    firebaseGuild
                  );
                }
              )
            );
          }

          return of(false);
        }
      ),
      mapTo(true)
    );
  }

  private _sendNewReleaseNotesToEachGuild(
    querySnapshot: QuerySnapshot<IFirebaseGuild>
  ): Promise<IFirebaseGuild[] | void> {
    const batch:
      | WriteBatch
      | undefined = this._firebaseGuildsService.getBatch();

    if (!_.isNil(batch)) {
      const firebaseGuilds: IFirebaseGuild[] = [];
      let countFirebaseGuildsUpdated = 0;
      let countFirebaseGuilds = 0;

      querySnapshot.forEach(
        (
          queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>
        ): void => {
          if (_.isEqual(queryDocumentSnapshot.exists, true)) {
            countFirebaseGuilds = _.add(countFirebaseGuilds, 1);
            const firebaseGuild: IFirebaseGuild = queryDocumentSnapshot.data();

            if (
              this._shouldSendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
            ) {
              countFirebaseGuildsUpdated = _.add(countFirebaseGuildsUpdated, 1);

              batch.update(
                queryDocumentSnapshot.ref,
                getUpdatedFirebaseGuildLastReleaseNotesVersion(
                  this._appConfigService.getVersion()
                )
              );
              firebaseGuilds.push(firebaseGuild);
            }
          }
        }
      );

      if (_.gt(countFirebaseGuildsUpdated, 0)) {
        this._loggerService.log({
          context: this._serviceName,
          message: this._chalkService.text(
            `updating ${this._chalkService.value(
              countFirebaseGuildsUpdated
            )} Firebase guild${
              _.gt(countFirebaseGuildsUpdated, 1) ? `s` : ``
            }...`
          ),
        });

        return batch
          .commit()
          .then(
            (): Promise<IFirebaseGuild[]> => {
              return Promise.resolve(firebaseGuilds);
            }
          )
          .catch(
            (error: Error): Promise<void> => {
              return Promise.reject(error);
            }
          );
      }

      this._loggerService.log({
        context: this._serviceName,
        message: this._chalkService.text(
          `all Firebase guild${
            _.gt(countFirebaseGuilds, 1) ? `s` : ``
          } ${this._chalkService.hint(
            `(${countFirebaseGuilds})`
          )} release notes already sent`
        ),
      });

      return Promise.resolve();
    }

    this._loggerService.error({
      context: this._serviceName,
      message: this._chalkService.text(`Firebase guilds batch not available`),
    });

    return Promise.reject(new Error(`Firebase guilds batch not available`));
  }

  private _sendNewReleaseNotesFromDiscordGuild(
    guild: Readonly<Guild>
  ): Promise<Message | void> {
    const guildChannel: GuildChannel | null = this._discordChannelGuildService.getPrimary(
      guild
    );

    if (isDiscordGuildChannel(guildChannel)) {
      if (isDiscordGuildChannelWritable(guildChannel)) {
        return this._sendNewReleaseNotesFromDiscordChannel(
          guildChannel,
          guild.id
        );
      }
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(
          `guild ${this._chalkService.value(
            guild.id
          )} primary channel is not writable`
        ),
      });

      return Promise.reject(new Error(`Primary channel not writable`));
    }

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `guild ${this._chalkService.value(
          guild.id
        )} does not have a primary channel`
      ),
    });

    return Promise.reject(new Error(`Primary channel not found`));
  }

  private _sendNewReleaseNotesFromDiscordChannel(
    textChannel: Readonly<TextChannel>,
    guildId: Readonly<Snowflake>
  ): Promise<Message | void> {
    const messageResponse: IDiscordMessageResponse = this._discordMessageCommandReleaseNotesService.getMessageResponse();
    messageResponse.response =
      getRandomValueFromEnum(FirebaseGuildNewVersionResponseEnum) || `Cool!`;

    return textChannel
      .send(messageResponse.response, messageResponse.options)
      .then(
        (message: Message): Promise<Message> => {
          this._loggerService.log({
            context: this._serviceName,
            message: this._chalkService.text(
              `release notes message sent for guild ${this._chalkService.value(
                guildId
              )} on general channel`
            ),
          });

          return Promise.resolve(message);
        }
      )
      .catch(
        (error: Readonly<Error | string>): Promise<void> => {
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(
              `release notes message sending failed for the guild ${guildId} on the general channel`
            ),
          });
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.error(error),
          });
          this._discordGuildSoniaService.sendMessageToChannel({
            channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
            messageResponse: this._discordLoggerErrorService.getErrorMessageResponse(
              error
            ),
          });

          return Promise.reject(error);
        }
      );
  }

  private _shouldSendNewReleaseNotesFromFirebaseGuild(
    firebaseGuild: Readonly<IFirebaseGuild>
  ): boolean {
    const appVersion: string = this._appConfigService.getVersion();

    return !_.isEqual(firebaseGuild.lastReleaseNotesVersion, appVersion);
  }
}
