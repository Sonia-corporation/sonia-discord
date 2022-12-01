import { FirebaseDmsFeaturesReleaseNotesEnabledStateService } from './features/release-notes/firebase-dms-features-release-notes-enabled-state.service';
import { FirebaseDmsBreakingChangeService } from './firebase-dms-breaking-change.service';
import { FirebaseDmsNewVersionCountService } from './firebase-dms-new-version-count.service';
import { FirebaseDmsService } from './firebase-dms.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../../app/enums/app-config-release-type.enum';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { IAppReleaseTypeResponsesFactoryPattern } from '../../../app/types/app-release-type-responses-factory-pattern';
import { DiscordGuildSoniaChannelNameEnum } from '../../../discord/guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { DiscordLoggerErrorService } from '../../../discord/logger/services/discord-logger-error.service';
import { wrapUserIdIntoMention } from '../../../discord/mentions/functions/wrap-user-id-into-mention';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandReleaseNotesService } from '../../../discord/messages/services/command/release-notes/discord-message-command-release-notes.service';
import { DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES } from '../../../discord/users/constants/discord-github-contributors-id-messages';
import { DiscordUserService } from '../../../discord/users/services/discord-user.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_DM_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-bug-fixes-version-response-messages';
import { FIREBASE_DM_NEW_FEATURES_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-features-version-response-messages';
import { FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-performance-improvements-version-response-messages';
import { FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-version-response-messages';
import { hasFirebaseDmLastReleaseNotesVersion } from '../../functions/dms/checks/has-firebase-dm-last-release-notes-version';
import { getUpdatedFirebaseDmLastReleaseNotesVersion } from '../../functions/dms/get-updated-firebase-dm-last-release-notes-version';
import { isUpToDateFirebaseDm } from '../../functions/dms/is-up-to-date-firebase-dm';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';
import { compareVersions } from 'compare-versions';
import { Message, User } from 'discord.js';
import { QueryDocumentSnapshot, QuerySnapshot, WriteBatch } from 'firebase-admin/firestore';
import _ from 'lodash';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

const NO_DM = 0;
const ONE_DM = 1;
const LOWER_VERSION = -1;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type IGreaterVersion = 1;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type ILowerVersion = -1;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type ISameVersion = 0;

type IComparisonVersion = ISameVersion | IGreaterVersion | ILowerVersion;

export class FirebaseDmsNewVersionService extends AbstractService {
  private static _instance: FirebaseDmsNewVersionService;

  public static getInstance(): FirebaseDmsNewVersionService {
    if (_.isNil(FirebaseDmsNewVersionService._instance)) {
      FirebaseDmsNewVersionService._instance = new FirebaseDmsNewVersionService();
    }

    return FirebaseDmsNewVersionService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_SERVICE);
  }

  public init(): Promise<((Message | null) | void)[] | void> {
    return firstValueFrom(this.sendNewReleaseNotesToEachDm$());
  }

  /**
   * @description
   * Wait Firebase to handle the breaking changes.
   * @returns {Observable<[boolean]>} An observable.
   */
  public isReady$(): Observable<[true]> {
    return forkJoin([FirebaseDmsBreakingChangeService.getInstance().hasFinished()]);
  }

  public sendNewReleaseNotesToEachDm$(): Observable<((Message | null) | void)[] | void> {
    return this._sendNewReleaseNotesToEachDm$().pipe(
      tap({
        next(dmMessages: ((Message | null) | void)[] | void): void {
          FirebaseDmsNewVersionCountService.getInstance().countDms(dmMessages);
        },
      })
    );
  }

  public sendNewReleaseNotesFromFirebaseDm({ id }: IFirebaseDm): Promise<Message | null> {
    if (_.isNil(id)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Firebase DM id nil`),
      });

      return Promise.reject(new Error(`Firebase DM id nil`));
    }

    const user: User | undefined = DiscordUserService.getInstance().getUserById(id);

    if (_.isNil(user)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Discord user ${ChalkService.getInstance().value(id)} does not exists`
        ),
      });

      return Promise.reject(new Error(`Discord user not found`));
    }

    return this.sendNewReleaseNotesFromDiscordDm(user);
  }

  public sendMessage(dm: IFirebaseDm, user: User): Promise<Message | void> {
    if (!FirebaseDmsFeaturesReleaseNotesEnabledStateService.getInstance().isEnabled(dm)) {
      this._logFirebaseDmNotesDisabled(dm);

      return Promise.reject(new Error(`Release notes state disabled`));
    }

    this._logFirebaseDmNotesEnabled(dm);

    if (_.isNil(dm.id)) {
      return Promise.reject(new Error(`DM ID is nil!`));
    }

    this._logValidDiscordDm(dm);

    return this.sendMessageResponse(user);
  }

  public async sendMessageResponse(user: User): Promise<Message | void> {
    const messageResponse: IDiscordMessageResponse | null = await this.getMessageResponse();

    if (_.isNil(messageResponse)) {
      return Promise.reject(new Error(`No message response fetched`));
    }

    this._logSendingMessagesForReleaseNotes(user);

    return user
      .send({
        ...messageResponse.options,
        content: messageResponse.content,
      })
      .then((message: Message): Promise<Message> => {
        this._logReleaseNotesMessageSent(user);

        return Promise.resolve(message);
      })
      .catch((error: string): Promise<void> => {
        this._onMessageError(error, user);

        return Promise.reject(error);
      });
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse | null> {
    return DiscordMessageCommandReleaseNotesService.getInstance()
      .getMessageResponse()
      .then((messageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const enhanceMessageResponse: IDiscordMessageResponse = _.cloneDeep(messageResponse);
        const releaseType: AppConfigReleaseTypeEnum = AppConfigService.getInstance().getReleaseType();
        const responsesFactoryPattern: IAppReleaseTypeResponsesFactoryPattern = {
          [AppConfigReleaseTypeEnum.BUG_FIXES](): string {
            return FIREBASE_DM_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.FEATURES](): string {
            return FIREBASE_DM_NEW_FEATURES_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.MIXED](): string {
            return FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS](): string {
            return FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
          [AppConfigReleaseTypeEnum.UNKNOWN](): string {
            return FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES.getHumanizedRandomMessage({
              userId: wrapUserIdIntoMention(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES.getRandomMessage()),
            });
          },
        };

        enhanceMessageResponse.content = responsesFactoryPattern[releaseType]();

        return Promise.resolve(enhanceMessageResponse);
      })
      .catch((): Promise<null> => {
        this._logFetchReleaseNotesCommandMessageResponseError();

        return Promise.resolve(null);
      });
  }

  public sendNewReleaseNotesFromDiscordDm(user: User): Promise<Message | null> {
    this._logFetchingFirebaseUser(user);

    return FirebaseDmsService.getInstance()
      .getDm(user.id)
      .then((firebaseDm: IFirebaseDm | null | undefined): Promise<Message | null> => {
        this._logFirebaseUserFetched(user);

        if (!this.isValidDm(firebaseDm)) {
          this._logInvalidFirebaseUser(user);

          return Promise.reject(new Error(`Invalid DM`));
        }

        this._logValidFirebaseUser(user);

        return this.sendMessage(firebaseDm, user)
          .then((message: Message | void): Promise<Message | null> => {
            if (message) {
              return Promise.resolve(message);
            }

            return Promise.resolve(null);
          })
          .catch((): Promise<null> => Promise.resolve(null));
      });
  }

  public isValidDm(firebaseDm: IFirebaseDm | null | undefined): firebaseDm is IFirebaseDmVFinal {
    return !_.isNil(firebaseDm) && isUpToDateFirebaseDm(firebaseDm);
  }

  private _sendNewReleaseNotesToEachDm$(): Observable<((Message | null) | void)[] | void> {
    return this.isReady$().pipe(
      take(ONE_EMITTER),
      mergeMap((): Promise<QuerySnapshot<IFirebaseDm>> => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`processing the sending of release notes to each DM...`),
        });

        return FirebaseDmsService.getInstance().getDms();
      }),
      mergeMap((querySnapshot: QuerySnapshot<IFirebaseDm>): Promise<IFirebaseDm[] | void> => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`DMs fetched`),
        });

        return this._sendAndUpdateNewReleaseNotesToEachFirebaseDm(querySnapshot);
      }),
      mergeMap((firebaseDms: IFirebaseDm[] | void): Promise<((Message | null) | void)[] | void> => {
        if (_.isArray(firebaseDms)) {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`sending release notes messages to each DM...`),
          });

          const messagePromises: Promise<(Message | null) | void>[] = [];

          _.forEach(firebaseDms, (firebaseDm: IFirebaseDm): void => {
            messagePromises.push(
              this.sendNewReleaseNotesFromFirebaseDm(firebaseDm).catch((): Promise<void> => {
                LoggerService.getInstance().error({
                  context: this._serviceName,
                  message: ChalkService.getInstance().text(
                    `release notes message sending failed for the DM ${ChalkService.getInstance().value(firebaseDm.id)}`
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

  private _sendAndUpdateNewReleaseNotesToEachFirebaseDm(
    querySnapshot: QuerySnapshot<IFirebaseDm>
  ): Promise<IFirebaseDm[] | void> {
    const batch: WriteBatch | undefined = FirebaseDmsService.getInstance().getBatch();

    if (_.isNil(batch)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Firebase DMs batch not available`),
      });

      return Promise.reject(new Error(`Firebase DMs batch not available`));
    }

    const firebaseDms: IFirebaseDm[] = [];
    let countFirebaseDmsUpdated = NO_DM;
    let countFirebaseDms = NO_DM;

    querySnapshot.forEach((queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseDm>): void => {
      if (!_.isEqual(queryDocumentSnapshot.exists, true)) {
        return;
      }

      countFirebaseDms = _.add(countFirebaseDms, ONE_DM);
      const firebaseDm: IFirebaseDm = queryDocumentSnapshot.data();

      if (this._shouldSendNewReleaseNotesFromFirebaseDm(firebaseDm)) {
        countFirebaseDmsUpdated = _.add(countFirebaseDmsUpdated, ONE_DM);

        batch.update(
          queryDocumentSnapshot.ref,
          getUpdatedFirebaseDmLastReleaseNotesVersion(AppConfigService.getInstance().getVersion())
        );
        firebaseDms.push(firebaseDm);
      }
    });

    if (_.gte(countFirebaseDmsUpdated, ONE_DM)) {
      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `updating ${ChalkService.getInstance().value(countFirebaseDmsUpdated)} Firebase DM${
            _.gt(countFirebaseDmsUpdated, ONE_DM) ? `s` : ``
          }...`
        ),
      });

      return batch
        .commit()
        .then((): Promise<IFirebaseDm[]> => Promise.resolve(firebaseDms))
        .catch((error: Error): Promise<void> => Promise.reject(error));
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `all Firebase DM${_.gt(countFirebaseDms, ONE_DM) ? `s` : ``} ${ChalkService.getInstance().hint(
          `(${_.toString(countFirebaseDms)})`
        )} release notes already sent`
      ),
    });

    return Promise.resolve();
  }

  private _shouldSendNewReleaseNotesFromFirebaseDm(firebaseDm: IFirebaseDm): boolean {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    if (hasFirebaseDmLastReleaseNotesVersion(firebaseDm)) {
      const comparison: IComparisonVersion = compareVersions(firebaseDm.lastReleaseNotesVersion, appVersion);

      if (comparison === LOWER_VERSION) {
        return true;
      }
    }

    return false;
  }

  private _logFetchingFirebaseUser({ id }: User): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`fetching Firebase user ${ChalkService.getInstance().value(id)}`),
    });
  }

  private _logFirebaseUserFetched({ id }: User): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase user ${ChalkService.getInstance().value(id)} fetched`),
    });
  }

  private _logInvalidFirebaseUser({ id }: User): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase user ${ChalkService.getInstance().value(id)} is invalid`),
    });
  }

  private _logValidFirebaseUser({ id }: User): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase user ${ChalkService.getInstance().value(id)} is valid`),
    });
  }

  private _logFirebaseDmNotesDisabled(dm: IFirebaseDm): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase DM ${ChalkService.getInstance().value(dm.id)} release notes feature is disabled`
      ),
    });
  }

  private _logFirebaseDmNotesEnabled(dm: IFirebaseDm): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase DM ${ChalkService.getInstance().value(dm.id)} release notes feature is enabled`
      ),
    });
  }

  private _logValidDiscordDm(dm: IFirebaseDm): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Discord DM ${ChalkService.getInstance().value(dm.id)} is valid`),
    });
  }

  private _logSendingMessagesForReleaseNotes({ id }: User): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `sending message for release notes for the user ${ChalkService.getInstance().value(id)}...`
      ),
    });
  }

  private _logReleaseNotesMessageSent({ id }: User): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `release notes message sent for the user ${ChalkService.getInstance().value(id)}`
      ),
    });
  }

  private _onMessageError(error: string, user: User): void {
    this._messageErrorLog(error, user);
    this._sendMessageToSoniaDiscord(error);
  }

  private _messageErrorLog(error: string, { id }: User): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `release notes message sending failed for the user ${ChalkService.getInstance().value(id)}`
      ),
    });
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().error(error),
    });
  }

  private _sendMessageToSoniaDiscord(error: string): void {
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
