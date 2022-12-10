import { FirebaseDmsFeaturesReleaseNotesEnabledStateService } from './features/release-notes/firebase-dms-features-release-notes-enabled-state.service';
import { FirebaseDmsBreakingChangeService } from './firebase-dms-breaking-change.service';
import { FirebaseDmsNewVersionService } from './firebase-dms-new-version.service';
import { FirebaseDmsService } from './firebase-dms.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../../app/enums/app-config-release-type.enum';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../core/services/core-event.service';
import { IDiscordGuildSoniaSendMessageToChannel } from '../../../discord/guilds/interfaces/discord-guild-sonia-send-message-to-channel';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { DiscordLoggerErrorService } from '../../../discord/logger/services/discord-logger-error.service';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandReleaseNotesService } from '../../../discord/messages/services/command/release-notes/discord-message-command-release-notes.service';
import { DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES } from '../../../discord/users/constants/discord-github-contributors-id-messages';
import { DiscordGithubContributorsIdEnum } from '../../../discord/users/enums/discord-github-contributors-id.enum';
import { DiscordUserService } from '../../../discord/users/services/discord-user.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { FIREBASE_DM_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-bug-fixes-version-response-messages';
import { FIREBASE_DM_NEW_FEATURES_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-features-version-response-messages';
import { FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-performance-improvements-version-response-messages';
import { FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES } from '../../constants/dms/firebase-dm-new-version-response-messages';
import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../enums/dms/features/firebase-dm-feature-release-notes-version.enum';
import { FirebaseDmFeatureVersionEnum } from '../../enums/dms/features/firebase-dm-feature-version.enum';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import * as IsUpToDateFirebaseDmModule from '../../functions/dms/is-up-to-date-firebase-dm';
import { IFirebaseDmNewVersionResponseMessage } from '../../interfaces/dms/firebase-dm-new-version-response-message';
import { IFirebaseDmV1 } from '../../interfaces/dms/firebase-dm-v1';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';
import { IUpdatedFirebaseDmLastReleaseNotesVersion } from '../../types/dms/updated-firebase-dm-last-release-notes-version';
import { Message, MessageOptions, MessagePayload, User } from 'discord.js';
import { QueryDocumentSnapshot, QuerySnapshot, WriteBatch, WriteResult } from 'firebase-admin/firestore';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseDmsNewVersionService`, (): void => {
  let service: FirebaseDmsNewVersionService;
  let coreEventService: CoreEventService;
  let firebaseDmsService: FirebaseDmsService;
  let loggerService: LoggerService;
  let firebaseDmsBreakingChangeService: FirebaseDmsBreakingChangeService;
  let appConfigService: AppConfigService;
  let discordUserService: DiscordUserService;
  let discordMessageCommandReleaseNotesService: DiscordMessageCommandReleaseNotesService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordLoggerErrorService: DiscordLoggerErrorService;
  let firebaseDmsFeaturesReleaseNotesEnabledStateService: FirebaseDmsFeaturesReleaseNotesEnabledStateService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseDmsService = FirebaseDmsService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseDmsBreakingChangeService = FirebaseDmsBreakingChangeService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordUserService = DiscordUserService.getInstance();
    discordMessageCommandReleaseNotesService = DiscordMessageCommandReleaseNotesService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
    firebaseDmsFeaturesReleaseNotesEnabledStateService =
      FirebaseDmsFeaturesReleaseNotesEnabledStateService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsNewVersion service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsNewVersionService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsNewVersionService));
    });

    it(`should return the created FirebaseDmsNewVersion service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsNewVersionService.getInstance();

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

    it(`should notify the FirebaseDmsNewVersion service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsNewVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let sendNewReleaseNotesToEachDm$Spy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();

      sendNewReleaseNotesToEachDm$Spy = jest
        .spyOn(service, `sendNewReleaseNotesToEachDm$`)
        .mockReturnValue(of(createMock<Message[]>()));
    });

    it(`should send a new release note to each known DM`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(sendNewReleaseNotesToEachDm$Spy).toHaveBeenCalledTimes(1);
      expect(sendNewReleaseNotesToEachDm$Spy).toHaveBeenCalledWith();
    });
  });

  describe(`isReady$()`, (): void => {
    let firebaseDmsBreakingChangeServiceHasFinishedSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();
      firebaseDmsBreakingChangeServiceHasFinishedSpy = jest
        .spyOn(firebaseDmsBreakingChangeService, `hasFinished`)
        .mockResolvedValue(true);
    });

    describe(`when the Firebase DMs breaking changes failed`, (): void => {
      beforeEach((): void => {
        firebaseDmsBreakingChangeServiceHasFinishedSpy.mockRejectedValue(new Error(`error`));
      });

      it(`should consider that the service is not ready`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(firstValueFrom(service.isReady$().pipe(take(1)))).rejects.toThrow(new Error(`error`));
      });
    });

    describe(`when the Firebase DMs breaking changes were successful`, (): void => {
      beforeEach((): void => {
        firebaseDmsBreakingChangeServiceHasFinishedSpy.mockResolvedValue(true);
      });

      it(`should consider that the service is ready`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await firstValueFrom(service.isReady$().pipe(take(1)));

        expect(result).toStrictEqual([true]);
      });
    });
  });

  describe(`sendNewReleaseNotesToEachDm$()`, (): void => {
    let isReady$: BehaviorSubject<[true]>;
    let querySnapshot: QuerySnapshot<IFirebaseDmVFinal>;
    let writeBatch: WriteBatch;
    let queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseDm>;
    let firebaseDm: IFirebaseDm;

    let isReady$Spy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let firebaseDmsServiceGetDmsSpy: jest.SpyInstance;
    let firebaseDmsServiceGetBatchSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let sendNewReleaseNotesFromFirebaseDmSpy: jest.SpyInstance;
    let forEachMock: jest.Mock;
    let commitMock: jest.Mock;
    let updateMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();
      isReady$ = new BehaviorSubject<[true]>([true]);
      firebaseDm = createMock<IFirebaseDmVFinal>({
        id: `dummy-dm-id`,
        lastReleaseNotesVersion: `1.0.0`,
        version: FirebaseDmVersionEnum.V1,
      });
      queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
        data: (): IFirebaseDm => firebaseDm,
      });
      forEachMock = jest
        .fn()
        .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
          callback(queryDocumentSnapshot);
        });
      querySnapshot = createMock<QuerySnapshot<IFirebaseDmVFinal>>({
        forEach: forEachMock,
      });
      commitMock = jest.fn().mockRejectedValue(new Error(`Commit error`));
      updateMock = jest.fn().mockImplementation();
      writeBatch = createMock<WriteBatch>({
        commit: commitMock,
        update: updateMock,
      });

      isReady$Spy = jest.spyOn(service, `isReady$`).mockReturnValue(isReady$);
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
      firebaseDmsServiceGetDmsSpy = jest.spyOn(firebaseDmsService, `getDms`).mockResolvedValue(querySnapshot);
      firebaseDmsServiceGetBatchSpy = jest.spyOn(firebaseDmsService, `getBatch`).mockImplementation();
      appConfigServiceGetVersionSpy = jest.spyOn(appConfigService, `getVersion`).mockImplementation();
      sendNewReleaseNotesFromFirebaseDmSpy = jest
        .spyOn(service, `sendNewReleaseNotesFromFirebaseDm`)
        .mockResolvedValue(createMock<Message>());
    });

    it(`should wait that everything is ready`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
        new Error(`Firebase DMs batch not available`)
      );

      expect(isReady$Spy).toHaveBeenCalledTimes(1);
      expect(isReady$Spy).toHaveBeenCalledWith();
    });

    describe(`when an error occur when waiting to be ready`, (): void => {
      beforeEach((): void => {
        isReady$.error(new Error(`error`));
      });

      it(`should not get the DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

        expect(firebaseDmsServiceGetDmsSpy).not.toHaveBeenCalled();
      });

      it(`should not get a Firebase DMs batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

        expect(firebaseDmsServiceGetBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not update the Firebase DM batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

        expect(updateMock).not.toHaveBeenCalled();
      });

      it(`should not commit the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

        expect(commitMock).not.toHaveBeenCalled();
      });

      it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

        expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
      });
    });

    describe(`once that everything is ready`, (): void => {
      beforeEach((): void => {
        isReady$.next([true]);
      });

      it(`should log about processing the sending of release notes to each DM...`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
          new Error(`Firebase DMs batch not available`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `FirebaseDmsNewVersionService`,
          message: `text-processing the sending of release notes to each DM...`,
        } as ILoggerLog);
      });

      it(`should get the DMs`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
          new Error(`Firebase DMs batch not available`)
        );

        expect(firebaseDmsServiceGetDmsSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsServiceGetDmsSpy).toHaveBeenCalledWith();
      });

      describe(`when an error occurred when fetching the DMs`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceGetDmsSpy.mockRejectedValue(new Error(`error`));
        });

        it(`should not get a Firebase DMs batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

          expect(firebaseDmsServiceGetBatchSpy).not.toHaveBeenCalled();
        });

        it(`should not update the Firebase DM batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

          expect(updateMock).not.toHaveBeenCalled();
        });

        it(`should not commit the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

          expect(commitMock).not.toHaveBeenCalled();
        });

        it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(new Error(`error`));

          expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the DMs were successfully fetched`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
        });

        it(`should log about the DMs fetched success`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
            new Error(`Firebase DMs batch not available`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-DMs fetched`,
          } as ILoggerLog);
        });

        it(`should get a Firebase DMs batch`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
            new Error(`Firebase DMs batch not available`)
          );

          expect(firebaseDmsServiceGetBatchSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmsServiceGetBatchSpy).toHaveBeenCalledWith();
        });

        describe(`when the Firebase DMs batch was not found`, (): void => {
          beforeEach((): void => {
            firebaseDmsServiceGetBatchSpy.mockReturnValue(undefined);
          });

          it(`should log about the Firebase DMs batch not being available`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
              new Error(`Firebase DMs batch not available`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsNewVersionService`,
              message: `text-Firebase DMs batch not available`,
            } as ILoggerLog);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
              new Error(`Firebase DMs batch not available`)
            );
          });

          it(`should not update the Firebase DM batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
              new Error(`Firebase DMs batch not available`)
            );

            expect(updateMock).not.toHaveBeenCalled();
          });

          it(`should not commit the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
              new Error(`Firebase DMs batch not available`)
            );

            expect(commitMock).not.toHaveBeenCalled();
          });

          it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
              new Error(`Firebase DMs batch not available`)
            );

            expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the Firebase DMs batch was found`, (): void => {
          beforeEach((): void => {
            firebaseDmsServiceGetBatchSpy.mockReturnValue(writeBatch);
          });

          describe(`when there is no Firebase DM`, (): void => {
            beforeEach((): void => {
              forEachMock = jest.fn().mockImplementation();
              querySnapshot = createMock<QuerySnapshot<IFirebaseDmVFinal>>({
                forEach: forEachMock,
              });

              firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase DMs release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseDmsNewVersionService`,
                message: `text-all Firebase DM hint-(0) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase DM batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase DM but it does not exists`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
                data: (): IFirebaseDm => firebaseDm,
                exists: false,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseDmVFinal>>({
                forEach: forEachMock,
              });

              firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase DMs release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseDmsNewVersionService`,
                message: `text-all Firebase DM hint-(0) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase DM batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase DM on v1`, (): void => {
            beforeEach((): void => {
              firebaseDm = createMock<IFirebaseDmV1>({
                id: `dummy-dm-id`,
                lastReleaseNotesVersion: `1.0.0`,
                version: FirebaseDmVersionEnum.V1,
              });
              appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
                data: (): IFirebaseDm => firebaseDm,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseDmVFinal>>({
                forEach: forEachMock,
              });

              firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase DMs release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseDmsNewVersionService`,
                message: `text-all Firebase DM hint-(1) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase DM batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
              expect.assertions(1);

              await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

              expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase DM`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
                data: (): IFirebaseDm => firebaseDm,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseDmVFinal>>({
                forEach: forEachMock,
              });

              firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
            });

            describe(`when the Firebase DM last release notes version is smaller than the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`0.0.0`);
              });

              it(`should log that all Firebase DMs release notes were already sent`, async (): Promise<void> => {
                expect.assertions(2);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-all Firebase DM hint-(1) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase DM batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase DM last release notes version is the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              });

              it(`should log that all Firebase DMs release notes were already sent`, async (): Promise<void> => {
                expect.assertions(2);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-all Firebase DM hint-(1) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase DM batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase DM last release notes version is higher (patch) than the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.1`);
              });

              it(`should update the Firebase DM last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(1);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `1.0.1`,
                } as IUpdatedFirebaseDmLastReleaseNotesVersion);
              });

              it(`should log that one Firebase DM is updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-updating value-1 Firebase DM...`,
                } as ILoggerLog);
              });

              it(`should commit the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(commitMock).toHaveBeenCalledTimes(1);
                expect(commitMock).toHaveBeenCalledWith();
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`Commit error`));
                });

                it(`should not send the release notes message for the DM`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the DM`, async (): Promise<void> => {
                  expect.assertions(2);

                  await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledTimes(1);
                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledWith(firebaseDm);
                });

                describe(`when the release notes message sending failed for the DM`, (): void => {
                  beforeEach((): void => {
                    sendNewReleaseNotesFromFirebaseDmSpy.mockRejectedValue(
                      new Error(`sendNewReleaseNotesFromFirebaseDm error`)
                    );
                  });

                  it(`should log about the fail of the release notes message sending`, async (): Promise<void> => {
                    expect.assertions(2);

                    await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                      context: `FirebaseDmsNewVersionService`,
                      message: `text-release notes message sending failed for the DM value-dummy-dm-id`,
                    } as ILoggerLog);
                  });
                });
              });
            });

            describe(`when the Firebase DM last release notes version is higher (minor) than the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.1.0`);
              });

              it(`should update the Firebase DM last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(1);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `1.1.0`,
                } as IUpdatedFirebaseDmLastReleaseNotesVersion);
              });

              it(`should log that one Firebase DM is updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-updating value-1 Firebase DM...`,
                } as ILoggerLog);
              });

              it(`should commit the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(commitMock).toHaveBeenCalledTimes(1);
                expect(commitMock).toHaveBeenCalledWith();
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`Commit error`));
                });

                it(`should not send the release notes message for the DM`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the DM`, async (): Promise<void> => {
                  expect.assertions(2);

                  await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledTimes(1);
                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledWith(firebaseDm);
                });

                describe(`when the release notes message sending failed for the DM`, (): void => {
                  beforeEach((): void => {
                    sendNewReleaseNotesFromFirebaseDmSpy.mockRejectedValue(
                      new Error(`sendNewReleaseNotesFromFirebaseDm error`)
                    );
                  });

                  it(`should log about the fail of the release notes message sending`, async (): Promise<void> => {
                    expect.assertions(2);

                    await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                      context: `FirebaseDmsNewVersionService`,
                      message: `text-release notes message sending failed for the DM value-dummy-dm-id`,
                    } as ILoggerLog);
                  });
                });
              });
            });

            describe(`when the Firebase DM last release notes version is higher (major) than the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase DM last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(1);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `2.0.0`,
                } as IUpdatedFirebaseDmLastReleaseNotesVersion);
              });

              it(`should log that one Firebase DM is updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-updating value-1 Firebase DM...`,
                } as ILoggerLog);
              });

              it(`should commit the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(commitMock).toHaveBeenCalledTimes(1);
                expect(commitMock).toHaveBeenCalledWith();
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`Commit error`));
                });

                it(`should not send the release notes message for the DM`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the DM`, async (): Promise<void> => {
                  expect.assertions(2);

                  await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledTimes(1);
                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledWith(firebaseDm);
                });

                describe(`when the release notes message sending failed for the DM`, (): void => {
                  beforeEach((): void => {
                    sendNewReleaseNotesFromFirebaseDmSpy.mockRejectedValue(
                      new Error(`sendNewReleaseNotesFromFirebaseDm error`)
                    );
                  });

                  it(`should log about the fail of the release notes message sending`, async (): Promise<void> => {
                    expect.assertions(2);

                    await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                      context: `FirebaseDmsNewVersionService`,
                      message: `text-release notes message sending failed for the DM value-dummy-dm-id`,
                    } as ILoggerLog);
                  });
                });
              });
            });
          });

          describe(`when there are two Firebase DMs`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
                data: (): IFirebaseDm => firebaseDm,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                  callback(queryDocumentSnapshot);
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseDmVFinal>>({
                forEach: forEachMock,
              });

              firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
            });

            describe(`when the Firebase DM last release notes version is the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              });

              it(`should log that all Firebase DMs release notes were already sent`, async (): Promise<void> => {
                expect.assertions(2);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-all Firebase DMs hint-(2) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase DM batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
                expect.assertions(1);

                await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase DM last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase DMs last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(2);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `2.0.0`,
                } as IUpdatedFirebaseDmLastReleaseNotesVersion);
              });

              it(`should log that two Firebase DMs are updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseDmsNewVersionService`,
                  message: `text-updating value-2 Firebase DMs...`,
                } as ILoggerLog);
              });

              it(`should commit the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(commitMock).toHaveBeenCalledTimes(1);
                expect(commitMock).toHaveBeenCalledWith();
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`Commit error`));
                });

                it(`should not send the release notes message for the DMs`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(firstValueFrom(service.sendNewReleaseNotesToEachDm$())).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the DMs`, async (): Promise<void> => {
                  expect.assertions(2);

                  await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledTimes(2);
                  expect(sendNewReleaseNotesFromFirebaseDmSpy).toHaveBeenCalledWith(firebaseDm);
                });

                describe(`when the release notes message sending failed for the DMs`, (): void => {
                  beforeEach((): void => {
                    sendNewReleaseNotesFromFirebaseDmSpy.mockRejectedValue(
                      new Error(`sendNewReleaseNotesFromFirebaseDm error`)
                    );
                  });

                  it(`should log about the fail of the release notes message sending`, async (): Promise<void> => {
                    expect.assertions(2);

                    await firstValueFrom(service.sendNewReleaseNotesToEachDm$());

                    expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
                    expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                      context: `FirebaseDmsNewVersionService`,
                      message: `text-release notes message sending failed for the DM value-dummy-dm-id`,
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

  describe(`sendNewReleaseNotesFromFirebaseDm()`, (): void => {
    let firebaseDm: IFirebaseDmVFinal;
    let user: User;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordUserServiceGetUserByIdSpy: jest.SpyInstance;
    let sendNewReleaseNotesFromDiscordDmSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();
      firebaseDm = createMock<IFirebaseDmVFinal>({
        version: FirebaseDmVersionEnum.V1,
      });
      user = createMock<User>({
        id: `dummy-id`,
      });

      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      discordUserServiceGetUserByIdSpy = jest.spyOn(discordUserService, `getUserById`).mockImplementation();
      sendNewReleaseNotesFromDiscordDmSpy = jest
        .spyOn(service, `sendNewReleaseNotesFromDiscordDm`)
        .mockRejectedValue(new Error(`sendNewReleaseNotesFromDiscordDm error`));
    });

    describe(`when the given Firebase DM id is undefined`, (): void => {
      beforeEach((): void => {
        firebaseDm.id = undefined;
      });

      it(`should log an error about the wrong id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
          new Error(`Firebase DM id nil`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionService`,
          message: `text-Firebase DM id nil`,
        } as ILoggerLog);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
          new Error(`Firebase DM id nil`)
        );
      });
    });

    describe(`when the given Firebase DM id is valid`, (): void => {
      beforeEach((): void => {
        firebaseDm.id = `dummy-id`;
      });

      it(`should not log an error about the wrong id`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
          new Error(`Discord user not found`)
        );

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionService`,
          message: `text-Firebase DM id nil`,
        } as ILoggerLog);
      });

      it(`should get the Discord user by using the given Firebase DM id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
          new Error(`Discord user not found`)
        );

        expect(discordUserServiceGetUserByIdSpy).toHaveBeenCalledTimes(1);
        expect(discordUserServiceGetUserByIdSpy).toHaveBeenCalledWith(`dummy-id`);
      });

      it(`should not send the new release notes from the discord DM`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
          new Error(`Discord user not found`)
        );

        expect(sendNewReleaseNotesFromDiscordDmSpy).not.toHaveBeenCalled();
      });

      describe(`when the Discord user was not found`, (): void => {
        beforeEach((): void => {
          discordUserServiceGetUserByIdSpy.mockReturnValue(undefined);
        });

        it(`should log an error about the Discord DM not existing`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
            new Error(`Discord user not found`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsNewVersionService`,
            message: `text-Discord user value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
            new Error(`Discord user not found`)
          );
        });

        it(`should not send the new release notes from the discord DM`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
            new Error(`Discord user not found`)
          );

          expect(sendNewReleaseNotesFromDiscordDmSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Discord user was found`, (): void => {
        beforeEach((): void => {
          discordUserServiceGetUserByIdSpy.mockReturnValue(user);
        });

        it(`should not log an error about the Discord user not existing`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
            new Error(`sendNewReleaseNotesFromDiscordDm error`)
          );

          expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
            context: `FirebaseDmsNewVersionService`,
            message: `text-Discord user value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should send the new release notes from the discord DM`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromFirebaseDm(firebaseDm)).rejects.toThrow(
            new Error(`sendNewReleaseNotesFromDiscordDm error`)
          );

          expect(sendNewReleaseNotesFromDiscordDmSpy).toHaveBeenCalledTimes(1);
          expect(sendNewReleaseNotesFromDiscordDmSpy).toHaveBeenCalledWith(user);
        });
      });
    });
  });

  describe(`sendMessage()`, (): void => {
    let firebaseDm: IFirebaseDmVFinal;
    let user: User;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let sendMessageResponseSpy: jest.SpyInstance;
    let firebaseDmsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();
      firebaseDm = createMock<IFirebaseDmVFinal>({
        id: `dummy-dm-id`,
      });
      user = createMock<User>({
        id: `dummy-user-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      sendMessageResponseSpy = jest
        .spyOn(service, `sendMessageResponse`)
        .mockRejectedValue(new Error(`sendMessageResponse error`));
      firebaseDmsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy = jest
        .spyOn(firebaseDmsFeaturesReleaseNotesEnabledStateService, `isEnabled`)
        .mockImplementation();
    });

    describe(`when the given Firebase DM has a valid release notes feature`, (): void => {
      describe(`when the given Firebase DM has a valid release note feature disabled`, (): void => {
        beforeEach((): void => {
          firebaseDm = createMock<IFirebaseDmVFinal>({
            features: {
              releaseNotes: {
                isEnabled: false,
                version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
              },
              version: FirebaseDmFeatureVersionEnum.V1,
            },
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          });

          firebaseDmsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy.mockReturnValue(false);
        });

        it(`should log about the Firebase DM having a disabled release note feature`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessage(firebaseDm, user)).rejects.toThrow(
            new Error(`Release notes state disabled`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsNewVersionService`,
            message: `text-Firebase DM value-dummy-dm-id release notes feature is disabled`,
          } as ILoggerLog);
        });
      });

      describe(`when the given Firebase DM has a valid release notes feature enabled`, (): void => {
        beforeEach((): void => {
          firebaseDm = createMock<IFirebaseDmVFinal>({
            features: {
              releaseNotes: {
                isEnabled: true,
                version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
              },
              version: FirebaseDmFeatureVersionEnum.V1,
            },
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          });

          firebaseDmsFeaturesReleaseNotesEnabledStateServiceIsEnabledSpy.mockReturnValue(true);
        });

        it(`should log about the Firebase DM having an enabled release notes feature`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessage(firebaseDm, user)).rejects.toThrow(new Error(`sendMessageResponse error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-Firebase DM value-dummy-dm-id release notes feature is enabled`,
          } as ILoggerLog);
        });

        describe(`when the Discord DM is valid`, (): void => {
          let user: User;

          beforeEach((): void => {
            user = createMock<User>({
              id: `dummy-user-id`,
            });
          });

          it(`should log about the Discord DM being valid`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessage(firebaseDm, user)).rejects.toThrow(new Error(`sendMessageResponse error`));

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
              context: `FirebaseDmsNewVersionService`,
              message: `text-Discord DM value-dummy-dm-id is valid`,
            } as ILoggerLog);
          });

          it(`should send a message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessage(firebaseDm, user)).rejects.toThrow(new Error(`sendMessageResponse error`));

            expect(sendMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(sendMessageResponseSpy).toHaveBeenCalledWith(user);
          });

          describe(`when the message response is invalid`, (): void => {
            beforeEach((): void => {
              sendMessageResponseSpy.mockRejectedValue(new Error(`sendMessageResponse error`));
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.sendMessage(firebaseDm, user)).rejects.toThrow(
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

              const result = await service.sendMessage(firebaseDm, user);

              expect(result).toStrictEqual(message);
            });
          });
        });
      });
    });
  });

  describe(`sendMessageResponse()`, (): void => {
    let user: User;
    let discordMessageResponse: IDiscordMessageResponse;

    let sendMock: jest.Mock;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordLoggerErrorServiceGetErrorMessageResponseSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();
      sendMock = jest.fn().mockRejectedValue(new Error(`send error`));
      user = createMock<User>({
        id: `dummy-user-id`,
        send: sendMock,
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

    it(`should get a message response`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`No message response fetched`));

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response failed to be fetched`, (): void => {
      beforeEach((): void => {
        getMessageResponseSpy.mockResolvedValue(null);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`No message response fetched`));
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

        await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`send error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionService`,
          message: `text-sending message for release notes for the user value-dummy-user-id...`,
        } as ILoggerLog);
      });

      it(`should send the release notes message`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`send error`));

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

          await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`send error`));

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-release notes message sending failed for the user value-dummy-user-id`,
          } as ILoggerLog);
        });

        it(`should log the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`send error`));

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseDmsNewVersionService`,
            message: `error-Error: send error`,
          } as ILoggerLog);
        });

        it(`should get an humanized error message response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`send error`));

          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledWith(new Error(`send error`));
        });

        it(`should send the error to the Sonia discord errors channel`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(user)).rejects.toThrow(new Error(`send error`));

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

          await service.sendMessageResponse(user);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-release notes message sent for the user value-dummy-user-id`,
          } as ILoggerLog);
        });

        it(`should return the message`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.sendMessageResponse(user);

          expect(result).toStrictEqual(message);
        });

        it(`should not get an humanized error message response`, async (): Promise<void> => {
          expect.assertions(1);

          await service.sendMessageResponse(user);

          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
        });

        it(`should not send the error to the Sonia discord errors channel`, async (): Promise<void> => {
          expect.assertions(1);

          await service.sendMessageResponse(user);

          expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let discordMessageCommandReleaseNotesServiceGetMessageResponseSpy: jest.SpyInstance;
    let firebaseDmNewVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let firebaseDmNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let firebaseDmNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let firebaseDmNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let discordGithubContributorsIdMessagesGetRandomMessageSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseTypeSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();

      discordMessageCommandReleaseNotesServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandReleaseNotesService, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      firebaseDmNewVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      firebaseDmNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_DM_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      firebaseDmNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_DM_NEW_FEATURES_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`About time <@!${DiscordGithubContributorsIdEnum.C0ZEN}>!`);
      firebaseDmNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
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

          expect(firebaseDmNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseDmNewVersionResponseMessage);
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

          expect(firebaseDmNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseDmNewVersionResponseMessage);
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

          expect(firebaseDmNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmNewBugFixesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseDmNewVersionResponseMessage);
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

          expect(firebaseDmNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmNewFeaturesVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseDmNewVersionResponseMessage);
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
            firebaseDmNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            firebaseDmNewPerformanceImprovementsVersionResponseMessagesGetHumanizedRandomMessageSpy
          ).toHaveBeenCalledWith({
            userId: `<@!${DiscordGithubContributorsIdEnum.C0ZEN}>`,
          } as IFirebaseDmNewVersionResponseMessage);
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

  describe(`sendNewReleaseNotesFromDiscordDm()`, (): void => {
    let user: User;
    let firebaseDm: IFirebaseDmVFinal | null | undefined;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let firebaseDmsServiceGetDmSpy: jest.SpyInstance;
    let sendMessageByChannelSpy: jest.SpyInstance;
    let isValidDmSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();
      user = createMock<User>({
        id: `dummy-user-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      firebaseDmsServiceGetDmSpy = jest.spyOn(firebaseDmsService, `getDm`).mockRejectedValue(new Error(`getDm error`));
      sendMessageByChannelSpy = jest
        .spyOn(service, `sendMessage`)
        .mockRejectedValue(new Error(`sendMessageByChannel error`));
      isValidDmSpy = jest.spyOn(service, `isValidDm`).mockReturnValue(false);
    });

    it(`should log about the fetch of the Firebase DM`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`getDm error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `FirebaseDmsNewVersionService`,
        message: `text-fetching Firebase user value-dummy-user-id`,
      } as ILoggerLog);
    });

    it(`should get the Firebase DM with the given user id`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`getDm error`));

      expect(firebaseDmsServiceGetDmSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsServiceGetDmSpy).toHaveBeenCalledWith(`dummy-user-id`);
    });

    describe(`when the Firebase DM failed to be fetched`, (): void => {
      beforeEach((): void => {
        firebaseDmsServiceGetDmSpy.mockRejectedValue(new Error(`getDm error`));
      });

      it(`should log about the fetch of the Firebase DM`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`getDm error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionService`,
          message: `text-fetching Firebase user value-dummy-user-id`,
        } as ILoggerLog);
      });

      it(`should not send a message for the DM`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`getDm error`));

        expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase DM was successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseDm = createMock<IFirebaseDmVFinal>();

        firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
      });

      it(`should log about the successful fetch of the Firebase user`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `FirebaseDmsNewVersionService`,
          message: `text-Firebase user value-dummy-user-id fetched`,
        } as ILoggerLog);
      });

      it(`should check if the DM is valid`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));

        expect(isValidDmSpy).toHaveBeenCalledTimes(1);
        expect(isValidDmSpy).toHaveBeenCalledWith(firebaseDm);
      });

      describe(`when the Firebase DM fetched is undefined`, (): void => {
        beforeEach((): void => {
          firebaseDm = undefined;

          firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
          isValidDmSpy.mockReturnValue(false);
        });

        it(`should log about the invalid Firebase DM`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-Firebase user value-dummy-user-id is invalid`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));
        });

        it(`should not send a message for the DM`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase DM fetched is null`, (): void => {
        beforeEach((): void => {
          firebaseDm = null;

          firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
          isValidDmSpy.mockReturnValue(false);
        });

        it(`should log about the invalid Firebase DM`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-Firebase user value-dummy-user-id is invalid`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));
        });

        it(`should not send a message for the DM`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromDiscordDm(user)).rejects.toThrow(new Error(`Invalid DM`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase DM fetched is valid`, (): void => {
        beforeEach((): void => {
          firebaseDm = createMock<IFirebaseDmVFinal>({
            id: `dummy-id-1`,
          });

          firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
          isValidDmSpy.mockReturnValue(true);
        });

        it(`should log about the valid Firebase DM`, async (): Promise<void> => {
          expect.assertions(2);

          await service.sendNewReleaseNotesFromDiscordDm(user);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `FirebaseDmsNewVersionService`,
            message: `text-Firebase user value-dummy-user-id is valid`,
          } as ILoggerLog);
        });

        it(`should send a message for the DM`, async (): Promise<void> => {
          expect.assertions(2);

          await service.sendNewReleaseNotesFromDiscordDm(user);

          expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(1);
          expect(sendMessageByChannelSpy).toHaveBeenCalledWith(firebaseDm, user);
        });

        describe(`when the message sending for the DM failed`, (): void => {
          beforeEach((): void => {
            sendMessageByChannelSpy.mockRejectedValue(new Error(`sendMessageByChannel error`));
          });

          it(`should return an empty list of messages`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.sendNewReleaseNotesFromDiscordDm(user);

            expect(result).toBeNull();
          });
        });

        describe(`when the message sending for the DM succeeded`, (): void => {
          beforeEach((): void => {
            sendMessageByChannelSpy.mockResolvedValue(undefined);
          });

          describe(`when the messages are empty`, (): void => {
            beforeEach((): void => {
              sendMessageByChannelSpy.mockResolvedValue(undefined);
            });

            it(`should return an empty list of messages`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.sendNewReleaseNotesFromDiscordDm(user);

              expect(result).toBeNull();
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

              const result = await service.sendNewReleaseNotesFromDiscordDm(user);

              expect(result).toStrictEqual(message);
            });
          });
        });
      });
    });
  });

  describe(`isValidDm()`, (): void => {
    let firebaseDm: IFirebaseDm | null | undefined;

    let isUpToDateFirebaseDmSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionService();

      isUpToDateFirebaseDmSpy = jest.spyOn(IsUpToDateFirebaseDmModule, `isUpToDateFirebaseDm`).mockReturnValue(false);
    });

    describe(`when the given Firebase DM is undefined`, (): void => {
      beforeEach((): void => {
        firebaseDm = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValidDm(firebaseDm);

        expect(result).toBe(false);
      });
    });

    describe(`when the given Firebase DM is null`, (): void => {
      beforeEach((): void => {
        firebaseDm = null;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValidDm(firebaseDm);

        expect(result).toBe(false);
      });
    });

    describe(`when the given Firebase DM is valid`, (): void => {
      beforeEach((): void => {
        firebaseDm = createMock<IFirebaseDm>();
      });

      it(`should check if the DM is up-to-date`, (): void => {
        expect.assertions(2);

        service.isValidDm(firebaseDm);

        expect(isUpToDateFirebaseDmSpy).toHaveBeenCalledTimes(1);
        expect(isUpToDateFirebaseDmSpy).toHaveBeenCalledWith(firebaseDm);
      });

      describe(`when the given Firebase DM is not up-to-date`, (): void => {
        beforeEach((): void => {
          isUpToDateFirebaseDmSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isValidDm(firebaseDm);

          expect(result).toBe(false);
        });
      });

      describe(`when the given Firebase DM is up-to-date`, (): void => {
        beforeEach((): void => {
          isUpToDateFirebaseDmSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isValidDm(firebaseDm);

          expect(result).toBe(true);
        });
      });
    });
  });
});
