import { Subject } from "rxjs";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordClientService } from "../../discord/services/discord-client.service";
import { InitService } from "../../init/services/init.service";
import { FirebaseGuildsNewVersionService } from "./firebase-guilds-new-version.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseGuildsNewVersionService`, (): void => {
  let service: FirebaseGuildsNewVersionService;
  let coreEventService: CoreEventService;
  let initService: InitService;
  let discordClientService: DiscordClientService;
  let firebaseGuildsService: FirebaseGuildsService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    initService = InitService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
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

  describe(`isReady$()`, (): void => {
    let isAppConfigured$: Subject<boolean>;
    let discordClientServiceIsReady$: Subject<boolean>;
    let firebaseGuildsServiceIsReady$: Subject<boolean>;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      isAppConfigured$ = new Subject<boolean>();
      discordClientServiceIsReady$ = new Subject<boolean>();
      firebaseGuildsServiceIsReady$ = new Subject<boolean>();

      jest
        .spyOn(initService, `isAppConfigured$`)
        .mockReturnValue(isAppConfigured$);
      jest
        .spyOn(discordClientService, `isReady$`)
        .mockReturnValue(discordClientServiceIsReady$);
      jest
        .spyOn(firebaseGuildsService, `isReady$`)
        .mockReturnValue(firebaseGuildsServiceIsReady$);
    });

    describe(`when the app was not successfully configured`, (): void => {
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
        isAppConfigured$.error(new Error(`error`));
        discordClientServiceIsReady$.next(true);
        firebaseGuildsServiceIsReady$.next(true);
      });
    });

    describe(`when the app was successfully configured`, (): void => {
      describe(`when the Firebase guilds ready check failed`, (): void => {
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
          isAppConfigured$.next(true);
          discordClientServiceIsReady$.error(new Error(`error`));
          firebaseGuildsServiceIsReady$.next(true);
        });
      });

      describe(`when the Firebase guilds are ready`, (): void => {
        describe(`when Discord ready check failed`, (): void => {
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
            isAppConfigured$.next(true);
            discordClientServiceIsReady$.next(true);
            firebaseGuildsServiceIsReady$.error(new Error(`error`));
          });
        });

        describe(`when Discord is ready`, (): void => {
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
            isAppConfigured$.next(true);
            discordClientServiceIsReady$.next(true);
            firebaseGuildsServiceIsReady$.next(true);
          });
        });
      });
    });
  });
});
