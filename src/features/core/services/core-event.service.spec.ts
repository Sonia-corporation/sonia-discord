import { take, tap } from "rxjs/operators";
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

      it(`should notify that a service was created by using the given service name`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service
          .serviceCreated$()
          .pipe(
            tap({
              next: (): void => service.notifyServiceCreated(serviceName),
            }),
            take(1)
          )
          .toPromise();

        expect(result).toStrictEqual(ServiceNameEnum.CHALK_SERVICE);
      });
    });

    describe(`when the given service name is ServiceNameEnum.APP_CONFIG_QUERY_SERVICE`, (): void => {
      beforeEach((): void => {
        serviceName = ServiceNameEnum.APP_CONFIG_QUERY_SERVICE;
      });

      it(`should notify that a service was created by using the given service name`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service
          .serviceCreated$()
          .pipe(
            tap({
              next: (): void => service.notifyServiceCreated(serviceName),
            }),
            take(1)
          )
          .toPromise();

        expect(result).toStrictEqual(ServiceNameEnum.APP_CONFIG_QUERY_SERVICE);
      });
    });
  });

  describe(`serviceCreated$()`, (): void => {
    let serviceName: ServiceNameEnum;

    beforeEach((): void => {
      serviceName = ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE;
      service = new CoreEventService();
    });

    describe(`when the service created event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyServiceCreated(serviceName);

        const result = await service
          .serviceCreated$()
          .pipe(take(1))
          .toPromise();

        expect(result).toStrictEqual(
          ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE
        );
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
