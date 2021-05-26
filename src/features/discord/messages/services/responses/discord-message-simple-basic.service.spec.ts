import { DiscordMessageSimpleBasicService } from './discord-message-simple-basic.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordMessageSimpleBasicService`, (): void => {
  let service: DiscordMessageSimpleBasicService;
  let coreEventService: CoreEventService;
  let discordMessageContentService: DiscordMessageContentService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordMessageContentService = DiscordMessageContentService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageSimpleBasicService service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageSimpleBasicService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageSimpleBasicService));
    });

    it(`should return the created DiscordMessageSimpleBasicService service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageSimpleBasicService.getInstance();

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

    it(`should notify the DiscordMessageSimpleBasicService service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageSimpleBasicService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SIMPLE_BASIC_SERVICE
      );
    });
  });

  describe(`hasCriteria()`, (): void => {
    let message: string;

    beforeEach((): void => {
      service = new DiscordMessageSimpleBasicService();
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

    describe(`when the given message has only one mention without the simple text`, (): void => {
      beforeEach((): void => {
        message = `<@!123> yolo`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the basic text`, (): void => {
      beforeEach((): void => {
        message = `<@!123> basic`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the simple text`, (): void => {
      beforeEach((): void => {
        message = `<@!123> simple`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the basic text and another mention`, (): void => {
      beforeEach((): void => {
        message = `<@!123><@!456> basic`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the simple text and another mention`, (): void => {
      beforeEach((): void => {
        message = `<@!123><@!456> simple`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the simple text and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = `<@!123> simple  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the basic text and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = `<@!123> basic  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the simple text in uppercase`, (): void => {
      beforeEach((): void => {
        message = `<@!123> SIMPLE`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the basic text in uppercase`, (): void => {
      beforeEach((): void => {
        message = `<@!123> BASIC`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the simple text in uppercase and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = `<@!123> SIMPLE  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the basic text in uppercase and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = `<@!123> BASIC  `;
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
      service = new DiscordMessageSimpleBasicService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
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

      describe(`when the given Discord message contains a valid mention with SIMPLE`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> SIMPLE`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** BASIC`);
        });
      });

      describe(`when the given Discord message contains a valid mention with BASIC`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> BASIC`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** SIMPLE`);
        });
      });

      describe(`when the given Discord message contains a valid mention with SiMpLe`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> SiMpLe`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Basic`);
        });
      });

      describe(`when the given Discord message contains a valid mention with BaSiC`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> BaSiC`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Simple`);
        });
      });

      describe(`when the given Discord message contains a valid mention with Simple`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> Simple`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Basic`);
        });
      });

      describe(`when the given Discord message contains a valid mention with Basic`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> Basic`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** Simple`);
        });
      });

      describe(`when the given Discord message contains a valid mention with simple`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> simple`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** basic`);
        });
      });

      describe(`when the given Discord message contains a valid mention with basic`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `<@!123> basic`;
        });

        it(`should return a Discord message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.reply(anyDiscordMessage);

          expect(result.response).toStrictEqual(`**[dev]** simple`);
        });
      });
    });
  });
});
