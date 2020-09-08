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
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ONE_EMITTER } from "../../../../constants/one-emitter";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { isDiscordGuildChannelWritable } from "../../../discord/channels/functions/types/is-discord-guild-channel-writable";
import { DiscordChannelGuildService } from "../../../discord/channels/services/discord-channel-guild.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../../discord/guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildSoniaService } from "../../../discord/guilds/services/discord-guild-sonia.service";
import { DiscordGuildService } from "../../../discord/guilds/services/discord-guild.service";
import { DiscordLoggerErrorService } from "../../../discord/logger/services/discord-logger-error.service";
import { wrapUserIdIntoMention } from "../../../discord/mentions/functions/wrap-user-id-into-mention";
import { IDiscordMessageResponse } from "../../../discord/messages/interfaces/discord-message-response";
import { DiscordMessageCommandReleaseNotesService } from "../../../discord/messages/services/command/release-notes/discord-message-command-release-notes.service";
import { DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES } from "../../../discord/users/constants/discord-github-contributors-id-messages";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES } from "../../constants/guilds/firebase-guild-new-version-response-messages";
import { getUpdatedFirebaseGuildLastReleaseNotesVersion } from "../../functions/guilds/get-updated-firebase-guild-last-release-notes-version";
import { hasFirebaseGuildLastReleaseNotesVersion } from "../../functions/guilds/checks/has-firebase-guild-last-release-notes-version";
import { IFirebaseGuild } from "../../types/guilds/firebase-guild";
import { FirebaseGuildsBreakingChangeService } from "./firebase-guilds-breaking-change.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import WriteBatch = admin.firestore.WriteBatch;

const NO_GUILD = 0;
const ONE_GUILD = 1;

export class FirebaseGuildsNewVersionService extends AbstractService {
  private static _instance: FirebaseGuildsNewVersionService;

  public static getInstance(): FirebaseGuildsNewVersionService {
    if (_.isNil(FirebaseGuildsNewVersionService._instance)) {
      FirebaseGuildsNewVersionService._instance = new FirebaseGuildsNewVersionService();
    }

    return FirebaseGuildsNewVersionService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_SERVICE);
  }

  public init(): void {
    this.sendNewReleaseNotesToEachGuild$().subscribe();
  }

  public isReady$(): Observable<[true]> {
    return forkJoin([
      FirebaseGuildsBreakingChangeService.getInstance().hasFinished(),
    ]);
  }

  public sendNewReleaseNotesToEachGuild$(): Observable<true> {
    return this._sendNewReleaseNotesToEachGuild$();
  }

  public sendNewReleaseNotesFromFirebaseGuild({
    id,
  }: Readonly<IFirebaseGuild>): Promise<Message | void> {
    if (!_.isNil(id)) {
      const guild:
        | Guild
        | undefined = DiscordGuildService.getInstance().getGuildById(id);

      if (!_.isNil(guild)) {
        return this._sendNewReleaseNotesFromDiscordGuild(guild);
      }

      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Discord guild ${ChalkService.getInstance().value(
            id
          )} does not exists`
        ),
      });

      return Promise.reject(new Error(`Discord guild not found`));
    }

    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase guild id nil`),
    });

    return Promise.reject(new Error(`Firebase guild id nil`));
  }

  private _sendNewReleaseNotesToEachGuild$(): Observable<true> {
    return this.isReady$().pipe(
      take(ONE_EMITTER),
      mergeMap(
        (): Promise<QuerySnapshot<IFirebaseGuild>> => {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `processing the sending of release notes to each guild...`
            ),
          });

          return FirebaseGuildsService.getInstance().getGuilds();
        }
      ),
      mergeMap(
        (
          querySnapshot: QuerySnapshot<IFirebaseGuild>
        ): Promise<IFirebaseGuild[] | void> => {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`guilds fetched`),
          });

          return this._sendNewReleaseNotesToEachGuild(querySnapshot);
        }
      ),
      mergeMap(
        (
          firebaseGuilds: IFirebaseGuild[] | void
        ): Observable<[Message | void] | false> => {
          if (_.isArray(firebaseGuilds)) {
            LoggerService.getInstance().debug({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `sending release notes messages to each guild...`
              ),
            });

            return forkJoin(
              ...firebaseGuilds.map(
                (
                  firebaseGuild: Readonly<IFirebaseGuild>
                ): Promise<Message | void> =>
                  this.sendNewReleaseNotesFromFirebaseGuild(
                    firebaseGuild
                  ).catch(
                    (): Promise<void> => {
                      LoggerService.getInstance().error({
                        context: this._serviceName,
                        message: ChalkService.getInstance().text(
                          `release notes message sending failed for guild ${ChalkService.getInstance().value(
                            firebaseGuild.id
                          )}`
                        ),
                      });

                      return Promise.resolve();
                    }
                  )
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
      | undefined = FirebaseGuildsService.getInstance().getBatch();

    if (!_.isNil(batch)) {
      const firebaseGuilds: IFirebaseGuild[] = [];
      let countFirebaseGuildsUpdated = NO_GUILD;
      let countFirebaseGuilds = NO_GUILD;

      querySnapshot.forEach(
        (
          queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>
        ): void => {
          if (_.isEqual(queryDocumentSnapshot.exists, true)) {
            countFirebaseGuilds = _.add(countFirebaseGuilds, ONE_GUILD);
            const firebaseGuild: IFirebaseGuild = queryDocumentSnapshot.data();

            if (
              this._shouldSendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
            ) {
              countFirebaseGuildsUpdated = _.add(
                countFirebaseGuildsUpdated,
                ONE_GUILD
              );

              batch.update(
                queryDocumentSnapshot.ref,
                getUpdatedFirebaseGuildLastReleaseNotesVersion(
                  AppConfigService.getInstance().getVersion()
                )
              );
              firebaseGuilds.push(firebaseGuild);
            }
          }
        }
      );

      if (_.gte(countFirebaseGuildsUpdated, ONE_GUILD)) {
        LoggerService.getInstance().log({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `updating ${ChalkService.getInstance().value(
              countFirebaseGuildsUpdated
            )} Firebase guild${
              _.gt(countFirebaseGuildsUpdated, ONE_GUILD) ? `s` : ``
            }...`
          ),
        });

        return batch
          .commit()
          .then(
            (): Promise<IFirebaseGuild[]> => Promise.resolve(firebaseGuilds)
          )
          .catch((error: Error): Promise<void> => Promise.reject(error));
      }

      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `all Firebase guild${
            _.gt(countFirebaseGuilds, ONE_GUILD) ? `s` : ``
          } ${ChalkService.getInstance().hint(
            `(${countFirebaseGuilds})`
          )} release notes already sent`
        ),
      });

      return Promise.resolve();
    }

    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guilds batch not available`
      ),
    });

    return Promise.reject(new Error(`Firebase guilds batch not available`));
  }

  private _sendNewReleaseNotesFromDiscordGuild(
    guild: Readonly<Guild>
  ): Promise<Message | void> {
    const guildChannel: GuildChannel | null = DiscordChannelGuildService.getInstance().getPrimary(
      guild
    );

    if (!_.isNil(guildChannel)) {
      if (isDiscordGuildChannelWritable(guildChannel)) {
        return this._sendNewReleaseNotesFromDiscordChannel(
          guildChannel,
          guild.id
        );
      }

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `guild ${ChalkService.getInstance().value(
            guild.id
          )} primary channel is not writable`
        ),
      });

      return Promise.reject(new Error(`Primary channel not writable`));
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `guild ${ChalkService.getInstance().value(
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
    return DiscordMessageCommandReleaseNotesService.getInstance()
      .getMessageResponse()
      .then(
        (
          messageResponse: Readonly<IDiscordMessageResponse>
        ): Promise<Message | void> => {
          const enhanceMessageResponse: IDiscordMessageResponse = _.cloneDeep(
            messageResponse
          );
          enhanceMessageResponse.response = FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage(
            {
              userId: wrapUserIdIntoMention(
                DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()
              ),
            }
          );

          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `sending release notes message for guild ${ChalkService.getInstance().value(
                guildId
              )} on general channel`
            ),
          });

          return textChannel
            .send(
              enhanceMessageResponse.response,
              enhanceMessageResponse.options
            )
            .then(
              (message: Message): Promise<Message> => {
                LoggerService.getInstance().log({
                  context: this._serviceName,
                  message: ChalkService.getInstance().text(
                    `release notes message sent for guild ${ChalkService.getInstance().value(
                      guildId
                    )} on general channel`
                  ),
                });

                return Promise.resolve(message);
              }
            )
            .catch(
              (error: Readonly<Error | string>): Promise<void> => {
                LoggerService.getInstance().error({
                  context: this._serviceName,
                  message: ChalkService.getInstance().text(
                    `release notes message sending failed for the guild ${ChalkService.getInstance().value(
                      guildId
                    )} on the general channel`
                  ),
                });
                LoggerService.getInstance().error({
                  context: this._serviceName,
                  message: ChalkService.getInstance().error(error),
                });
                DiscordGuildSoniaService.getInstance().sendMessageToChannel({
                  channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
                  messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(
                    error
                  ),
                });

                return Promise.reject(error);
              }
            );
        }
      );
  }

  private _shouldSendNewReleaseNotesFromFirebaseGuild(
    firebaseGuild: Readonly<IFirebaseGuild>
  ): boolean {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    if (hasFirebaseGuildLastReleaseNotesVersion(firebaseGuild)) {
      return !_.isEqual(firebaseGuild.lastReleaseNotesVersion, appVersion);
    }

    return true;
  }
}
