import { DiscordMessageTextService } from './discord-message-text.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordMentionService } from '../../../mentions/services/discord-mention.service';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageTextService`, (): void => {
  let service: DiscordMessageTextService;
  let coreEventService: CoreEventService;
  let discordAuthorService: DiscordAuthorService;
  let discordMentionService: DiscordMentionService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordAuthorService = DiscordAuthorService.getInstance();
    discordMentionService = DiscordMentionService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageText service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageTextService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageTextService));
    });

    it(`should return the created DiscordMessageText service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageTextService.getInstance();

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

    it(`should notify the DiscordMessageText service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageTextService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_TEXT_SERVICE
      );
    });
  });

  describe(`getMessage()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordAuthorServiceIsValidSpy: jest.SpyInstance;
    let discordMentionServiceIsValidSpy: jest.SpyInstance;
    let getAnyDiscordMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageTextService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();

      discordAuthorServiceIsValidSpy = jest.spyOn(discordAuthorService, `isValid`).mockImplementation();
      discordMentionServiceIsValidSpy = jest.spyOn(discordMentionService, `isValid`).mockImplementation();
      getAnyDiscordMessageResponseSpy = jest
        .spyOn(service, `getAnyDiscordMessageResponse`)
        .mockRejectedValue(new Error(`getAnyDiscordMessageResponse error`));
    });

    it(`should check if the author of the message is valid`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid author`));

      expect(discordAuthorServiceIsValidSpy).toHaveBeenCalledTimes(1);
      expect(discordAuthorServiceIsValidSpy).toHaveBeenCalledWith(anyDiscordMessage.author);
    });

    describe(`when the author of the message is not valid`, (): void => {
      beforeEach((): void => {
        discordAuthorServiceIsValidSpy.mockReturnValue(false);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid author`));
      });
    });

    describe(`when the author of the message is valid`, (): void => {
      beforeEach((): void => {
        discordAuthorServiceIsValidSpy.mockReturnValue(true);
      });

      it(`should check if the mentions inside the message are valid`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid mention`));

        expect(discordMentionServiceIsValidSpy).toHaveBeenCalledTimes(1);
        expect(discordMentionServiceIsValidSpy).toHaveBeenCalledWith(anyDiscordMessage.mentions);
      });

      describe(`when the mentions inside the message are not valid`, (): void => {
        beforeEach((): void => {
          discordMentionServiceIsValidSpy.mockReturnValue(false);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid mention`));
        });
      });

      describe(`when the mentions inside the message are valid`, (): void => {
        beforeEach((): void => {
          discordMentionServiceIsValidSpy.mockReturnValue(true);
        });

        it(`should get a message response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(
            new Error(`getAnyDiscordMessageResponse error`)
          );

          expect(getAnyDiscordMessageResponseSpy).toHaveBeenCalledTimes(1);
          expect(getAnyDiscordMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
        });
      });
    });
  });
});
