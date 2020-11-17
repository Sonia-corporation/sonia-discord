import { InitService } from './init.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ChalkColorService } from '../../logger/services/chalk/chalk-color.service';
import { LoggerService } from '../../logger/services/logger.service';
import { take } from 'rxjs/operators';

describe(`InitService`, (): void => {
  let service: InitService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let chalkColorService: ChalkColorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    chalkColorService = ChalkColorService.getInstance();
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
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.INIT_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let loggerServiceInitSpy: jest.SpyInstance;
    let chalkColorServiceInitSpy: jest.SpyInstance;
    let readEnvironmentSpy: jest.SpyInstance;
    let notifyIsAppConfiguredSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new InitService();

      loggerServiceInitSpy = jest.spyOn(loggerService, `init`);
      chalkColorServiceInitSpy = jest.spyOn(chalkColorService, `init`);
      readEnvironmentSpy = jest.spyOn(service, `readEnvironment`).mockResolvedValue();
      notifyIsAppConfiguredSpy = jest.spyOn(service, `notifyIsAppConfigured`).mockImplementation();
    });

    it(`should initialize the logger service`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(loggerServiceInitSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInitSpy).toHaveBeenLastCalledWith();
    });

    it(`should initialize the chalk color service`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(chalkColorServiceInitSpy).toHaveBeenCalledTimes(1);
      expect(chalkColorServiceInitSpy).toHaveBeenLastCalledWith();
    });

    it(`should read the environment`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(readEnvironmentSpy).toHaveBeenCalledTimes(1);
      expect(readEnvironmentSpy).toHaveBeenLastCalledWith();
    });

    describe(`when the environment failed to be read`, (): void => {
      beforeEach((): void => {
        readEnvironmentSpy.mockRejectedValue(new Error(`readEnvironment error`));
      });

      it(`should not notify that the app was configured`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`readEnvironment error`));

        expect(notifyIsAppConfiguredSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the environment was successfully read`, (): void => {
      beforeEach((): void => {
        readEnvironmentSpy.mockResolvedValue(true);
      });

      it(`should notify that the app was configured`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(notifyIsAppConfiguredSpy).toHaveBeenCalledTimes(1);
        expect(notifyIsAppConfiguredSpy).toHaveBeenLastCalledWith();
      });
    });
  });

  describe(`isAppConfigured$()`, (): void => {
    beforeEach((): void => {
      service = new InitService();
    });

    it(`should be false by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.isAppConfigured$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(false);
    });

    describe(`when the is app configured event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsAppConfigured();

        const result = await service.isAppConfigured$().pipe(take(1)).toPromise();

        expect(result).toStrictEqual(true);
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

        const result = await service.isAppConfigured();

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`notifyIsAppConfigured()`, (): void => {
    beforeEach((): void => {
      service = new InitService();
    });

    it(`should notify that the app is configured`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyIsAppConfigured();

      const result = await service.isAppConfigured$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(true);
    });
  });
});
