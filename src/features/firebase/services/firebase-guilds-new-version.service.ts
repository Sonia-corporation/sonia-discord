import {
  Guild,
  GuildChannel,
  Message,
  Snowflake,
  TextChannel,
} from "discord.js";
import admin from "firebase-admin";
import _ from "lodash";
import { forkJoin, Observable } from "rxjs";
import { mergeMap, take, tap } from "rxjs/operators";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
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
import { DiscordClientService } from "../../discord/services/discord-client.service";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../logger/services/logger.service";
import { IFirebaseGuild } from "../types/firebase-guild";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;

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
  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_SERVICE);
  }

  public init(): void {
    this.sendNewReleaseNotesToEachGuild$().subscribe();
  }

  public isReady$(): Observable<[true, true]> {
    return forkJoin([
      this._firebaseGuildsService.isReady(),
      this._discordClientService.isReady(),
    ]);
  }

  public sendNewReleaseNotesToEachGuild$(): Observable<unknown> {
    return this._sendNewReleaseNotesToEachGuild$();
  }

  private _sendNewReleaseNotesToEachGuild$(): Observable<unknown> {
    return this.isReady$().pipe(
      take(1),
      tap({
        next: (): void => {
          this._loggerService.debug({
            context: this._serviceName,
            message: this._chalkService.text(
              `sending release notes to each guild...`
            ),
          });
        },
      }),
      mergeMap(
        (): Promise<QuerySnapshot<IFirebaseGuild>> => {
          return this._firebaseGuildsService.getGuilds();
        }
      ),
      tap({
        next: (querySnapshot: QuerySnapshot<IFirebaseGuild>): void => {
          this._loggerService.debug({
            context: this._serviceName,
            message: this._chalkService.text(`guilds fetched`),
          });
          this._sendNewReleaseNotesToEachGuild(querySnapshot);
        },
      })
    );
  }

  private _sendNewReleaseNotesToEachGuild(
    querySnapshot: QuerySnapshot<IFirebaseGuild>
  ): void {
    querySnapshot.forEach(
      (queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>): void => {
        if (_.isEqual(queryDocumentSnapshot.exists, true)) {
          this._sendNewReleaseNotesFromFirebaseGuild(
            queryDocumentSnapshot.data()
          ).catch();
        }
      }
    );
  }

  private _sendNewReleaseNotesFromFirebaseGuild(
    firebaseGuild: Readonly<IFirebaseGuild>
  ): Promise<Message | void> {
    if (!_.isNil(firebaseGuild.id)) {
      const guild: Guild | undefined = this._discordGuildService.getGuildById(
        firebaseGuild.id
      );

      if (isDiscordGuild(guild)) {
        return this._sendNewReleaseNotesFromDiscordGuild(guild);
      }
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(
          `Discord guild ${firebaseGuild.id} does not exists`
        ),
      });

      return Promise.reject(new Error(`Discord guild not found`));
    }

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`Firebase guild id nil`),
    });

    return Promise.reject(new Error(`Firebase guild id nil`));
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
          `guild ${guild.id} primary channel is not writable`
        ),
      });

      return Promise.reject(new Error(`Primary channel not writable`));
    }

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `guild ${guild.id} does not have a primary channel`
      ),
    });

    return Promise.reject(new Error(`Primary channel not found`));
  }

  private _sendNewReleaseNotesFromDiscordChannel(
    textChannel: Readonly<TextChannel>,
    guildId: Readonly<Snowflake>
  ): Promise<Message | void> {
    const messageResponse: IDiscordMessageResponse = this._discordMessageCommandReleaseNotesService.getMessageResponse();
    messageResponse.response = `hello!`;

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
}
