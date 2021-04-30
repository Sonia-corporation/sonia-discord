import { DiscordMessageAnyQuestionPineapplePizzaService } from './discord-message-any-question-pineapple-pizza.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { createMock } from 'ts-auto-mock';

describe(`DiscordMessageAnyQuestionPineapplePizzaService`, (): void => {
  let service: DiscordMessageAnyQuestionPineapplePizzaService;
  let coreEventService: CoreEventService;
  let discordMessageContentService: DiscordMessageContentService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordMessageContentService = DiscordMessageContentService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageAnyQuestionPineapplePizzaService service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageAnyQuestionPineapplePizzaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageAnyQuestionPineapplePizzaService));
    });

    it(`should return the created DiscordMessageAnyQuestionPineapplePizzaService service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageAnyQuestionPineapplePizzaService.getInstance();

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

    it(`should notify the DiscordMessageAnyQuestionPineapplePizzaService service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageAnyQuestionPineapplePizzaService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_ANY_QUESTION_PINEAPPLE_PIZZA_SERVICE
      );
    });
  });

  describe(`hasCriteria()`, (): void => {
    let message: string;

    beforeEach((): void => {
      service = new DiscordMessageAnyQuestionPineapplePizzaService();
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

    describe(`when the given message has only one mention without the any question text`, (): void => {
      beforeEach((): void => {
        message = `<@!123> yolo`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the any question text without space between any and question`, (): void => {
      beforeEach((): void => {
        message = `<@!123> anyquestion?`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the any question text`, (): void => {
      beforeEach((): void => {
        message = `<@!123> any question?`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the any question text and another mention`, (): void => {
      beforeEach((): void => {
        message = `<@!123><@!456> any question?`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the any question text and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = `<@!123> any question?  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the any question text and extra spaces inside`, (): void => {
      beforeEach((): void => {
        message = `<@!123> any   question?`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the any question text in uppercase`, (): void => {
      beforeEach((): void => {
        message = `<@!123> ANY QUESTION?`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the any question text in uppercase and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = `<@!123> ANY QUESTION?  `;
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

    beforeEach((): void => {
      service = new DiscordMessageAnyQuestionPineapplePizzaService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        content: `dummy-content`,
      });

      discordMessageContentServiceHasContentSpy = jest
        .spyOn(discordMessageContentService, `hasContent`)
        .mockImplementation();
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

      describe(`when the given Discord message contains a valid mention with ANY QUESTION?`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> ANY QUESTION?`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Do you like pineapple pizza?`);
        });
      });

      describe(`when the given Discord message contains a valid mention with AnY qUeStIoN?`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> AnY qUeStIoN?`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Do you like pineapple pizza?`);
        });
      });

      describe(`when the given Discord message contains a valid mention with Any question?`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> Any question?`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Do you like pineapple pizza?`);
        });
      });

      describe(`when the given Discord message contains a valid mention with any question?`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> any question?`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Do you like pineapple pizza?`);
        });
      });
    });
  });
});
