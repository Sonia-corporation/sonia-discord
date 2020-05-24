import * as chalk from "chalk";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../interfaces/logger-log";
import { LoggerService } from "../logger.service";
import { ChalkColorService } from "./chalk-color.service";
import { ChalkService } from "./chalk.service";

jest.mock(`./chalk.service`);

describe(`ChalkColorService`, (): void => {
  let service: ChalkColorService;
  let coreEventService: CoreEventService;
  let chalkService: ChalkService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    chalkService = ChalkService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a ChalkColor service`, (): void => {
      expect.assertions(1);

      service = ChalkColorService.getInstance();

      expect(service).toStrictEqual(expect.any(ChalkColorService));
    });

    it(`should return the created ChalkColor service`, (): void => {
      expect.assertions(1);

      const result = ChalkColorService.getInstance();

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

    it(`should notify the ChalkColor service creation`, (): void => {
      expect.assertions(2);

      service = new ChalkColorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.CHALK_COLOR_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let chalkLevel: chalk.Level;

    let chalkServiceGetLevelSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new ChalkColorService();

      chalkServiceGetLevelSpy = jest.spyOn(chalkService, `getLevel`);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should get the chalk level`, (): void => {
      expect.assertions(2);

      service.init();

      expect(chalkServiceGetLevelSpy).toHaveBeenCalledTimes(1);
      expect(chalkServiceGetLevelSpy).toHaveBeenCalledWith();
    });

    describe(`when the chalk level is 0`, (): void => {
      beforeEach((): void => {
        chalkLevel = 0;

        chalkServiceGetLevelSpy.mockReturnValue(chalkLevel);
      });

      it(`should log about no colors`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `ChalkColorService`,
          message: `text-chalk color level: value-0hint- (All colors disabled)`,
        } as ILoggerLog);
      });
    });

    describe(`when the chalk level is 1`, (): void => {
      beforeEach((): void => {
        chalkLevel = 1;

        chalkServiceGetLevelSpy.mockReturnValue(chalkLevel);
      });

      it(`should log about 16 colors`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `ChalkColorService`,
          message: `text-chalk color level: value-1hint- (Basic 16 colors support)`,
        } as ILoggerLog);
      });
    });

    describe(`when the chalk level is 2`, (): void => {
      beforeEach((): void => {
        chalkLevel = 2;

        chalkServiceGetLevelSpy.mockReturnValue(chalkLevel);
      });

      it(`should log about 256 colors`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `ChalkColorService`,
          message: `text-chalk color level: value-2hint- (ANSI 256 colors support)`,
        } as ILoggerLog);
      });
    });

    describe(`when the chalk level is 3`, (): void => {
      beforeEach((): void => {
        chalkLevel = 3;

        chalkServiceGetLevelSpy.mockReturnValue(chalkLevel);
      });

      it(`should log about 16 millions colors`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `ChalkColorService`,
          message: `text-chalk color level: value-3hint- (Truecolor 16 million colors support)`,
        } as ILoggerLog);
      });
    });

    describe(`when the chalk level is 8 (wrong value)`, (): void => {
      beforeEach((): void => {
        (chalkLevel as number) = 8;

        chalkServiceGetLevelSpy.mockReturnValue(chalkLevel);
      });

      it(`should not log`, (): void => {
        expect.assertions(2);

        expect((): void => {
          service.init();
        }).toThrow(Error(`The given chalk level should be between 0 and 3`));
        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.init();
        }).toThrow(Error(`The given chalk level should be between 0 and 3`));
      });
    });
  });
});
