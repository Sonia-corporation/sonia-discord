import { ILoggerServiceCreated } from "../features/logger/interfaces/logger-service-created";
import { LoggerService } from "../features/logger/services/logger.service";
import { AbstractService } from "./abstract.service";

class DummyService extends AbstractService {
  public constructor(serviceName: Readonly<string>) {
    super(serviceName);
  }
}

describe(`AbstractService`, (): void => {
  let loggerService: LoggerService;

  let serviceName: string;

  let loggerServiceServiceCreatedSpy: jest.SpyInstance;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();

    loggerServiceServiceCreatedSpy = jest
      .spyOn(loggerService, `serviceCreated`)
      .mockImplementation();
  });

  describe(`when the service is created with the name "DummyService"`, (): void => {
    beforeEach((): void => {
      serviceName = `DummyService`;
    });

    it(`should log about the creation of the service`, (): void => {
      expect.assertions(2);

      new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: `DummyService`,
      } as ILoggerServiceCreated);
    });
  });

  describe(`when the service is created with the name "Service"`, (): void => {
    beforeEach((): void => {
      serviceName = `Service`;
    });

    it(`should log about the creation of the service`, (): void => {
      expect.assertions(2);

      new DummyService(serviceName);

      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceServiceCreatedSpy).toHaveBeenCalledWith({
        service: `Service`,
      } as ILoggerServiceCreated);
    });
  });
});
