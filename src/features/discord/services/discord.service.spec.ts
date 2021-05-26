import { DiscordService } from './discord.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { DiscordActivitySoniaService } from '../activities/services/discord-activity-sonia.service';
import { DiscordAuthenticationService } from '../authentications/services/discord-authentication.service';
import { DiscordSoniaEmotionalStateEnum } from '../emotional-states/enums/discord-sonia-emotional-state.enum';
import { DiscordSoniaEmotionalStateService } from '../emotional-states/services/discord-sonia-emotional-state.service';
import { DiscordGuildCreateService } from '../guilds/services/discord-guild-create.service';
import { DiscordGuildMemberAddService } from '../guilds/services/discord-guild-member-add.service';
import { DiscordGuildSoniaService } from '../guilds/services/discord-guild-sonia.service';
import { DiscordGuildService } from '../guilds/services/discord-guild.service';
import { DiscordLoggerService } from '../logger/services/discord-logger.service';
import { DiscordMessageService } from '../messages/services/discord-message.service';
import { DiscordMessageScheduleNoonService } from '../messages/services/schedule/discord-message-schedule-noon.service';
import { DiscordSoniaService } from '../users/services/discord-sonia.service';
import { Presence } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordService`, (): void => {
  let service: DiscordService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Discord service`, (): void => {
      expect.assertions(1);

      service = DiscordService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordService));
    });

    it(`should return the created Discord service`, (): void => {
      expect.assertions(1);

      const result = DiscordService.getInstance();

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

    it(`should notify the Discord service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let discordLoggerService: DiscordLoggerService;
    let discordGuildService: DiscordGuildService;
    let discordGuildMemberAddService: DiscordGuildMemberAddService;
    let discordGuildCreateService: DiscordGuildCreateService;
    let discordMessageService: DiscordMessageService;
    let discordAuthenticationService: DiscordAuthenticationService;
    let discordMessageScheduleNoonService: DiscordMessageScheduleNoonService;
    let discordGuildSoniaService: DiscordGuildSoniaService;
    let discordActivitySoniaService: DiscordActivitySoniaService;
    let discordSoniaEmotionalStateService: DiscordSoniaEmotionalStateService;

    let discordSoniaServiceGetInstanceSpy: jest.SpyInstance;
    let discordLoggerServiceGetInstanceSpy: jest.SpyInstance;
    let discordLoggerServiceGetInstanceInitSpy: jest.SpyInstance;
    let discordGuildServiceGetInstanceSpy: jest.SpyInstance;
    let discordGuildServiceGetInstanceInitSpy: jest.SpyInstance<Promise<void>>;
    let discordGuildMemberAddServiceGetInstanceSpy: jest.SpyInstance;
    let discordGuildMemberAddServiceGetInstanceInitSpy: jest.SpyInstance;
    let discordGuildCreateServiceGetInstanceSpy: jest.SpyInstance;
    let discordGuildCreateServiceGetInstanceInitSpy: jest.SpyInstance;
    let discordMessageServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageServiceGetInstanceInitSpy: jest.SpyInstance;
    let discordAuthenticationServiceGetInstanceSpy: jest.SpyInstance;
    let discordAuthenticationServiceGetInstanceInitSpy: jest.SpyInstance<Promise<void>>;
    let discordMessageScheduleNoonServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageScheduleNoonServiceGetInstanceInitSpy: jest.SpyInstance;
    let discordGuildSoniaServiceGetInstanceSpy: jest.SpyInstance;
    let discordGuildSoniaServiceGetInstanceInitSpy: jest.SpyInstance;
    let discordActivitySoniaServiceGetInstanceSpy: jest.SpyInstance;
    let discordActivitySoniaServiceInitSpy: jest.SpyInstance<Promise<Presence>>;
    let discordSoniaEmotionalStateServiceGetInstanceSpy: jest.SpyInstance;
    let discordSoniaEmotionalStateServiceInitSpy: jest.SpyInstance<Promise<DiscordSoniaEmotionalStateEnum>>;

    beforeEach((): void => {
      service = new DiscordService();
      discordLoggerService = createHydratedMock<DiscordLoggerService>();
      discordGuildService = createHydratedMock<DiscordGuildService>();
      discordGuildMemberAddService = createHydratedMock<DiscordGuildMemberAddService>();
      discordGuildCreateService = createHydratedMock<DiscordGuildCreateService>();
      discordMessageService = createHydratedMock<DiscordMessageService>();
      discordAuthenticationService = createHydratedMock<DiscordAuthenticationService>();
      discordMessageScheduleNoonService = createHydratedMock<DiscordMessageScheduleNoonService>();
      discordGuildSoniaService = createHydratedMock<DiscordGuildSoniaService>();
      discordActivitySoniaService = createHydratedMock<DiscordActivitySoniaService>();
      discordSoniaEmotionalStateService = createHydratedMock<DiscordSoniaEmotionalStateService>();

      discordSoniaServiceGetInstanceSpy = jest.spyOn(DiscordSoniaService, `getInstance`);
      discordLoggerServiceGetInstanceSpy = jest
        .spyOn(DiscordLoggerService, `getInstance`)
        .mockReturnValue(discordLoggerService);
      discordLoggerServiceGetInstanceInitSpy = jest.spyOn(discordLoggerService, `init`);
      discordGuildServiceGetInstanceSpy = jest
        .spyOn(DiscordGuildService, `getInstance`)
        .mockReturnValue(discordGuildService);
      discordGuildServiceGetInstanceInitSpy = jest.spyOn(discordGuildService, `init`).mockResolvedValue();
      discordGuildMemberAddServiceGetInstanceSpy = jest
        .spyOn(DiscordGuildMemberAddService, `getInstance`)
        .mockReturnValue(discordGuildMemberAddService);
      discordGuildMemberAddServiceGetInstanceInitSpy = jest.spyOn(discordGuildMemberAddService, `init`);
      discordGuildCreateServiceGetInstanceSpy = jest
        .spyOn(DiscordGuildCreateService, `getInstance`)
        .mockReturnValue(discordGuildCreateService);
      discordGuildCreateServiceGetInstanceInitSpy = jest.spyOn(discordGuildCreateService, `init`);
      discordMessageServiceGetInstanceSpy = jest
        .spyOn(DiscordMessageService, `getInstance`)
        .mockReturnValue(discordMessageService);
      discordMessageServiceGetInstanceInitSpy = jest.spyOn(discordMessageService, `init`);
      discordAuthenticationServiceGetInstanceSpy = jest
        .spyOn(DiscordAuthenticationService, `getInstance`)
        .mockReturnValue(discordAuthenticationService);
      discordAuthenticationServiceGetInstanceInitSpy = jest
        .spyOn(discordAuthenticationService, `init`)
        .mockResolvedValue();
      discordMessageScheduleNoonServiceGetInstanceSpy = jest
        .spyOn(DiscordMessageScheduleNoonService, `getInstance`)
        .mockReturnValue(discordMessageScheduleNoonService);
      discordMessageScheduleNoonServiceGetInstanceInitSpy = jest.spyOn(discordMessageScheduleNoonService, `init`);
      discordGuildSoniaServiceGetInstanceSpy = jest
        .spyOn(DiscordGuildSoniaService, `getInstance`)
        .mockReturnValue(discordGuildSoniaService);
      discordGuildSoniaServiceGetInstanceInitSpy = jest.spyOn(discordGuildSoniaService, `init`);
      discordActivitySoniaServiceGetInstanceSpy = jest
        .spyOn(DiscordActivitySoniaService, `getInstance`)
        .mockReturnValue(discordActivitySoniaService);
      discordActivitySoniaServiceInitSpy = jest
        .spyOn(discordActivitySoniaService, `init`)
        .mockResolvedValue(createHydratedMock<Presence>());
      discordSoniaEmotionalStateServiceGetInstanceSpy = jest
        .spyOn(DiscordSoniaEmotionalStateService, `getInstance`)
        .mockReturnValue(discordSoniaEmotionalStateService);
      discordSoniaEmotionalStateServiceInitSpy = jest
        .spyOn(discordSoniaEmotionalStateService, `init`)
        .mockResolvedValue(DiscordSoniaEmotionalStateEnum.AGITATED);
    });

    it(`should create the DiscordSonia service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.init();

      expect(discordSoniaServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordLogger service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordLoggerServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordLoggerServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordLoggerServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordGuild service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordGuildServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordGuildServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordGuildMemberAdd service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordGuildMemberAddServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordGuildMemberAddServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildMemberAddServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordGuildCreate service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordGuildCreateServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordGuildCreateServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildCreateServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordMessage service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordMessageServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordMessageServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordAuthentication service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordAuthenticationServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordAuthenticationServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordAuthenticationServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordMessageScheduleNoon service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordMessageScheduleNoonServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordMessageScheduleNoonServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageScheduleNoonServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordGuildSonia service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordGuildSoniaServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordGuildSoniaServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildSoniaServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the DiscordActivitySonia service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordActivitySoniaServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordActivitySoniaServiceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordActivitySoniaServiceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the discordSoniaEmotionalState service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(discordSoniaEmotionalStateServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(discordSoniaEmotionalStateServiceInitSpy).toHaveBeenCalledTimes(1);
      expect(discordSoniaEmotionalStateServiceInitSpy).toHaveBeenCalledWith();
    });
  });
});
