import appRootPath from "app-root-path";
import fs from "fs-extra";
import { Subject } from "rxjs";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { IEnvironment } from "../../../environment/interfaces/environment";
import { CoreEventService } from "../../core/services/core-event.service";
import { LoggerService } from "../../logger/services/logger.service";
import { InitService } from "./init.service";

describe(`InitService`, (): void => {
  let service: InitService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Init service`, (): void => {
      expect.assertions(1);

      service = InitService.getInstance();

      expect(service).toStrictEqual(expect.any(InitService));
    });

    it(`should return the created Init service`, (): void => {
      expect.assertions(1);

      const result = InitService.getInstance();

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

    it(`should notify the Init service creation`, (): void => {
      expect.assertions(2);

      service = new InitService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.INIT_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let readJson$: Subject<IEnvironment>;

    let loggerServiceInitSpy: jest.SpyInstance;
    let fsReadJsonSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new InitService();
      readJson$ = new Subject<IEnvironment>();

      loggerServiceInitSpy = jest.spyOn(loggerService, `init`);
      fsReadJsonSpy = jest
        .spyOn(fs, `readJson`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(readJson$.toPromise());
    });

    it(`should initialize the logger service`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceInitSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInitSpy).toHaveBeenLastCalledWith();
    });

    it(`should read the secret environment file`, (): void => {
      expect.assertions(2);

      service.init();

      expect(fsReadJsonSpy).toHaveBeenCalledTimes(1);
      expect(fsReadJsonSpy).toHaveBeenLastCalledWith(
        `${appRootPath}/src/environment/secret-environment.json`
      );
    });
  });

  describe(`isAppConfigured$()`, (): void => {
    beforeEach((): void => {
      service = new InitService();
    });

    it(`should be false by default`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.isAppConfigured$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (isTrue: boolean): void => {
          expect(isTrue).toStrictEqual(false);
          doneCallback();
        },
      });
    });

    describe(`when the is app configured event is notified`, (): void => {
      it(`should emit a new value into the stream`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.notifyIsAppConfigured();
        service.isAppConfigured$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (isTrue: boolean): void => {
            expect(isTrue).toStrictEqual(true);
            doneCallback();
          },
        });
      });
    });
  });

  describe(`isAppConfigured()`, (): void => {
    beforeEach((): void => {
      service = new InitService();
    });

    describe(`when the is ready event is notified`, (): void => {
      beforeEach((): void => {
        service.notifyIsAppConfigured();
      });

      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsAppConfigured();

        const isReady = await service.isAppConfigured();

        expect(isReady).toStrictEqual(true);
      });
    });
  });

  describe(`notifyIsAppConfigured()`, (): void => {
    beforeEach((): void => {
      service = new InitService();
    });

    it(`should notify that the app is configured`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.notifyIsAppConfigured();
      service.isAppConfigured$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (isTrue: boolean): void => {
          expect(isTrue).toStrictEqual(true);
          doneCallback();
        },
      });
    });
  });
});
