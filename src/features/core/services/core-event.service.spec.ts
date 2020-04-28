import { Observable } from "rxjs";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "./core-event.service";

describe(`CoreEventService`, (): void => {
  let service: CoreEventService;

  describe(`getInstance()`, (): void => {
    it(`should create a CoreEvent service`, (): void => {
      expect.assertions(1);

      service = CoreEventService.getInstance();

      expect(service).toStrictEqual(expect.any(CoreEventService));
    });

    it(`should return the created CoreEvent service`, (): void => {
      expect.assertions(1);

      service.notifyServiceCreated(
        ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE
      );
      const result = CoreEventService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`init()`, (): void => {
    beforeEach((): void => {
      service = new CoreEventService();
    });

    it(`should listen to server created event and push every created service in the created services list`, (): void => {
      expect.assertions(1);
      service.init();
      service.notifyServiceCreated(
        ServiceNameEnum.DISCORD_MESSAGE_CONFIG_SERVICE
      );
      service.notifyServiceCreated(ServiceNameEnum.SERVER_SERVICE);

      const result = service.getCreatedServices();

      expect(result).toStrictEqual([
        ServiceNameEnum.CORE_SERVICE,
        ServiceNameEnum.CORE_EVENT_SERVICE,
        ServiceNameEnum.DISCORD_MESSAGE_CONFIG_SERVICE,
        ServiceNameEnum.SERVER_SERVICE,
      ]);
    });
  });

  describe(`notifyServiceCreated()`, (): void => {
    let serviceName: ServiceNameEnum;

    beforeEach((): void => {
      service = new CoreEventService();
    });

    describe(`when the given service name is ServiceNameEnum.CHALK_SERVICE`, (): void => {
      beforeEach((): void => {
        serviceName = ServiceNameEnum.CHALK_SERVICE;
      });

      it(`should notify that a service was created by using the given service name`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.serviceCreated$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (result: ServiceNameEnum): void => {
            expect(result).toStrictEqual(ServiceNameEnum.CHALK_SERVICE);
            doneCallback();
          },
        });
        service.notifyServiceCreated(serviceName);
      });
    });

    describe(`when the given service name is ServiceNameEnum.APP_CONFIG_QUERY_SERVICE`, (): void => {
      beforeEach((): void => {
        serviceName = ServiceNameEnum.APP_CONFIG_QUERY_SERVICE;
      });

      it(`should notify that a service was created by using the given service name`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.serviceCreated$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (result: ServiceNameEnum): void => {
            expect(result).toStrictEqual(
              ServiceNameEnum.APP_CONFIG_QUERY_SERVICE
            );
            doneCallback();
          },
        });
        service.notifyServiceCreated(serviceName);
      });
    });
  });

  describe(`serviceCreated$()`, (): void => {
    let serviceName: ServiceNameEnum;

    beforeEach((): void => {
      serviceName = ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE;
      service = new CoreEventService();
    });

    it(`should return an observable`, (): void => {
      expect.assertions(1);

      const result = service.serviceCreated$();

      expect(result).toStrictEqual(expect.any(Observable));
    });

    describe(`when the service created event is notified`, (): void => {
      it(`should emit a new value into the stream`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.serviceCreated$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (result: ServiceNameEnum): void => {
            expect(result).toStrictEqual(
              ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE
            );
            doneCallback();
          },
        });
        service.notifyServiceCreated(serviceName);
      });
    });
  });

  describe(`getCreatedServices()`, (): void => {
    beforeEach((): void => {
      service = new CoreEventService();
    });

    it(`should return the initial list of created services`, (): void => {
      expect.assertions(1);

      service = new CoreEventService();

      expect(service.getCreatedServices()).toStrictEqual([
        ServiceNameEnum.CORE_SERVICE,
        ServiceNameEnum.CORE_EVENT_SERVICE,
      ]);
    });
  });
});
