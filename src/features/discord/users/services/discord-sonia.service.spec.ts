import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordSoniaService } from "./discord-sonia.service";

describe(`DiscordSoniaService`, (): void => {
  let service: DiscordSoniaService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordSonia service`, (): void => {
      expect.assertions(1);

      service = DiscordSoniaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordSoniaService));
    });

    it(`should return the created DiscordSonia service`, (): void => {
      expect.assertions(1);

      const result = DiscordSoniaService.getInstance();

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

    it(`should notify the DiscordSonia service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordSoniaService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_SERVICE
      );
    });
  });
});
