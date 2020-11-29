import { DiscordMessageHotelTrivagoService } from './discord-message-hotel-trivago.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES } from '../../constants/discord-message-hotel-trivago-response-messages';
import { IDiscordMessageHotelTrivagoResponseMessage } from '../../interfaces/discord-message-hotel-trivago-response-message';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { createMock } from 'ts-auto-mock';

describe(`DiscordMessageHotelTrivagoService`, (): void => {
  let service: DiscordMessageHotelTrivagoService;
  let coreEventService: CoreEventService;
  let discordMessageContentService: DiscordMessageContentService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordMessageContentService = DiscordMessageContentService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageHotelTrivago service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageHotelTrivagoService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageHotelTrivagoService));
    });

    it(`should return the created DiscordMessageHotelTrivago service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageHotelTrivagoService.getInstance();

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

    it(`should notify the DiscordMessageHotelTrivago service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageHotelTrivagoService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_HOTEL_TRIVAGO_SERVICE
      );
    });
  });

  describe(`hasCriteria()`, (): void => {
    let message: string;

    beforeEach((): void => {
      service = new DiscordMessageHotelTrivagoService();
    });

    describe(`when the given message is empty`, (): void => {
      beforeEach((): void => {
        message = ``;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has no mention`, (): void => {
      beforeEach((): void => {
        message = `dummy message`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention`, (): void => {
      beforeEach((): void => {
        message = `<@!123>`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with spaces before and after`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> `;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention without the hotel text`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> yolo`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the hotel text`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> hotel`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the hotel text and another mention`, (): void => {
      beforeEach((): void => {
        message = ` <@!123><@!456> hotel`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the hotel text and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> hotel  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the hotel text in uppercase`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> HOTEL`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the hotel text in uppercase and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> HOTEL  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`reply()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageContentServiceHasContentSpy: jest.SpyInstance;
    let discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageHotelTrivagoService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        content: `dummy-content`,
      });

      discordMessageContentServiceHasContentSpy = jest
        .spyOn(discordMessageContentService, `hasContent`)
        .mockImplementation();
      discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy = jest
        .spyOn(DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES, `getHumanizedRandomMessage`)
        .mockReturnValue(`trivago`);
    });

    it(`should check if the given Discord message is empty`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.reply(anyDiscordMessage)).rejects.toThrow(new Error(`No content`));

      expect(discordMessageContentServiceHasContentSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageContentServiceHasContentSpy).toHaveBeenCalledWith(`dummy-content`);
    });

    describe(`when the given Discord message is empty`, (): void => {
      beforeEach((): void => {
        discordMessageContentServiceHasContentSpy.mockReturnValue(false);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.reply(anyDiscordMessage)).rejects.toThrow(new Error(`No content`));
      });
    });

    describe(`when the given Discord message is not empty`, (): void => {
      beforeEach((): void => {
        discordMessageContentServiceHasContentSpy.mockReturnValue(true);
      });

      it(`should return a Discord message response not split`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.reply(anyDiscordMessage);

        expect(result.options.split).toStrictEqual(false);
      });

      describe(`when the given Discord message contains a valid mention with HOTEL`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> HOTEL`;
        });

        it(`should get a random hotel trivago message response with TRIVAGO`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.reply(anyDiscordMessage);

          expect(result).toBeDefined();
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            trivago: `TRIVAGO`,
          } as IDiscordMessageHotelTrivagoResponseMessage);
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** trivago`);
        });
      });

      describe(`when the given Discord message contains a valid mention with HoTeL`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> HoTeL`;
        });

        it(`should get a random hotel trivago message response with Trivago`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.reply(anyDiscordMessage);

          expect(result).toBeDefined();
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            trivago: `Trivago`,
          } as IDiscordMessageHotelTrivagoResponseMessage);
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** trivago`);
        });
      });

      describe(`when the given Discord message contains a valid mention with Hotel`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> Hotel`;
        });

        it(`should get a random hotel trivago message response with Trivago`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.reply(anyDiscordMessage);

          expect(result).toBeDefined();
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            trivago: `Trivago`,
          } as IDiscordMessageHotelTrivagoResponseMessage);
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** trivago`);
        });
      });

      describe(`when the given Discord message contains a valid mention with hotel`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> hotel`;
        });

        it(`should get a random hotel trivago message response with trivago`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.reply(anyDiscordMessage);

          expect(result).toBeDefined();
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageHotelTrivagoResponseMessagesGetHumanizedRandomMessageSpy).toHaveBeenCalledWith({
            trivago: `trivago`,
          } as IDiscordMessageHotelTrivagoResponseMessage);
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** trivago`);
        });
      });
    });
  });
});
