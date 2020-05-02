import appRootPath from "app-root-path";
import fs from "fs-extra";
import mockFs from "mock-fs";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
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
    let loggerServiceInitSpy: jest.SpyInstance;
    let fsReadJsonSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new InitService();

      loggerServiceInitSpy = jest
        .spyOn(loggerService, `init`)
        .mockImplementation();
      fsReadJsonSpy = jest.spyOn(fs, `readJson`);
      consoleErrorSpy = jest.spyOn(console, `error`).mockImplementation();
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

    describe(`when the secret environment file does not exist`, (): void => {
      beforeEach((): void => {
        mockFs({});
      });

      it(`should log about the error`, (): void => {
        expect.assertions(3);

        const result = service.init;

        expect(result).toThrow(`error`);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenNthCalledWith(
          1,
          `Failed to read the environment file`
        );
      });

      it(`should log the error`, (): void => {
        expect.assertions(3);

        const result = service.init;

        expect(result).toThrow(`error`);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenNthCalledWith(2, `error`);
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        const result = service.init;

        expect(result).toThrow(`error`);
      });
    });
  });
});
