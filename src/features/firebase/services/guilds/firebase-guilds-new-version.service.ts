import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService } from './channels/features/release-notes/firebase-guilds-channels-features-release-notes-enabled-state.service';
import { FirebaseGuildsBreakingChangeService } from './firebase-guilds-breaking-change.service';
import { FirebaseGuildsNewVersionCountService } from './firebase-guilds-new-version-count.service';
import { FirebaseGuildsService } from './firebase-guilds.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../../app/enums/app-config-release-type.enum';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { IAppReleaseTypeResponsesFactoryPattern } from '../../../app/types/app-release-type-responses-factory-pattern';
import { isDiscordGuildChannelWritable } from '../../../discord/channels/functions/types/is-discord-guild-channel-writable';
import { DiscordGuildSoniaChannelNameEnum } from '../../../discord/guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { DiscordGuildService } from '../../../discord/guilds/services/discord-guild.service';
import { DiscordLoggerErrorService } from '../../../discord/logger/services/discord-logger-error.service';
import { wrapUserIdIntoMention } from '../../../discord/mentions/functions/wrap-user-id-into-mention';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandReleaseNotesService } from '../../../discord/messages/services/command/release-notes/discord-message-command-release-notes.service';
import { DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES } from '../../../discord/users/constants/discord-github-contributors-id-messages';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-bug-fixes-version-response-messages';
import { FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-features-version-response-messages';
import { FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-performance-improvements-version-response-messages';
import { FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-version-response-messages';
import { hasFirebaseGuildLastReleaseNotesVersion } from '../../functions/guilds/checks/has-firebase-guild-last-release-notes-version';
import { getUpdatedFirebaseGuildLastReleaseNotesVersion } from '../../functions/guilds/get-updated-firebase-guild-last-release-notes-version';
import { isUpToDateFirebaseGuild } from '../../functions/guilds/is-up-to-date-firebase-guild';
import { IFirebaseGuildChannel } from '../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import { Guild, GuildChannel, Message, ThreadChannel } from 'discord.js';
import admin from 'firebase-admin';
import _ from 'lodash';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

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

  public init(): Promise<((Message | null)[] | void)[] | void> {
    return firstValueFrom(this.sendNewReleaseNotesToEachGuild$());
  }

  /**
   * @description
   * Wait Firebase to handle the breaking changes
   * @returns {Observable<[boolean]>} An observable
   */
  public isReady$(): Observable<[true]> {
    return forkJoin([FirebaseGuildsBreakingChangeService.getInstance().hasFinished()]);
  }

  public sendNewReleaseNotesToEachGuild$(): Observable<((Message | null)[] | void)[] | void> {
    return this._sendNewReleaseNotesToEachGuild$().pipe(
      tap({
        next(guildMessages: ((Message | null)[] | void)[] | void): void {
          FirebaseGuildsNewVersionCountService.getInstance().countChannelsAndGuilds(guildMessages);
        },
      })
    );
  }

  public sendNewReleaseNotesFromFirebaseGuild({ id }: Readonly<IFirebaseGuild>): Promise<(Message | null)[]> {
    if (_.isNil(id)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Firebase guild id nil`),
      });

      return Promise.reject(new Error(`Firebase guild id nil`));
    }

    const guild: Guild | undefined = DiscordGuildService.getInstance().getGuildById(id);

    if (_.isNil(guild)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Discord guild ${ChalkService.getInstance().value(id)} does not exists`
        ),
      });

      return Promise.reject(new Error(`Discord guild not found`));
    }

    return this.sendNewReleaseNotesFromDiscordGuild(guild);
  }

  public sendMessageByChannel(
    channel: Readonly<IFirebaseGuildChannel>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    guild: Readonly<Guild>
  ): Promise<Message | void> {
    if (
      !FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService.getInstance().isEnabled(channel, firebaseGuild)
    ) {
      this._logFirebaseGuildChannelReleaseNotesDisabled(guild, channel);

      return Promise.reject(new Error(`Release notes state disabled`));
    }

    this._logFirebaseGuildChannelReleaseNotesEnabled(guild, channel);

    if (_.isNil(channel.id)) {
      return Promise.reject(new Error(`Guild channel id nil!`));
    }

    // TODO add support for ThreadChannel
    const guildOrThreadChannel: GuildChannel | ThreadChannel | undefined = guild.channels.cache.get(channel.id);

    if (_.isNil(guildOrThreadChannel)) {
      this._logInValidDiscordGuildChannel(guild, channel);

      return Promise.reject(new Error(`Guild channel not found`));
    }

    this._logValidDiscordGuildChannel(guild, channel);

    return this.sendMessageResponse(guildOrThreadChannel);
  }

  public async sendMessageResponse(
    guildOrThreadChannel: Readonly<GuildChannel | ThreadChannel>
  ): Promise<Message | void> {
    if (!isDiscordGuildChannelWritable(guildOrThreadChannel)) {
      this._logGuildChannelNotWritable(guildOrThreadChannel);

      return Promise.reject(new Error(`Guild channel not writable`));
    }

    const messageResponse: IDiscordMessageResponse | null = await this.getMessageResponse();

    if (_.isNil(messageResponse)) {
      return Promise.reject(new Error(`No message response fetched`));
    }

    this._logSendingMessagesForReleaseNotes(guildOrThreadChannel);

    return guildOrThreadChannel
      .send({
        ...messageResponse.options,
        content: messageResponse.response,
      })
      .then((message: Message): Promise<Message> => {
        this._logReleaseNotesMessageSent(guildOrThreadChannel);

        return Promise.resolve(message);
      })
      .catch((error: Readonly<string>): Promise<void> => {
        this._onMessageError(error, guildOrThreadChannel);

        return Promise.reject(error);
      });
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse | null> {
    return DiscordMessageCommandReleaseNotesService.getInstance()
      .getMessageResponse()
      .then((messageResponse: Readonly<IDiscordMessageResponse>): Promise<IDiscordMessageResponse> => {
        const enhanceMessageResponse: IDiscordMessageResponse = _.cloneDeep(messageResponse);
        const releaseType: AppConfigReleaseTypeEnum = AppConfigService.getInstance().getReleaseType();
        const responsesFactoryPattern: IAppReleaseTypeResponsesFactoryPattern = {
          [AppConfigReleaseTypeEnum.BUG_FIXES](): string {
            return FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.FEATURES](): string {
            return FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.MIXED](): string {
            return FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS](): string {
            return FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.UNKNOWN](): string {
            return FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
        };

        enhanceMessageResponse.response = responsesFactoryPattern[releaseType]();

        return Promise.resolve(enhanceMessageResponse);
      })
      .catch((): Promise<null> => {
        this._logFetchReleaseNotesCommandMessageResponseError();

        return Promise.resolve(null);
      });
  }

  public sendNewReleaseNotesFromDiscordGuild(guild: Readonly<Guild>): Promise<(Message | null)[]> {
    this._logFetchingFirebaseGuild(guild);

    return FirebaseGuildsService.getInstance()
      .getGuild(guild.id)
      .then((firebaseGuild: Readonly<IFirebaseGuild | null | undefined>): Promise<(Message | null)[]> => {
        this._logFirebaseGuildFetched(guild);

        if (!this.isValidGuild(firebaseGuild)) {
          this._logInvalidFirebaseGuild(guild);

          return Promise.reject(new Error(`Invalid guild`));
        }

        this._logValidFirebaseGuild(guild);

        return Promise.all(
          _.map(
            firebaseGuild.channels,
            (channel: Readonly<IFirebaseGuildChannel>): Promise<Message | null> =>
              this.sendMessageByChannel(channel, firebaseGuild, guild)
                .then((message: Message | void): Promise<Message | null> => {
                  if (message) {
                    return Promise.resolve(message);
                  }

                  return Promise.resolve(null);
                })
                .catch((): Promise<null> => Promise.resolve(null))
          )
        );
      });
  }

  public isValidGuild(
    firebaseGuild: Readonly<IFirebaseGuild | null | undefined>
  ): firebaseGuild is IFirebaseGuildVFinal {
    return !_.isNil(firebaseGuild) && isUpToDateFirebaseGuild(firebaseGuild);
  }

  private _sendNewReleaseNotesToEachGuild$(): Observable<((Message | null)[] | void)[] | void> {
    return this.isReady$().pipe(
      take(ONE_EMITTER),
      mergeMap((): Promise<admin.firestore.QuerySnapshot<IFirebaseGuild>> => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`processing the sending of release notes to each guild...`),
        });

        return FirebaseGuildsService.getInstance().getGuilds();
      }),
      mergeMap((querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>): Promise<IFirebaseGuild[] | void> => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`guilds fetched`),
        });

        return this._sendAndUpdateNewReleaseNotesToEachFirebaseGuild(querySnapshot);
      }),
      mergeMap((firebaseGuilds: IFirebaseGuild[] | void): Promise<((Message | null)[] | void)[] | void> => {
        if (_.isArray(firebaseGuilds)) {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`sending release notes messages to each guild...`),
          });

          const messagePromises: Promise<(Message | null)[] | void>[] = [];

          _.forEach(firebaseGuilds, (firebaseGuild: Readonly<IFirebaseGuild>): void => {
            messagePromises.push(
              this.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild).catch((): Promise<void> => {
                LoggerService.getInstance().error({
                  context: this._serviceName,
                  message: ChalkService.getInstance().text(
                    `release notes message sending failed for guild ${ChalkService.getInstance().value(
                      firebaseGuild.id
                    )}`
                  ),
                });

                return Promise.resolve();
              })
            );
          });

          return Promise.all(messagePromises);
        }

        return Promise.resolve();
      })
    );
  }

  private _sendAndUpdateNewReleaseNotesToEachFirebaseGuild(
    querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>
  ): Promise<IFirebaseGuild[] | void> {
    const batch: admin.firestore.WriteBatch | undefined = FirebaseGuildsService.getInstance().getBatch();

    if (_.isNil(batch)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Firebase guilds batch not available`),
      });

      return Promise.reject(new Error(`Firebase guilds batch not available`));
    }

    const firebaseGuilds: IFirebaseGuild[] = [];
    let countFirebaseGuildsUpdated = NO_GUILD;
    let countFirebaseGuilds = NO_GUILD;

    querySnapshot.forEach((queryDocumentSnapshot: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>): void => {
      if (!_.isEqual(queryDocumentSnapshot.exists, true)) {
        return;
      }

      countFirebaseGuilds = _.add(countFirebaseGuilds, ONE_GUILD);
      const firebaseGuild: IFirebaseGuild = queryDocumentSnapshot.data();

      if (this._shouldSendNewReleaseNotesFromFirebaseGuild(firebaseGuild)) {
        countFirebaseGuildsUpdated = _.add(countFirebaseGuildsUpdated, ONE_GUILD);

        batch.update(
          queryDocumentSnapshot.ref,
          getUpdatedFirebaseGuildLastReleaseNotesVersion(AppConfigService.getInstance().getVersion())
        );
        firebaseGuilds.push(firebaseGuild);
      }
    });

    if (_.gte(countFirebaseGuildsUpdated, ONE_GUILD)) {
      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `updating ${ChalkService.getInstance().value(countFirebaseGuildsUpdated)} Firebase guild${
            _.gt(countFirebaseGuildsUpdated, ONE_GUILD) ? `s` : ``
          }...`
        ),
      });

      return batch
        .commit()
        .then((): Promise<IFirebaseGuild[]> => Promise.resolve(firebaseGuilds))
        .catch((error: Error): Promise<void> => Promise.reject(error));
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `all Firebase guild${_.gt(countFirebaseGuilds, ONE_GUILD) ? `s` : ``} ${ChalkService.getInstance().hint(
          `(${_.toString(countFirebaseGuilds)})`
        )} release notes already sent`
      ),
    });

    return Promise.resolve();
  }

  private _shouldSendNewReleaseNotesFromFirebaseGuild(firebaseGuild: Readonly<IFirebaseGuild>): boolean {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    if (hasFirebaseGuildLastReleaseNotesVersion(firebaseGuild)) {
      return !_.isEqual(firebaseGuild.lastReleaseNotesVersion, appVersion);
    }

    return false;
  }

  private _logFetchingFirebaseGuild({ id }: Readonly<Guild>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`fetching Firebase guild ${ChalkService.getInstance().value(id)}`),
    });
  }

  private _logFirebaseGuildFetched({ id }: Readonly<Guild>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase guild ${ChalkService.getInstance().value(id)} fetched`),
    });
  }

  private _logInvalidFirebaseGuild({ id }: Readonly<Guild>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase guild ${ChalkService.getInstance().value(id)} is invalid`),
    });
  }

  private _logValidFirebaseGuild({ id }: Readonly<Guild>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase guild ${ChalkService.getInstance().value(id)} is valid`),
    });
  }

  private _logFirebaseGuildChannelReleaseNotesDisabled(
    { id }: Readonly<Guild>,
    guildChannel: Readonly<IFirebaseGuildChannel>
  ): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${ChalkService.getInstance().value(id)} channel ${ChalkService.getInstance().value(
          guildChannel.id ?? `unknown`
        )} release notes feature is disabled`
      ),
    });
  }

  private _logFirebaseGuildChannelReleaseNotesEnabled(
    { id }: Readonly<Guild>,
    guildChannel: Readonly<IFirebaseGuildChannel>
  ): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${ChalkService.getInstance().value(id)} channel ${ChalkService.getInstance().value(
          guildChannel.id
        )} release notes feature is enabled`
      ),
    });
  }

  private _logInValidDiscordGuildChannel({ id }: Readonly<Guild>, guildChannel: Readonly<IFirebaseGuildChannel>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Discord guild ${ChalkService.getInstance().value(id)} channel ${ChalkService.getInstance().value(
          guildChannel.id
        )} is invalid`
      ),
    });
  }

  private _logValidDiscordGuildChannel({ id }: Readonly<Guild>, guildChannel: Readonly<IFirebaseGuildChannel>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Discord guild ${ChalkService.getInstance().value(id)} channel ${ChalkService.getInstance().value(
          guildChannel.id
        )} is valid`
      ),
    });
  }

  private _logGuildChannelNotWritable({ id }: Readonly<GuildChannel | ThreadChannel>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `the guild channel ${ChalkService.getInstance().value(id)} is not writable`
      ),
    });
  }

  private _logSendingMessagesForReleaseNotes({ id }: Readonly<GuildChannel>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `sending message for release notes for guild channel ${ChalkService.getInstance().value(id)}...`
      ),
    });
  }

  private _logReleaseNotesMessageSent({ id }: Readonly<GuildChannel>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `release notes message sent for guild channel ${ChalkService.getInstance().value(id)}`
      ),
    });
  }

  private _onMessageError(error: Readonly<string>, guildChannel: Readonly<GuildChannel>): void {
    this._messageErrorLog(error, guildChannel);
    this._sendMessageToSoniaDiscord(error);
  }

  private _messageErrorLog(error: Readonly<string>, { id }: Readonly<GuildChannel>): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `release notes message sending failed for guild channel ${ChalkService.getInstance().value(id)}`
      ),
    });
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().error(error),
    });
  }

  private _sendMessageToSoniaDiscord(error: Readonly<string>): void {
    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(error),
    });
  }

  private _logFetchReleaseNotesCommandMessageResponseError(): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`could not fetch the release notes command message response`),
    });
  }
}
