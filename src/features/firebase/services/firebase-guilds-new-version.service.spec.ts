import * as admin from "firebase-admin";
import { Subject } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordClientService } from "../../discord/services/discord-client.service";
import { InitService } from "../../init/services/init.service";
import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { IFirebaseGuild } from "../interfaces/firebase-guild";
import { FirebaseGuildsNewVersionService } from "./firebase-guilds-new-version.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import QuerySnapshot = admin.firestore.QuerySnapshot;

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseGuildsNewVersionService`, (): void => {
  let service: FirebaseGuildsNewVersionService;
  let coreEventService: CoreEventService;
  let initService: InitService;
  let discordClientService: DiscordClientService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    initService = InitService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsNewVersion service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsNewVersionService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsNewVersionService)
      );
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
    let sendNewReleaseNotesToEachGuild$: Subject<[true, true, true]>;

    let sendNewReleaseNotesToEachGuild$Spy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      sendNewReleaseNotesToEachGuild$ = new Subject<[true, true, true]>();

      sendNewReleaseNotesToEachGuild$Spy = jest
        .spyOn(service, `sendNewReleaseNotesToEachGuild$`)
        .mockReturnValue(sendNewReleaseNotesToEachGuild$.asObservable());
    });

    it(`should send a new release note to each known guild`, (): void => {
      expect.assertions(2);

      service.init();

      expect(sendNewReleaseNotesToEachGuild$Spy).toHaveBeenCalledTimes(1);
      expect(sendNewReleaseNotesToEachGuild$Spy).toHaveBeenCalledWith();
    });
  });

  describe(`isReady$()`, (): void => {
    let initServiceIsAppConfiguredSpy: jest.SpyInstance;
    let discordClientServiceIsReadySpy: jest.SpyInstance;
    let firebaseGuildsServiceIsReadySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      initServiceIsAppConfiguredSpy = jest
        .spyOn(initService, `isAppConfigured`)
        .mockResolvedValue(true);
      discordClientServiceIsReadySpy = jest
        .spyOn(discordClientService, `isReady`)
        .mockResolvedValue(true);
      firebaseGuildsServiceIsReadySpy = jest
        .spyOn(firebaseGuildsService, `isReady`)
        .mockResolvedValue(true);
    });

    describe(`when the app was not successfully configured`, (): void => {
      beforeEach((): void => {
        initServiceIsAppConfiguredSpy.mockRejectedValue(new Error(`error`));
      });

      it(`should consider that the service is not ready`, (done): void => {
        expect.assertions(1);

        service.isReady$().subscribe({
          error: (error): void => {
            expect(error).toStrictEqual(new Error(`error`));
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
      });
    });

    describe(`when the app was successfully configured`, (): void => {
      beforeEach((): void => {
        initServiceIsAppConfiguredSpy.mockResolvedValue(true);
      });

      describe(`when the Firebase guilds ready check failed`, (): void => {
        beforeEach((): void => {
          discordClientServiceIsReadySpy.mockRejectedValue(new Error(`error`));
        });

        it(`should consider that the service is not ready`, (done): void => {
          expect.assertions(1);

          service.isReady$().subscribe({
            error: (error): void => {
              expect(error).toStrictEqual(new Error(`error`));
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
        });
      });

      describe(`when the Firebase guilds are ready`, (): void => {
        beforeEach((): void => {
          discordClientServiceIsReadySpy.mockResolvedValue(true);
        });

        describe(`when Discord ready check failed`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceIsReadySpy.mockRejectedValue(
              new Error(`error`)
            );
          });

          it(`should consider that the service is not ready`, (done): void => {
            expect.assertions(1);

            service.isReady$().subscribe({
              error: (error): void => {
                expect(error).toStrictEqual(new Error(`error`));
                done();
              },
              next: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
            });
          });
        });

        describe(`when Discord is ready`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceIsReadySpy.mockResolvedValue(true);
          });

          it(`should consider that the service is ready`, (done): void => {
            expect.assertions(1);

            service.isReady$().subscribe({
              error: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
              next: (result): void => {
                expect(result).toStrictEqual([true, true, true]);
                done();
              },
            });
          });
        });
      });
    });
  });

  describe.skip(`sendNewReleaseNotesToEachGuild$()`, (): void => {
    let isReady$: Subject<[true, true, true]>;
    let querySnapshot: QuerySnapshot<IFirebaseGuild>;

    let isReady$Spy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetGuildsSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      isReady$ = new Subject<[true, true, true]>();
      querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>();

      isReady$Spy = jest.spyOn(service, `isReady$`).mockReturnValue(isReady$);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      firebaseGuildsServiceGetGuildsSpy = jest
        .spyOn(firebaseGuildsService, `getGuilds`)
        .mockResolvedValue(querySnapshot);
    });

    it(`should wait that everything is ready`, (done): void => {
      expect.assertions(2);

      service.sendNewReleaseNotesToEachGuild$().subscribe({
        error: (): void => {
          expect(true).toStrictEqual(false);
          done();
        },
        next: (): void => {
          expect(isReady$Spy).toHaveBeenCalledTimes(1);
          expect(isReady$Spy).toHaveBeenCalledWith();
          done();
        },
      });
      isReady$.next([true, true, true]);
    });

    describe(`when an error occur when waiting to be ready`, (): void => {
      beforeEach((): void => {
        isReady$.error(new Error(`error`));
      });
    });

    describe(`once that everything is ready`, (): void => {
      beforeEach((): void => {
        isReady$.next([true, true, true]);
      });

      it(`should log about sending release notes to each guild`, (done): void => {
        expect.assertions(2);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
          next: (): void => {
            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-sending release notes to each guild...`,
            } as ILoggerLog);
            done();
          },
        });
        isReady$.next([true, true, true]);
      });

      it(`should get the guilds`, (done): void => {
        expect.assertions(2);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
          next: (): void => {
            expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledTimes(1);
            expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledWith();
            done();
          },
        });
        isReady$.next([true, true, true]);
      });

      describe(`when an error occurred when fetching the guilds`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockRejectedValue(
            new Error(`error`)
          );
        });
      });

      describe(`when the guilds were successfully fetched`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
        });

        it(`should log about the guilds fetched success`, (done): void => {
          expect.assertions(2);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
            next: (): void => {
              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `FirebaseGuildsNewVersionService`,
                message: `text-guilds fetched`,
              } as ILoggerLog);
              done();
            },
          });
          isReady$.next([true, true, true]);
        });
      });
    });
  });
});
