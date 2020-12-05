import { FirebaseGuildsBreakingChangeService } from './firebase-guilds-breaking-change.service';
import { FirebaseGuildsNewVersionService } from './firebase-guilds-new-version.service';
import { FirebaseGuildsService } from './firebase-guilds.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordChannelGuildService } from '../../../discord/channels/services/discord-channel-guild.service';
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
import { FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES } from '../../constants/guilds/firebase-guild-new-version-response-messages';
import { FirebaseGuildNewVersionResponseEnum } from '../../enums/guilds/firebase-guild-new-version-response.enum';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from '../../types/guilds/updated-firebase-guild-last-release-notes-version';
import { Guild, GuildChannel, Message, TextChannel } from 'discord.js';
import * as admin from 'firebase-admin';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import WriteBatch = admin.firestore.WriteBatch;
import WriteResult = admin.firestore.WriteResult;

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
  let discordChannelGuildService: DiscordChannelGuildService;
  let discordMessageCommandReleaseNotesService: DiscordMessageCommandReleaseNotesService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordLoggerErrorService: DiscordLoggerErrorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseGuildsBreakingChangeService = FirebaseGuildsBreakingChangeService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordGuildService = DiscordGuildService.getInstance();
    discordChannelGuildService = DiscordChannelGuildService.getInstance();
    discordMessageCommandReleaseNotesService = DiscordMessageCommandReleaseNotesService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
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
    let sendNewReleaseNotesToEachGuild$: Subject<true>;

    let sendNewReleaseNotesToEachGuild$Spy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      sendNewReleaseNotesToEachGuild$ = new Subject<true>();

      sendNewReleaseNotesToEachGuild$Spy = jest
        .spyOn(service, `sendNewReleaseNotesToEachGuild$`)
        .mockReturnValue(sendNewReleaseNotesToEachGuild$);
    });

    it(`should send a new release note to each known guild`, (): void => {
      expect.assertions(2);

      service.init();

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

        await expect(service.isReady$().pipe(take(1)).toPromise()).rejects.toThrow(new Error(`error`));
      });
    });

    describe(`when the Firebase guilds breaking changes were successful`, (): void => {
      beforeEach((): void => {
        firebaseGuildsBreakingChangeServiceHasFinishedSpy.mockResolvedValue(true);
      });

      it(`should consider that the service is ready`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.isReady$().pipe(take(1)).toPromise();

        expect(result).toStrictEqual([true]);
      });
    });
  });

  describe(`sendNewReleaseNotesToEachGuild$()`, (): void => {
    let isReady$: BehaviorSubject<[true]>;
    let querySnapshot: QuerySnapshot<IFirebaseGuildVFinal>;
    let writeBatch: WriteBatch;
    let queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>;
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
      queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseGuild>>({
        data: (): IFirebaseGuild => firebaseGuild,
      });
      forEachMock = jest
        .fn()
        .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
          callback(queryDocumentSnapshot);
        });
      querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
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
      firebaseGuildsServiceGetGuildsSpy = jest
        .spyOn(firebaseGuildsService, `getGuilds`)
        .mockResolvedValue(querySnapshot);
      firebaseGuildsServiceGetBatchSpy = jest.spyOn(firebaseGuildsService, `getBatch`).mockImplementation();
      appConfigServiceGetVersionSpy = jest.spyOn(appConfigService, `getVersion`).mockImplementation();
      sendNewReleaseNotesFromFirebaseGuildSpy = jest
        .spyOn(service, `sendNewReleaseNotesFromFirebaseGuild`)
        .mockResolvedValue(createMock<Message>());
    });

    it(`should wait that everything is ready`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

        expect(firebaseGuildsServiceGetGuildsSpy).not.toHaveBeenCalled();
      });

      it(`should not get a Firebase guilds batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

        expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not update the Firebase guild batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

        expect(updateMock).not.toHaveBeenCalled();
      });

      it(`should not commit the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

        expect(commitMock).not.toHaveBeenCalled();
      });

      it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

        expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
      });
    });

    describe(`once that everything is ready`, (): void => {
      beforeEach((): void => {
        isReady$.next([true]);
      });

      it(`should log about processing the sending of release notes to each guild...`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

        await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

          await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

          expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
        });

        it(`should not update the Firebase guild batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

          expect(updateMock).not.toHaveBeenCalled();
        });

        it(`should not commit the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

          expect(commitMock).not.toHaveBeenCalled();
        });

        it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(new Error(`error`));

          expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the guilds were successfully fetched`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
        });

        it(`should log about the guilds fetched success`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

          await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

            await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

            await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );
          });

          it(`should not update the Firebase guild batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );

            expect(updateMock).not.toHaveBeenCalled();
          });

          it(`should not commit the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
              new Error(`Firebase guilds batch not available`)
            );

            expect(commitMock).not.toHaveBeenCalled();
          });

          it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-all Firebase guild hint-(0) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase guild batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase guild but it does not exists`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: false,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-all Firebase guild hint-(0) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase guild batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase guild on v1`, (): void => {
            beforeEach((): void => {
              firebaseGuild = createMock<IFirebaseGuildV1>({
                id: `dummy-id`,
                version: FirebaseGuildVersionEnum.V1,
              });
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should log that all Firebase guilds release notes were already sent`, async (): Promise<void> => {
              expect.assertions(2);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-all Firebase guild hint-(1) release notes already sent`,
              } as ILoggerLog);
            });

            it(`should not update the Firebase guild batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
              expect.assertions(1);

              await service.sendNewReleaseNotesToEachGuild$().toPromise();

              expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when there is one Firebase guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
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

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-all Firebase guild hint-(1) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase guild batch`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase guild last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase guild last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(1);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `2.0.0`,
                } as IUpdatedFirebaseGuildLastReleaseNotesVersion);
              });

              it(`should log that one Firebase guild is updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

                await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

                  await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the guild`, async (): Promise<void> => {
                  expect.assertions(2);

                  await service.sendNewReleaseNotesToEachGuild$().toPromise();

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

                    await service.sendNewReleaseNotesToEachGuild$().toPromise();

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
              queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuild => firebaseGuild,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                  callback(queryDocumentSnapshot);
                });
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
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

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-all Firebase guilds hint-(2) release notes already sent`,
                } as ILoggerLog);
              });

              it(`should not update the Firebase guild batch`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(updateMock).not.toHaveBeenCalled();
              });

              it(`should not commit the batch`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(commitMock).not.toHaveBeenCalled();
              });

              it(`should not send the release notes message for the guilds`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesToEachGuild$().toPromise();

                expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
              });
            });

            describe(`when the Firebase guild last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase guilds last release notes version in the batch`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
                  new Error(`Commit error`)
                );

                expect(updateMock).toHaveBeenCalledTimes(2);
                expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                  lastReleaseNotesVersion: `2.0.0`,
                } as IUpdatedFirebaseGuildLastReleaseNotesVersion);
              });

              it(`should log that two Firebase guilds are updating`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

                await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
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

                  await expect(service.sendNewReleaseNotesToEachGuild$().toPromise()).rejects.toThrow(
                    new Error(`Commit error`)
                  );

                  expect(sendNewReleaseNotesFromFirebaseGuildSpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the guilds`, async (): Promise<void> => {
                  expect.assertions(2);

                  await service.sendNewReleaseNotesToEachGuild$().toPromise();

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

                    await service.sendNewReleaseNotesToEachGuild$().toPromise();

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
    let guildChannel: GuildChannel;
    let textChannel: TextChannel;
    let discordMessageResponse: IDiscordMessageResponse;
    let discordMessageResponseError: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let discordGuildServiceGetGuildByIdSpy: jest.SpyInstance;
    let discordChannelGuildServiceGetPrimarySpy: jest.SpyInstance;
    let discordMessageCommandReleaseNotesServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordLoggerErrorServiceGetErrorMessageResponseSpy: jest.SpyInstance;
    let firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;
    let discordGithubContributorsIdMessagesGetRandomMessageSpy: jest.SpyInstance;
    let sendMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      firebaseGuild = createMock<IFirebaseGuildVFinal>({
        version: FirebaseGuildVersionEnum.V5,
      });
      guild = createMock<Guild>({
        id: `dummy-id`,
      });
      guildChannel = createMock<GuildChannel>({
        type: `news`,
      });
      sendMock = jest.fn().mockRejectedValue(new Error(`send error`));
      textChannel = createMock<TextChannel>({
        isText(): true {
          return true;
        },
        send: sendMock,
      });
      discordMessageResponse = createMock<IDiscordMessageResponse>();
      discordMessageResponseError = createMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
      discordGuildServiceGetGuildByIdSpy = jest.spyOn(discordGuildService, `getGuildById`).mockImplementation();
      discordChannelGuildServiceGetPrimarySpy = jest
        .spyOn(discordChannelGuildService, `getPrimary`)
        .mockImplementation();
      discordMessageCommandReleaseNotesServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandReleaseNotesService, `getMessageResponse`)
        .mockResolvedValue(discordMessageResponse);
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      discordLoggerErrorServiceGetErrorMessageResponseSpy = jest
        .spyOn(discordLoggerErrorService, `getErrorMessageResponse`)
        .mockReturnValue(discordMessageResponseError);
      firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(FirebaseGuildNewVersionResponseEnum.A_QUEEN_HAS_TO_WORK);
      discordGithubContributorsIdMessagesGetRandomMessageSpy = jest
        .spyOn(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES, `getRandomMessage`)
        .mockReturnValue(DiscordGithubContributorsIdEnum.C0ZEN);
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

      it(`should not get the Discord guild`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(discordGuildServiceGetGuildByIdSpy).not.toHaveBeenCalled();
      });

      it(`should not log an error about the Discord guild not existing`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Discord guild value-dummy-id does not exists`,
        } as ILoggerLog);
      });

      it(`should not get the Discord guild primary channel`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(discordChannelGuildServiceGetPrimarySpy).not.toHaveBeenCalled();
      });

      it(`should not log about not having a Discord guild primary channel found`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-guild value-dummy-id does not have a primary channel`,
        } as ILoggerLog);
      });

      it(`should not log about the Discord guild primary channel not being writable`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-guild value-dummy-id primary channel is not writable`,
        } as ILoggerLog);
      });

      it(`should not get the release notes command message response`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).not.toHaveBeenCalled();
      });

      it(`should send the message on the Discord guild primary channel`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(sendMock).not.toHaveBeenCalled();
      });

      it(`should not log about successfully sent the release notes`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceLogSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-release notes message sent for guild value-dummy-id on general channel`,
        } as ILoggerLog);
      });

      it(`should not log about the fail of the message sending`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-release notes message sending failed for the guild value-dummy-id on the general channel`,
        } as ILoggerLog);
      });

      it(`should not log the error`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Error: send error`,
        } as ILoggerLog);
      });

      it(`should get an error message response for Sonia`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
      });

      it(`should send an error message to the Discord Sonia errors channel`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
          new Error(`Firebase guild id nil`)
        );

        expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
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

        it(`should not get the Discord guild primary channel`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(discordChannelGuildServiceGetPrimarySpy).not.toHaveBeenCalled();
        });

        it(`should not log about not having a Discord guild primary channel found`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-guild value-dummy-id does not have a primary channel`,
          } as ILoggerLog);
        });

        it(`should not log about the Discord guild primary channel not being writable`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-guild value-dummy-id primary channel is not writable`,
          } as ILoggerLog);
        });

        it(`should not get the release notes command message response`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).not.toHaveBeenCalled();
        });

        it(`should send the message on the Discord guild primary channel`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(sendMock).not.toHaveBeenCalled();
        });

        it(`should not log about successfully sent the release notes`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(loggerServiceLogSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-release notes message sent for guild value-dummy-id on general channel`,
          } as ILoggerLog);
        });

        it(`should not log about the fail of the message sending`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-release notes message sending failed for the guild value-dummy-id on the general channel`,
          } as ILoggerLog);
        });

        it(`should not log the error`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Error: send error`,
          } as ILoggerLog);
        });

        it(`should get an error message response for Sonia`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
        });

        it(`should send an error message to the Discord Sonia errors channel`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Discord guild not found`)
          );

          expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Discord guild was found`, (): void => {
        beforeEach((): void => {
          discordGuildServiceGetGuildByIdSpy.mockReturnValue(guild);
        });

        it(`should not log an error about the Discord guild not existing`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Primary channel not found`)
          );

          expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Discord guild value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should get the Discord guild primary channel`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
            new Error(`Primary channel not found`)
          );

          expect(discordChannelGuildServiceGetPrimarySpy).toHaveBeenCalledTimes(1);
          expect(discordChannelGuildServiceGetPrimarySpy).toHaveBeenCalledWith(guild);
        });

        describe(`when the Discord guild primary channel was not found`, (): void => {
          beforeEach((): void => {
            discordChannelGuildServiceGetPrimarySpy.mockReturnValue(null);
          });

          it(`should log about not having a Discord guild primary channel found`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-guild value-dummy-id does not have a primary channel`,
            } as ILoggerLog);
          });

          it(`should not log about the Discord guild primary channel not being writable`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-guild value-dummy-id primary channel is not writable`,
            } as ILoggerLog);
          });

          it(`should not get the release notes command message response`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).not.toHaveBeenCalled();
          });

          it(`should send the message on the Discord guild primary channel`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(sendMock).not.toHaveBeenCalled();
          });

          it(`should not log about successfully sent the release notes`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(loggerServiceLogSpy).not.toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-release notes message sent for guild value-dummy-id on general channel`,
            } as ILoggerLog);
          });

          it(`should not log about the fail of the message sending`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-release notes message sending failed for the guild value-dummy-id on the general channel`,
            } as ILoggerLog);
          });

          it(`should not log the error`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-Error: send error`,
            } as ILoggerLog);
          });

          it(`should get an error message response for Sonia`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
          });

          it(`should send an error message to the Discord Sonia errors channel`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not found`)
            );

            expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the Discord guild primary channel was found`, (): void => {
          beforeEach((): void => {
            discordChannelGuildServiceGetPrimarySpy.mockReturnValue(guildChannel);
          });

          it(`should not log about not having a Discord guild primary channel found`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
              new Error(`Primary channel not writable`)
            );

            expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-guild value-dummy-id does not have a primary channel`,
            } as ILoggerLog);
          });

          describe(`when the Discord guild primary channel is not writable`, (): void => {
            beforeEach((): void => {
              guildChannel.type = `news`;

              discordChannelGuildServiceGetPrimarySpy.mockReturnValue(guildChannel);
            });

            it(`should log about the Discord guild primary channel not being writable`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-guild value-dummy-id primary channel is not writable`,
              } as ILoggerLog);
            });

            it(`should not get the release notes command message response`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).not.toHaveBeenCalled();
            });

            it(`should send the message on the Discord guild primary channel`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(sendMock).not.toHaveBeenCalled();
            });

            it(`should not log about successfully sent the release notes`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(loggerServiceLogSpy).not.toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-release notes message sent for guild value-dummy-id on general channel`,
              } as ILoggerLog);
            });

            it(`should not log about the fail of the message sending`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-release notes message sending failed for the guild value-dummy-id on the general channel`,
              } as ILoggerLog);
            });

            it(`should not log the error`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-Error: send error`,
              } as ILoggerLog);
            });

            it(`should get an error message response for Sonia`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
            });

            it(`should send an error message to the Discord Sonia errors channel`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`Primary channel not writable`)
              );

              expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when the Discord guild primary channel is writable`, (): void => {
            beforeEach((): void => {
              discordChannelGuildServiceGetPrimarySpy.mockReturnValue(textChannel);
            });

            it(`should not log about the Discord guild primary channel not being writable`, async (): Promise<void> => {
              expect.assertions(2);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`send error`)
              );

              expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-guild value-dummy-id primary channel is not writable`,
              } as ILoggerLog);
            });

            it(`should get the release notes command message response`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`send error`)
              );

              expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
              expect(discordMessageCommandReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledWith();
            });

            it(`should log about sending the release notes message on the general channel`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                new Error(`send error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsNewVersionService`,
                message: `text-sending release notes message for guild value-dummy-id on general channel`,
              } as ILoggerLog);
            });

            describe(`when the random response is a text with a userId variable`, (): void => {
              beforeEach((): void => {
                firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy.mockReturnValue(
                  FirebaseGuildNewVersionResponseEnum.ABOUT_TIME_USER_ID
                );
                discordGithubContributorsIdMessagesGetRandomMessageSpy.mockReturnValue(
                  DiscordGithubContributorsIdEnum.C0ZEN
                );
              });

              it(`should send the message on the Discord guild primary channel with the random response, replace the userId with the found one and wrap it as a mention`, async (): Promise<void> => {
                expect.assertions(5);

                await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                  new Error(`send error`)
                );

                expect(firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
                expect(firebaseGuildNewVersionResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
                  userId: `<@!260525899991089165>`,
                });
                expect(sendMock).toHaveBeenCalledTimes(1);
                expect(sendMock).toHaveBeenCalledWith(
                  FirebaseGuildNewVersionResponseEnum.ABOUT_TIME_USER_ID,
                  discordMessageResponse.options
                );
              });
            });

            describe(`when the Discord message failed to be sent`, (): void => {
              beforeEach((): void => {
                sendMock.mockRejectedValue(new Error(`send error`));
              });

              it(`should not log about successfully sent the release notes`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                  new Error(`send error`)
                );

                expect(loggerServiceLogSpy).not.toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-release notes message sent for guild value-dummy-id on general channel`,
                } as ILoggerLog);
              });

              it(`should log about the fail of the message sending`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                  new Error(`send error`)
                );

                expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
                expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-release notes message sending failed for the guild value-dummy-id on the general channel`,
                } as ILoggerLog);
              });

              it(`should log the error`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                  new Error(`send error`)
                );

                expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
                expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
                  context: `FirebaseGuildsNewVersionService`,
                  message: `error-Error: send error`,
                } as ILoggerLog);
              });

              it(`should get an error message response for Sonia`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                  new Error(`send error`)
                );

                expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
                expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledWith(
                  new Error(`send error`)
                );
              });

              it(`should send an error message to the Discord Sonia errors channel`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)).rejects.toThrow(
                  new Error(`send error`)
                );

                expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
                expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
                  channelName: `errors`,
                  messageResponse: discordMessageResponseError,
                } as IDiscordGuildSoniaSendMessageToChannel);
              });
            });

            describe(`when the Discord message was successfully sent`, (): void => {
              beforeEach((): void => {
                sendMock.mockResolvedValue(createMock<Message>());
              });

              it(`should log about successfully sent the release notes`, async (): Promise<void> => {
                expect.assertions(2);

                await service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild);

                expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-release notes message sent for guild value-dummy-id on general channel`,
                } as ILoggerLog);
              });

              it(`should not log about the fail of the message sending`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild);

                expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-release notes message sending failed for the guild value-dummy-id on the general channel`,
                } as ILoggerLog);
              });

              it(`should not log the error`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild);

                expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-Error: send error`,
                } as ILoggerLog);
              });

              it(`should not get an error message response for Sonia`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild);

                expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
              });

              it(`should not send an error message to the Discord Sonia errors channel`, async (): Promise<void> => {
                expect.assertions(1);

                await service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild);

                expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });
});
