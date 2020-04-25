import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordGuildMemberAddService } from "./discord-guild-member-add.service";

describe(`DiscordGuildMemberAddService`, (): void => {
  let service: DiscordGuildMemberAddService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildMemberAdd service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildMemberAddService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildMemberAddService));
    });

    it(`should return the created DiscordGuildMemberAdd service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildMemberAddService.getInstance();

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

    it(`should notify the DiscordGuildMemberAdd service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildMemberAddService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_MEMBER_ADD_SERVICE
      );
    });
  });
});
