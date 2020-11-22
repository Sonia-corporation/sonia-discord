import { DiscordMessageDmService } from './discord-message-dm.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { createMock } from 'ts-auto-mock';

describe(`DiscordMessageDmService`, (): void => {
  let service: DiscordMessageDmService;
  let coreEventService: CoreEventService;
  let discordAuthorService: DiscordAuthorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordAuthorService = DiscordAuthorService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageDmService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageDmService));
    });

    it(`should return the created DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageDmService.getInstance();

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

    it(`should notify the DiscordMessageDm service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageDmService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_MESSAGE_DM_SERVICE);
    });
  });

  describe(`getMessage()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordAuthorServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageDmService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        author: {
          id: `dummy-author-id`,
        },
      });

      discordAuthorServiceIsValidSpy = jest.spyOn(discordAuthorService, `isValid`).mockImplementation();
    });

    it(`should check if the author of the message is valid`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid author`));

      expect(discordAuthorServiceIsValidSpy).toHaveBeenCalledTimes(1);
      expect(discordAuthorServiceIsValidSpy).toHaveBeenCalledWith(anyDiscordMessage.author);
    });
  });
});
