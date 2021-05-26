import { DiscordMessageCommandErrorService } from './discord-message-command-error.service';
import { ColorEnum } from '../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordSoniaService } from '../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandErrorService`, (): void => {
  let service: DiscordMessageCommandErrorService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandErrorService));
    });

    it(`should return the created DiscordMessageCommandError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_ERROR_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandErrorService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`);
      getMessageResponseSpy = jest.spyOn(service, `getMessageResponse`).mockResolvedValue(discordMessageResponse);
    });

    it(`should log about the command`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandErrorService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-error command detected`,
      } as ILoggerLog);
    });

    it(`should get a message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith();
    });

    it(`should return the message response`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.handleResponse(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandErrorService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandErrorImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandErrorImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandErrorImageUrl`
      );
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with 2 fields`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields).toHaveLength(2);
    });

    it(`should return a Discord message response embed with a bait field`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[0]).toStrictEqual({
        name: `It seems that something went wrong`,
        value: `You may have found an issue with my internal core system.
      Please, inform my creator as soon as possible!
      This could lead to a very critical failure for myself and I do not wish to die!!`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a hint field`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[1]).toStrictEqual({
        name: `Come again?`,
        value: `What do you think you are doing here?
      That is not the way it works!
      Get back to work you peasant.`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `Nice try though`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: undefined,
          text: `Nice try though`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `Nice try though`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse();

      expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);

      expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.title).toStrictEqual(`Uh-oh. What just happened?`);
    });

    it(`should return a Discord message response not split`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.handleResponse(anyDiscordMessage);

      expect(result.response).toStrictEqual(``);
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandErrorService();
      message = `dummy-message`;

      discordMessageConfigServiceGetMessageCommandPrefixSpy = jest
        .spyOn(discordMessageConfigService, `getMessageCommandPrefix`)
        .mockImplementation();
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(`@`);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@error`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-error`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!error`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@error dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-error dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!error dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@bug`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-bug`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!bug`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@bug dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-bug dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!bug dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@ERROR`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-ERROR`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ERROR`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ERROR dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-ERROR dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ERROR dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@BUG`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-BUG`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!BUG`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@BUG dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-BUG dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!BUG dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });
    });

    describe(`when the message command prefix is "-" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([`-`, `!`]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@error`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-error`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!error`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@error dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-error dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!error dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ERROR`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-ERROR`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ERROR`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ERROR dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-ERROR dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ERROR dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@bug`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-bug`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!bug`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@bug dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-bug dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!bug dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@BUG`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-BUG`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!BUG`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@BUG dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-BUG dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!BUG dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });
    });
  });
});
