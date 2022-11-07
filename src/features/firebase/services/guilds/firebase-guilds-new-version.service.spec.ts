import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService } from './channels/features/release-notes/firebase-guilds-channels-features-release-notes-enabled-state.service';
import { FirebaseGuildsBreakingChangeService } from './firebase-guilds-breaking-change.service';
import { FirebaseGuildsNewVersionService } from './firebase-guilds-new-version.service';
import { FirebaseGuildsService } from './firebase-guilds.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../../app/enums/app-config-release-type.enum';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../core/services/core-event.service';
import { IDiscordGuildSoniaSendMessageToChannel } from '../../../discord/guilds/interfaces/discord-guild-sonia-send-message-to-channel';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { DiscordGuildService } from '../../../discord/guilds/services/discord-guild.service';
import { DiscordLoggerErrorService } from '../../../discord/logger/services/discord-logger-error.service';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandReleaseNotesService } from '../../../discord/messages/services/command/release-notes/discord-message-command-release-notes.service';
import { DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES } from '../../../discord/users/constants/discord-github-contributors-id-messages';
import { DiscordGithubContributorsIdEnum } from '../../../discord/users/enums/discord-github-contributors-id.enum';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-bug-fixes-version-response-messages';
import { FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-features-version-response-messages';
import { FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-performance-improvements-version-response-messages';
import { FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-version-response-messages';
import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import * as IsUpToDateFirebaseGuildModule from '../../functions/guilds/is-up-to-date-firebase-guild';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';
import { IFirebaseGuildV1 } from '../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildChannel } from '../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildChannelVFinal } from '../../types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from '../../types/guilds/updated-firebase-guild-last-release-notes-version';
import { Guild, GuildChannel, Message, MessageOptions, MessagePayload, TextChannel } from 'discord.js';
import * as admin from 'firebase-admin';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseGuildsNewVersionService`, (): void => {
  let service: FirebaseGuildsNewVersionService;
  let coreEventService: CoreEventService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;
  let firebaseGuildsBreakingChangeService: FirebaseGuildsBreakingChangeService;
  let appConfigService: AppConfigService;
  let discordGuildService: DiscordGuildService;
  let discordMessageCommandReleaseNotesService: DiscordMessageCommandReleaseNotesService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordLoggerErrorService: DiscordLoggerErrorService;
  let firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService: FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseGuildsBreakingChangeService = FirebaseGuildsBreakingChangeService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordGuildService = DiscordGuildService.getInstance();
    discordMessageCommandReleaseNotesService = DiscordMessageCommandReleaseNotesService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
    firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService =
      FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsNewVersion service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsNewVersionService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsNewVersionService));
    });

    it(`should return the created FirebaseGuildsNewVersion service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsNewVersionService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the FirebaseGuildsNewVersion service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsNewVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let sendNewReleaseNotesToEachGuild$Spy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();

      sendNewReleaseNotesToEachGuild$Spy = jest
        .spyOn(service, `sendNewReleaseNotesToEachGuild$`)
        .mockReturnValue(of(createMock<Message[][]>()));
    });

    it(`should send a new release note to each known guild`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(sendNewReleaseNotesToEachGuild$Spy).toHaveBeenCalledTimes(1);
      expect(sendNewReleaseNotesToEachGuild$Spy).toHaveBeenCalledWith();
    });
  });

  describe(`isReady$()`, (): void => {
    let firebaseGuildsBreakingChangeServiceHasFinishedSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      firebaseGuildsBreakingChangeServiceHasFinishedSpy = jest
        .spyOn(firebaseGuildsBreakingChangeService, `hasFinished`)
        .mockResolvedValue(true);
    });

    describe(`when the Firebase guilds breaking changes failed`, (): void => {
      beforeEach((): void => {
        firebaseGuildsBreakingChangeServiceHasFinishedSpy.mockRejectedValue(new Error(`error`));
      });

      it(`should consider that the service is not ready`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(firstValueFrom(service.isReady$().pipe(take(1)))).rejects.toThrow(new Error(`error`));
      });
    });

    describe(`when the Firebase guilds breaking changes were successful`, (): void => {
      beforeEach((): void => {
        firebaseGuildsBreakingChangeServiceHasFinishedSpy.mockResolvedValue(true);
      });

      it(`should consider that the service is ready`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await firstValueFrom(service.isReady$().pipe(take(1)));

        expect(result).toStrictEqual([true]);
      });
    });
  });

  describe(`sendNewReleaseNotesToEachGuild$()`, (): void => {
    let isReady$: BehaviorSubject<[true]>;
    let querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>;
    let writeBatch: admin.firestore.WriteBatch;
    let queryDocumentSnapshot: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>;
    let firebaseGuild: IFirebaseGuild;

    let isReady$Spy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetGuildsSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetBatchSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let sendNewReleaseNotesFromFirebaseGuildSpy: jest.SpyInstance;
    let forEachMock: jest.Mock;
    let commitMock: jest.Mock;
    let updateMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      isReady$ = new BehaviorSubject<[true]>([true]);
      firebaseGuild = createMock<IFirebaseGuildVFinal>({
        id: `dummy-id`,
        lastReleaseNotesVersion: `1.0.0`,
        version: FirebaseGuildVersionEnum.V5,
      });
      queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
        data: (): IFirebaseGuild => firebaseGuild,
      });
      forEachMock = jest
        .fn()
        .mockImplementation(
          (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
            callback(queryDocumentSnapshot);
          }
        );
      querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>>({
        forEach: forEachMock,
      });
      commitMock = jest.fn().mockRejectedValue(new Error(`Commit error`));
      updateMock = jest.fn().mockImplementation();
      writeBatch = createMock<admin.firestore.WriteBatch>({
        commit: commitMock,
        update: updateMock,
      });

      isReady$Spy = jest.spyOn(service, `isReady$`).mockReturnValue(isReady$);
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
      firebaseGuildsServiceGetGuildsSpy = jest
        .spyOn(firebaseGuildsService, `getGuilds`)
        .mockResolvedValue(querySnapshot);
      firebaseGuildsServiceGetBatchSpy = jest.spyOn(firebaseGuildsService, `getBatch`).mockImplementation();
      appConfigServiceGetVersionSpy = jest.spyOn(appConfigService, `getVersion`).mockImplementation();
      sendNewReleaseNotesFromFirebaseGuildSpy = jest
        .spyOn(service, `sendNewReleaseNotesFromFirebaseGuild`)
        .mockResolvedValue(createMock<Message[]>());
    });

    it(`should wait that everything is ready`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
        new Error(`Firebase guilds batch not available`)
      );

      expect(isReady$Spy).toHaveBeenCalledTimes(1);
      expect(isReady$Spy).toHaveBeenCalledWith();
    });

    describe(`when an error occur when waiting to be ready`, (): void => {
      beforeEach((): void => {
        isReady$.error(new Error(`error`));
      });

      it(`should not get the guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

        expect(firebaseGuildsServiceGetGuildsSpy).not.toHaveBeenCalled();
      });

      it(`should not get a Firebase guilds batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

        expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not update the Firebase guild batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

        expect(updateMock).not.toHaveBeenCalled();
      });

      it(`should not commit the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

        expect(commitMock).not.toHaveBeenCalled();
      });

      it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

        expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
      });
    });

    describe(`once that everything is ready`, (): void => {
      beforeEach((): void => {
        isReady$.next([true]);
      });

      it(`should log about processing the sending of release notes to each guild...`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
          new Error(`Firebase guilds batch not available`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `FirebaseGuildsNewVersionService`,
          message: `text-processing the sending of release notes to each guild...`,
        } as ILoggerLog);
      });

      it(`should get the guilds`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
          new Error(`Firebase guilds batch not available`)
        );

        expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledWith();
      });

      describe(`when an error occurred when fetching the guilds`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockRejectedValue(new Error(`error`));
        });

        it(`should not get a Firebase guilds batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

          expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
        });

        it(`should not update the Firebase guild batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

          expect(updateMock).not.toHaveBeenCalled();
        });

        it(`should not commit the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

          expect(commitMock).not.toHaveBeenCalled();
        });

        it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(new Error(`error`));

          expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the guilds were successfully fetched`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
        });

        it(`should log about the guilds fetched success`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
            new Error(`Firebase guilds batch not available`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseGuildsNewVersionService`,
            message: `text-guilds fetched`,
          } as ILoggerLog);
        });

        it(`should get a Firebase guilds batch`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
            new Error(`Firebase guilds batch not available`)
          );

          expect(firebaseGuildsServiceGetBatchSpy).toHaveBeenCalledTimes(1);
          expect(firebaseGuildsServiceGetBatchSpy).toHaveBeenCalledWith();
        });

        describe(`when the Firebase guilds batch was not found`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceGetBatchSpy.mockReturnValue(undefined);
          });

          it(`should log about the Firebase guilds batch not being available`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-Firebase guilds batch not available`,
            } as ILoggerLog);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );
          });

          it(`should not update the Firebase guild batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );

            expect(updateMock).not.toHaveBeenCalled();
          });

          it(`should not commit the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );

            expect(commitMock).not.toHaveBeenCalled();
          });

          it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );

            expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the Firebase guilds batch was found`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceGetBatchSpy.mockReturnValue(writeBatch);
          });

          describe(`when there is no Firebase guild`, (): void => {
            beforeEach((): void => {
              forEachMock = jest.fn().mockImplementation();
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-all Firebase guild hint-(0) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase guild batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase guild but it does not exists`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: false,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-all Firebase guild hint-(0) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase guild batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase guild on v1`, (): void => {
            beforeEach((): void => {
              firebaseGuild = createMock<IFirebaseGuildV1>({
                id: `dummy-id`,
                version: FirebaseGuildVersionEnum.V1,
              });
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-all Firebase guild hint-(1) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase guild batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

              expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            describe(`when the Firebase guild last release notes version is the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              });

              it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
                expect.assertions(2);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-all Firebase guild hint-(1) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase guild batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase guild last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase guild last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(1);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `2.0.0`,
                } as IUpdatedFirebaseGuildLastReleaseNotesVersion);
              });

              it(`should log that one Firebase guild is updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-updating value-1 Firebase guild...`,
                } as ILoggerLog);
              });

              it(`should commit the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(commitMock).toHaveBeenCalledTimes(1);
                expect(commitMock).toHaveBeenCalledWith();
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`Commit error`));
                });

                it(`should not send the release notes message for the guild`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<admin.firestore.WriteResult[]>());
                });

                it(`should send the release notes message for the guild`, async (): Promise<void> => {
                  expect.assertions(2);

                  await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).toHaveBeenCalledTimes(1);
                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).toHaveBeenCalledWith(firebaseGuild);
                });

                describe(`when the release notes message sending failed for the guild`, (): void => {
                  beforeEach((): void => {
                    sendNewReleaseNotesFromFirebaseGuildSpy.mockRejectedValue(
                      new Error(`sendNewReleaseNotesFromFirebaseGuild error`)
                    );
                  });

                  it(`should log about the fail of the release notes message sending`, async (): Promise<void> => {
                    expect.assertions(2);

                    await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                      context: `FirebaseGuildsNewVersionService`,
                      message: `text-release notes message sending failed for guild value-dummy-id`,
                    } as ILoggerLog);
                  });
                });
              });
            });
          });

          describe(`when there are two Firebase guilds`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            describe(`when the Firebase guild last release notes version is the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              });

              it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
                expect.assertions(2);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-all Firebase guilds hint-(2) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase guild batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase guild last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase guilds last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(2);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `2.0.0`,
                } as IUpdatedFirebaseGuildLastReleaseNotesVersion);
              });

              it(`should log that two Firebase guilds are updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-updating value-2 Firebase guilds...`,
                } as ILoggerLog);
              });

              it(`should commit the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(commitMock).toHaveBeenCalledTimes(1);
                expect(commitMock).toHaveBeenCalledWith();
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`Commit error`));
                });

                it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(firstValueFrom(service.sendNewReleaseNotesToEachGuild$())).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<admin.firestore.WriteResult[]>());
                });

                it(`should send the release notes message for the guilds`, async (): Promise<void> => {
                  expect.assertions(2);

                  await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).toHaveBeenCalledTimes(2);
                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).toHaveBeenCalledWith(firebaseGuild);
                });

                describe(`when the release notes message sending failed for the guilds`, (): void => {
                  beforeEach((): void => {
                    sendNewReleaseNotesFromFirebaseGuildSpy.mockRejectedValue(
                      new Error(`sendNewReleaseNotesFromFirebaseGuild error`)
                    );
                  });

                  it(`should log about the fail of the release notes message sending`, async (): Promise<void> => {
                    expect.assertions(2);

                    await firstValueFrom(service.sendNewReleaseNotesToEachGuild$());

                    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
                    expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                      context: `FirebaseGuildsNewVersionService`,
                      message: `text-release notes message sending failed for guild value-dummy-id`,
                    } as ILoggerLog);
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`sendNewReleaseNotesFromFirebaseGuild()`, (): void => {
    let firebaseGuild: IFirebaseGuildVFinal;
    let guild: Guild;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordGuildServiceGetGuildByIdSpy: jest.SpyInstance;
    let sendNewReleaseNotesFromDiscordGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      firebaseGuild = createMock<IFirebaseGuildVFinal>({
        version: FirebaseGuildVersionEnum.V5,
      });
      guild = createMock<Guild>({
        id: `dummy-id`,
      });

      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      discordGuildServiceGetGuildByIdSpy = jest.spyOn(discordGuildService, `getGuildById`).mockImplementation();
      sendNewReleaseNotesFromDiscordGuildSpy = jest
        .spyOn(service, `sendNewReleaseNotesFromDiscordGuild`)
        .mockRejectedValue(new Error(`sendNewReleaseNotesFromDiscordGuild error`));
    });

    describe(`when the given Firebase guild id is undefined`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = undefined;
      });

      it(`should log an error about the wrong id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Firebase guild id nil`,
        } as ILoggerLog);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );
      });
    });

    describe(`when the given Firebase guild id is valid`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = `dummy-id`;
      });

      it(`should not log an error about the wrong id`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Discord guild not found`)
        );

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Firebase guild id nil`,
        } as ILoggerLog);
      });

      it(`should get the Discord guild by using the given Firebase guild id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Discord guild not found`)
        );

        expect(discordGuildServiceGetGuildByIdSpy).toHaveBeenCalledTimes(1);
        expect(discordGuildServiceGetGuildByIdSpy).toHaveBeenCalledWith(`dummy-id`);
      });

      it(`should not send the new release notes from the discord guild`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Discord guild not found`)
        );

        expect(sendNewReleaseNotesFromDiscordGuildSpy).not.toHaveBeenCalled();
      });

      describe(`when the Discord guild was not found`, (): void => {
        beforeEach((): void => {
          discordGuildServiceGetGuildByIdSpy.mockReturnValue(undefined);
        });

        it(`should log an error about the Discord guild not existing`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Discord guild value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );
        });

        it(`should not send the new release notes from the discord guild`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(sendNewReleaseNotesFromDiscordGuildSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Discord guild was found`, (): void => {
        beforeEach((): void => {
          discordGuildServiceGetGuildByIdSpy.mockReturnValue(guild);
        });

        it(`should not log an error about the Discord guild not existing`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`sendNewReleaseNotesFromDiscordGuild error`)
          );

          expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Discord guild value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should send the new release notes from the discord guild`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`sendNewReleaseNotesFromDiscordGuild error`)
          );

          expect(sendNewReleaseNotesFromDiscordGuildSpy).toHaveBeenCalledTimes(1);
          expect(sendNewReleaseNotesFromDiscordGuildSpy).toHaveBeenCalledWith(guild);
        });
      });
    });
  });

  describe(`sendMessageByChannel()`, (): void => {
    let channel: IFirebaseGuildChannel;
    let firebaseGuild: IFirebaseGuildVFinal;
    let guild: Guild;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let sendMessageResponseSpy: jest.SpyInstance;
    let firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy: jest.SpyInstance;
    let guildChannelsGetMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      channel = createMock<IFirebaseGuildChannel>();
      firebaseGuild = createMock<IFirebaseGuildVFinal>();
      guildChannelsGetMock = jest.fn().mockImplementation();
      guild = createMock<Guild>({
        channels: {
          cache: {
            get: guildChannelsGetMock,
          } as any,
        },
        id: `dummy-guild-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      sendMessageResponseSpy = jest
        .spyOn(service, `sendMessageResponse`)
        .mockRejectedValue(new Error(`sendMessageResponse error`));
      firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy = jest
        .spyOn(firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService, `isEnabled`)
        .mockImplementation();
    });

    describe(`when the given Firebase guild channel id is undefined`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannel>({
          id: undefined,
        });
      });

      it(`should log about the Firebase guild channel having a disabled release notes feature`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
          new Error(`Release notes state disabled`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Firebase guild value-dummy-guild-id channel value-unknown release notes feature is disabled`,
        } as ILoggerLog);
      });
    });

    describe(`when the given Firebase guild channel id is valid`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannel>({
          id: `dummy-channel-id`,
        });
      });

      describe(`when the given Firebase guild has a valid release notes feature`, (): void => {
        describe(`when the given Firebase guild has a valid release note feature disabled`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': {
                  features: {
                    releaseNotes: {
                      isEnabled: false,
                      version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                    },
                    version: FirebaseGuildChannelFeatureVersionEnum.V2,
                  },
                  version: FirebaseGuildChannelVersionEnum.V2,
                },
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy.mockReturnValue(false);
          });

          it(`should log about the Firebase guild channel having a disabled release note feature`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
              new Error(`Release notes state disabled`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id release notes feature is disabled`,
            } as ILoggerLog);
          });
        });

        describe(`when the given Firebase guild has a valid release notes feature enabled`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': {
                  features: {
                    releaseNotes: {
                      isEnabled: true,
                      version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                    },
                    version: FirebaseGuildChannelFeatureVersionEnum.V2,
                  },
                  version: FirebaseGuildChannelVersionEnum.V2,
                },
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsChannelsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy.mockReturnValue(true);
          });

          it(`should log about the Firebase guild channel having an enabled release notes feature`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
              new Error(`Guild channel not found`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
              context: `FirebaseGuildsNewVersionService`,
              message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id release notes feature is enabled`,
            } as ILoggerLog);
          });

          it(`should get the Discord guild channel`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
              new Error(`Guild channel not found`)
            );

            expect(guildChannelsGetMock).toHaveBeenCalledTimes(1);
            expect(guildChannelsGetMock).toHaveBeenCalledWith(`dummy-channel-id`);
          });

          describe(`when the Discord guild channel is undefined`, (): void => {
            beforeEach((): void => {
              guildChannelsGetMock.mockReturnValue(undefined);
            });

            it(`should log about the Discord guild channel not found`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                new Error(`Guild channel not found`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `FirebaseGuildsNewVersionService`,
                message: `text-Discord guild value-dummy-guild-id channel value-dummy-channel-id is invalid`,
              } as ILoggerLog);
            });
          });

          describe(`when the Discord guild channel is valid`, (): void => {
            let guildChannel: GuildChannel;

            beforeEach((): void => {
              guildChannel = createMock<GuildChannel>({
                id: `dummy-guild-channel-id`,
              });

              guildChannelsGetMock.mockReturnValue(guildChannel);
            });

            it(`should log about the Discord guild channel being valid`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                new Error(`sendMessageResponse error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `FirebaseGuildsNewVersionService`,
                message: `text-Discord guild value-dummy-guild-id channel value-dummy-channel-id is valid`,
              } as ILoggerLog);
            });

            it(`should send a message response`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                new Error(`sendMessageResponse error`)
              );

              expect(sendMessageResponseSpy).toHaveBeenCalledTimes(1);
              expect(sendMessageResponseSpy).toHaveBeenCalledWith(guildChannel);
            });

            describe(`when the message response is invalid`, (): void => {
              beforeEach((): void => {
                sendMessageResponseSpy.mockRejectedValue(new Error(`sendMessageResponse error`));
              });

              it(`should throw an error`, async (): Promise<void> => {
                expect.assertions(1);

                await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                  new Error(`sendMessageResponse error`)
                );
              });
            });

            describe(`when the message response is valid`, (): void => {
              let message: Message;

              beforeEach((): void => {
                message = createMock<Message>();

                sendMessageResponseSpy.mockResolvedValue(message);
              });

              it(`should return a message`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.sendMessageByChannel(channel, firebaseGuild, guild);

                expect(result).toStrictEqual(message);
              });
            });
          });
        });
      });
    });
  });

  describe(`sendMessageResponse()`, (): void => {
    let guildChannel: GuildChannel;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordLoggerErrorServiceGetErrorMessageResponseSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      guildChannel = createMock<GuildChannel>({
        id: `dummy-guild-channel-id`,
      });
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      discordLoggerErrorServiceGetErrorMessageResponseSpy = jest
        .spyOn(discordLoggerErrorService, `getErrorMessageResponse`)
        .mockReturnValue(discordMessageResponse);
      getMessageResponseSpy = jest.spyOn(service, `getMessageResponse`).mockResolvedValue(null);
    });

    describe(`when the given guild channel is not writable`, (): void => {
      beforeEach((): void => {
        guildChannel = createMock<GuildChannel>({
          id: `dummy-guild-channel-id`,
          isText(): false {
            return false;
          },
        });
      });

      it(`should log about the guild channel being not writable`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(
          new Error(`Guild channel not writable`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-the guild channel value-dummy-guild-channel-id is not writable`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild channel is writable`, (): void => {
      let sendMock: jest.Mock;

      beforeEach((): void => {
        sendMock = jest.fn().mockRejectedValue(new Error(`send error`));
        guildChannel = createMock<TextChannel>({
          id: `dummy-guild-channel-id`,
          isText(): true {
            return true;
          },
          send: sendMock,
        });
      });

      it(`should get a message response`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(
          new Error(`No message response fetched`)
        );

        expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getMessageResponseSpy).toHaveBeenCalledWith();
      });

      describe(`when the message response failed to be fetched`, (): void => {
        beforeEach((): void => {
          getMessageResponseSpy.mockResolvedValue(null);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(
            new Error(`No message response fetched`)
          );
        });
      });

      describe(`when the message response was successfully fetched`, (): void => {
        beforeEach((): void => {
          getMessageResponseSpy.mockResolvedValue(
            createMock<IDiscordMessageResponse>({
              content: `dummy-response`,
              options: {},
            })
          );
        });

        it(`should log about sending a release notes message`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-sending message for release notes for guild channel value-dummy-guild-channel-id...`,
          } as ILoggerLog);
        });

        it(`should send the release notes message`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

          const message: string | MessagePayload | MessageOptions = {
            content: `dummy-response`,
          };
          expect(sendMock).toHaveBeenCalledTimes(1);
          expect(sendMock).toHaveBeenCalledWith(message);
        });

        describe(`when the sending of the message failed`, (): void => {
          beforeEach((): void => {
            sendMock.mockRejectedValue(new Error(`send error`));
          });

          it(`should log about failing to send the message`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
              context: `FirebaseGuildsNewVersionService`,
              message: `text-release notes message sending failed for guild channel value-dummy-guild-channel-id`,
            } as ILoggerLog);
          });

          it(`should log the error`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
              context: `FirebaseGuildsNewVersionService`,
              message: `error-Error: send error`,
            } as ILoggerLog);
          });

          it(`should get an humanized error message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

            expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledWith(new Error(`send error`));
          });

          it(`should send the error to the Sonia discord errors channel`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

            expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
            expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
              channelName: `errors`,
              messageResponse: discordMessageResponse,
            } as IDiscordGuildSoniaSendMessageToChannel);
          });
        });

        describe(`when the sending of the message was successful`, (): void => {
          let message: Message;

          beforeEach((): void => {
            message = createMock<Message>();

            sendMock.mockResolvedValue(message);
          });

          it(`should log about the success of the release notes message sending`, async (): Promise<void> => {
            expect.assertions(2);

            await service.sendMessageResponse(guildChannel);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
              context: `FirebaseGuildsNewVersionService`,
              message: `text-release notes message sent for guild channel value-dummy-guild-channel-id`,
            } as ILoggerLog);
          });

          it(`should return the message`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.sendMessageResponse(guildChannel);

            expect(result).toStrictEqual(message);
          });

          it(`should not get an humanized error message response`, async (): Promise<void> => {
            expect.assertions(1);

            await service.sendMessageResponse(guildChannel);

            expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
          });

          it(`should not send the error to the Sonia discord errors channel`, async (): Promise<void> => {
            expect.assertions(1);

            await service.sendMessageResponse(guildChannel);

            expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let discordMessageCommandReleaseNotesServiceGetMessageResponseSpy: jest.SpyInstance;
    let firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let firebaseGuildNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let firebaseGuildNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let firebaseGuildNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let discordGithubContributorsIdMessagesGetRandomMessageSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseTypeSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();

      discordMessageCommandReleaseNotesServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandReleaseNotesService, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      firebaseGuildNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      firebaseGuildNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      firebaseGuildNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      discordGithubContributorsIdMessagesGetRandomMessageSpy = jest
        .spyOn(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES, `getRandomMessage`)
        .mockReturnValue(DiscordGithubContributorsIdEnum.C0ZEN);
      appConfigServiceGetReleaseTypeSpy = jest
        .spyOn(appConfigService, `getReleaseType`)
        .mockReturnValue(AppConfigReleaseTypeEnum.UNKNOWN);
    });

    it(`should fetch a message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.getMessageResponse();

      expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageCommandReleaseNotesServiceGetMessageResponseSpy.mockRejectedValue(
          new Error(`getMessageResponse error`)
        );
      });

      it(`should return null`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result).toBeNull();
      });
    });

    describe(`when the message response was successfully fetched`, (): void => {
      beforeEach((): void => {
        discordMessageCommandReleaseNotesServiceGetMessageResponseSpy.mockResolvedValue(
          createMock<IDiscordMessageResponse>({
            content: `dummy-response`,
            options: {},
          })
        );
      });

      describe(`when the release notes have an unknown type`, (): void => {
        beforeEach((): void => {
          appConfigServiceGetReleaseTypeSpy.mockReturnValue(AppConfigReleaseTypeEnum.UNKNOWN);
        });

        it(`should change the message response for a random one and include a random contributor id`, async (): Promise<void> => {
          expect.assertions(4);

          await service.getMessageResponse();

          expect(firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseGuildNewVersionResponseMessage);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the release notes have a mixed type`, (): void => {
        beforeEach((): void => {
          appConfigServiceGetReleaseTypeSpy.mockReturnValue(AppConfigReleaseTypeEnum.MIXED);
        });

        it(`should change the message response for a random one and include a random contributor id`, async (): Promise<void> => {
          expect.assertions(4);

          await service.getMessageResponse();

          expect(firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseGuildNewVersionResponseMessage);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the release notes have a bug fixes type`, (): void => {
        beforeEach((): void => {
          appConfigServiceGetReleaseTypeSpy.mockReturnValue(AppConfigReleaseTypeEnum.BUG_FIXES);
        });

        it(`should change the message response for a random bug fixes one and include a random contributor id`, async (): Promise<void> => {
          expect.assertions(4);

          await service.getMessageResponse();

          expect(firebaseGuildNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseGuildNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseGuildNewVersionResponseMessage);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the release notes have a features type`, (): void => {
        beforeEach((): void => {
          appConfigServiceGetReleaseTypeSpy.mockReturnValue(AppConfigReleaseTypeEnum.FEATURES);
        });

        it(`should change the message response for a random features one and include a random contributor id`, async (): Promise<void> => {
          expect.assertions(4);

          await service.getMessageResponse();

          expect(firebaseGuildNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseGuildNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseGuildNewVersionResponseMessage);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the release notes have a performance improvements type`, (): void => {
        beforeEach((): void => {
          appConfigServiceGetReleaseTypeSpy.mockReturnValue(AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS);
        });

        it(`should change the message response for a random performance improvements one and include a random contributor id`, async (): Promise<void> => {
          expect.assertions(4);

          await service.getMessageResponse();

          expect(
            firebaseGuildNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            firebaseGuildNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy
          ).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseGuildNewVersionResponseMessage);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordGithubContributorsIdMessagesGetRandomMessageSpy).toHaveBeenCalledWith();
        });
      });

      it(`should return the message response`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result).toStrictEqual({
          content: `About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`,
          options: {},
        } as IDiscordMessageResponse);
      });
    });
  });

  describe(`sendNewReleaseNotesFromDiscordGuild()`, (): void => {
    let guild: Guild;
    let firebaseGuild: IFirebaseGuildVFinal | null | undefined;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetGuildSpy: jest.SpyInstance;
    let sendMessageByChannelSpy: jest.SpyInstance;
    let isValidGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      guild = createMock<Guild>({
        id: `dummy-guild-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      firebaseGuildsServiceGetGuildSpy = jest
        .spyOn(firebaseGuildsService, `getGuild`)
        .mockRejectedValue(new Error(`getGuild error`));
      sendMessageByChannelSpy = jest
        .spyOn(service, `sendMessageByChannel`)
        .mockRejectedValue(new Error(`sendMessageByChannel error`));
      isValidGuildSpy = jest.spyOn(service, `isValidGuild`).mockReturnValue(false);
    });

    it(`should log about the fetch of the Firebase guild`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`getGuild error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `FirebaseGuildsNewVersionService`,
        message: `text-fetching Firebase guild value-dummy-guild-id`,
      } as ILoggerLog);
    });

    it(`should get the Firebase guild with the given guild id`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`getGuild error`));

      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledWith(`dummy-guild-id`);
    });

    describe(`when the Firebase guild failed to be fetched`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceGetGuildSpy.mockRejectedValue(new Error(`getGuild error`));
      });

      it(`should log about the fetch of the Firebase guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`getGuild error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-fetching Firebase guild value-dummy-guild-id`,
        } as ILoggerLog);
      });

      it(`should not send a message for each channel of the guild`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`getGuild error`));

        expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase guild was successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseGuild = createMock<IFirebaseGuildVFinal>();

        firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
      });

      it(`should log about the successful fetch of the Firebase guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Firebase guild value-dummy-guild-id fetched`,
        } as ILoggerLog);
      });

      it(`should check if the guild is valid`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));

        expect(isValidGuildSpy).toHaveBeenCalledTimes(1);
        expect(isValidGuildSpy).toHaveBeenCalledWith(firebaseGuild);
      });

      describe(`when the Firebase guild fetched is undefined`, (): void => {
        beforeEach((): void => {
          firebaseGuild = undefined;

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          isValidGuildSpy.mockReturnValue(false);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));
        });

        it(`should not send a message for each channel of the guild`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild fetched is null`, (): void => {
        beforeEach((): void => {
          firebaseGuild = null;

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          isValidGuildSpy.mockReturnValue(false);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));
        });

        it(`should not send a message for each channel of the guild`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromDiscordGuild(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild fetched is valid`, (): void => {
        let channel1: IFirebaseGuildChannelVFinal;
        let channel2: IFirebaseGuildChannelVFinal;

        beforeEach((): void => {
          channel1 = createMock<IFirebaseGuildChannelVFinal>({
            id: `dummy-channel-id-1`,
          });
          channel2 = createMock<IFirebaseGuildChannelVFinal>({
            id: `dummy-channel-id-2`,
          });
          firebaseGuild = createMock<IFirebaseGuildVFinal>({
            channels: {
              'dummy-channel-id-1': channel1,
              'dummy-channel-id-2': channel2,
            },
          });

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          isValidGuildSpy.mockReturnValue(true);
        });

        it(`should log about the valid Firebase guild`, async (): Promise<void> => {
          expect.assertions(2);

          await service.sendNewReleaseNotesFromDiscordGuild(guild);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Firebase guild value-dummy-guild-id is valid`,
          } as ILoggerLog);
        });

        it(`should send a message for each channel of the guild`, async (): Promise<void> => {
          expect.assertions(3);

          await service.sendNewReleaseNotesFromDiscordGuild(guild);

          expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(2);
          expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(1, channel1, firebaseGuild, guild);
          expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(2, channel2, firebaseGuild, guild);
        });

        describe(`when the message sending for each channel of the guild failed`, (): void => {
          beforeEach((): void => {
            sendMessageByChannelSpy.mockRejectedValue(new Error(`sendMessageByChannel error`));
          });

          it(`should return an empty list of messages`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.sendNewReleaseNotesFromDiscordGuild(guild);

            expect(result).toStrictEqual([null, null]);
          });
        });

        describe(`when the message sending for each channel of the guild succeeded`, (): void => {
          beforeEach((): void => {
            sendMessageByChannelSpy.mockResolvedValue(undefined);
          });

          describe(`when the messages are empty`, (): void => {
            beforeEach((): void => {
              sendMessageByChannelSpy.mockResolvedValue(undefined);
            });

            it(`should return an empty list of messages`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.sendNewReleaseNotesFromDiscordGuild(guild);

              expect(result).toStrictEqual([null, null]);
            });
          });

          describe(`when the messages are valid`, (): void => {
            let message: Message;

            beforeEach((): void => {
              message = createMock<Message>();

              sendMessageByChannelSpy.mockResolvedValue(message);
            });

            it(`should return a list of messages`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.sendNewReleaseNotesFromDiscordGuild(guild);

              expect(result).toStrictEqual([message, message]);
            });
          });
        });
      });
    });
  });

  describe(`isValidGuild()`, (): void => {
    let firebaseGuild: IFirebaseGuild | null | undefined;

    let isUpToDateFirebaseGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();

      isUpToDateFirebaseGuildSpy = jest
        .spyOn(IsUpToDateFirebaseGuildModule, `isUpToDateFirebaseGuild`)
        .mockReturnValue(false);
    });

    describe(`when the given Firebase guild is undefined`, (): void => {
      beforeEach((): void => {
        firebaseGuild = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValidGuild(firebaseGuild);

        expect(result).toBe(false);
      });
    });

    describe(`when the given Firebase guild is null`, (): void => {
      beforeEach((): void => {
        firebaseGuild = null;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValidGuild(firebaseGuild);

        expect(result).toBe(false);
      });
    });

    describe(`when the given Firebase guild is valid`, (): void => {
      beforeEach((): void => {
        firebaseGuild = createMock<IFirebaseGuild>();
      });

      it(`should check if the guild is up-to-date`, (): void => {
        expect.assertions(2);

        service.isValidGuild(firebaseGuild);

        expect(isUpToDateFirebaseGuildSpy).toHaveBeenCalledTimes(1);
        expect(isUpToDateFirebaseGuildSpy).toHaveBeenCalledWith(firebaseGuild);
      });

      describe(`when the given Firebase guild is not up-to-date`, (): void => {
        beforeEach((): void => {
          isUpToDateFirebaseGuildSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isValidGuild(firebaseGuild);

          expect(result).toBe(false);
        });
      });

      describe(`when the given Firebase guild is up-to-date`, (): void => {
        beforeEach((): void => {
          isUpToDateFirebaseGuildSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isValidGuild(firebaseGuild);

          expect(result).toBe(true);
        });
      });
    });
  });
});
