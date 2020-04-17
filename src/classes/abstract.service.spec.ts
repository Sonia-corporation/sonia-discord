import { ServiceNameEnum } from "./enums/service-name.enum";
import { ILoggerServiceCreated } from "../features/logger/interfaces/logger-service-created";
import { LoggerService } from "../features/logger/services/logger.service";
import { AbstractService } from "./abstract.service";

class DummyService extends AbstractService {
  public constructor(serviceName: Readonly<ServiceNameEnum>) {
    super(serviceName);
  }
}

describe(`AbstractService`, (): void => {
  let loggerService: LoggerService;

  let serviceName: ServiceNameEnum;

  let loggerServiceServiceCreatedSpy: jest.SpyInstance;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();

    loggerServiceServiceCreatedSpy = jest
      .spyOn(loggerService, `serviceCreated`)
      .mockImplementation();
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_SERVICE;
    });

    it(`should log about the creation of the AppConfig service`, (): void => {
      expect.assertions(2);

      new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: ServiceNameEnum.APP_CONFIG_SERVICE,
      } as ILoggerServiceCreated);
    });
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_CORE_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
    });

    it(`should log about the creation of the AppConfigCore service`, (): void => {
      expect.assertions(2);

      new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: ServiceNameEnum.APP_CONFIG_CORE_SERVICE,
      } as ILoggerServiceCreated);
    });
  });
});
