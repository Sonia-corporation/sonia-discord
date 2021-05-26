import { DiscordMessageCommandHelpService } from './discord-message-command-help.service';
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
import { DiscordMessageHelpService } from '../../helpers/discord-message-help.service';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandHelpService`, (): void => {
  let service: DiscordMessageCommandHelpService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageHelpService: DiscordMessageHelpService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageHelpService = DiscordMessageHelpService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandHelp service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandHelpService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandHelpService));
    });

    it(`should return the created DiscordMessageCommandHelp service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandHelpService.getInstance();

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

    it(`should notify the DiscordMessageCommandHelp service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandHelpService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HELP_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandHelpService();
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
        context: `DiscordMessageCommandHelpService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-help command detected`,
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
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;
    let discordMessageHelpServiceGetMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandHelpService();

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandHelpImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandHelpImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandHelpImageUrl`
      );
      discordMessageHelpServiceGetMessageResponseSpy = jest.spyOn(discordMessageHelpService, `getMessageResponse`);
    });

    it(`should get the message response for the help`, async (): Promise<void> => {
      expect.assertions(3);
      discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));

      await expect(service.getMessageResponse()).rejects.toThrow(new Error(`getMessageResponse help error`));

      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response for the help failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse()).rejects.toThrow(new Error(`getMessageResponse help error`));
      });
    });

    describe(`when the message response for the help command was successfully fetched`, (): void => {
      it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
        expect.assertions(1);
        const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a description`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.description).toStrictEqual(
          `Below is the complete list of commands.\nYou can either use \`-\`, \`!\` or \`$\` as prefix to run a command.`
        );
      });

      it(`should return a Discord message response embed with 8 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields).toHaveLength(8);
      });

      it(`should return a Discord message response embed with a cookie field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          name: `Cookie (*cookie*, *cookies* or *c*)`,
          value: `Because I am good, life gave me cookies. Now it is my turn to give you some.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with an error field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[1]).toStrictEqual({
          name: `Error (*error* or *bug*)`,
          value: `Create a bug in my core system. Do not do this one, of course!`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a feature field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[2]).toStrictEqual({
          name: `Feature (*feature* or *f*)`,
          value: `Change my behavior on this guild or on this channel. Help me to be better! I have some cool abilities you know!`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a help field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[3]).toStrictEqual({
          name: `Help (*help* or *h*)`,
          value: `Ask for my help, it is obvious! And maybe I will, who knows?`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a lunch field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[4]).toStrictEqual({
          name: `Lunch (*lunch* or *l*)`,
          value: `There is a time to eat.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a release notes field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[5]).toStrictEqual({
          name: `Release notes (*release-notes* or *r*)`,
          value: `Display the last version release notes.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a version field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[6]).toStrictEqual({
          name: `Version (*version* or *v*)`,
          value: `Display my current application version.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a more help field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[7]).toStrictEqual({
          name: `Further help`,
          value: `You can also checkout the [readme](https://github.com/Sonia-corporation/sonia-discord/blob/master/README.md).
      It contains more information about how I work.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `dummy-image-url`,
          text: `At your service`,
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
            text: `At your service`,
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
            text: `At your service`,
          } as MessageEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

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

        expect(result.options.embed?.title).toStrictEqual(`So, you need my help? Cool.`);
      });

      it(`should return a Discord message response not split`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.split).toStrictEqual(false);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.response).toStrictEqual(``);
      });
    });

    describe(`hasCommand()`, (): void => {
      let message: string;

      let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

      beforeEach((): void => {
        service = new DiscordMessageCommandHelpService();
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
            message = `@version`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with another command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-version`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with another command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!version`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with @`, (): void => {
          beforeEach((): void => {
            message = `@hel`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-hel`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!hel`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@hel dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-hel dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!hel dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with @`, (): void => {
          beforeEach((): void => {
            message = `@help`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-help`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!help`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@help dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-help dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!help dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with @`, (): void => {
          beforeEach((): void => {
            message = `@h`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-h`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!h`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@h dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-h dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!h dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting uppercase with @`, (): void => {
          beforeEach((): void => {
            message = `@HELP`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with -`, (): void => {
          beforeEach((): void => {
            message = `-HELP`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with !`, (): void => {
          beforeEach((): void => {
            message = `!HELP`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@HELP dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-HELP dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!HELP dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting uppercase with @`, (): void => {
          beforeEach((): void => {
            message = `@H`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with -`, (): void => {
          beforeEach((): void => {
            message = `-H`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with !`, (): void => {
          beforeEach((): void => {
            message = `!H`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@H dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-H dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!H dummy`;
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
            message = `@version`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with another command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-version`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with another command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!version`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with @`, (): void => {
          beforeEach((): void => {
            message = `@hel`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-hel`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!hel`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@hel dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-hel dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with an almost help command starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!hel dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with @`, (): void => {
          beforeEach((): void => {
            message = `@help`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-help`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!help`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@help dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-help dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!help dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with @`, (): void => {
          beforeEach((): void => {
            message = `@HELP`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with -`, (): void => {
          beforeEach((): void => {
            message = `-HELP`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with !`, (): void => {
          beforeEach((): void => {
            message = `!HELP`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@HELP dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-HELP dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the help command uppercase starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!HELP dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with @`, (): void => {
          beforeEach((): void => {
            message = `@h`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with -`, (): void => {
          beforeEach((): void => {
            message = `-h`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with !`, (): void => {
          beforeEach((): void => {
            message = `!h`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@h dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-h dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!h dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with @`, (): void => {
          beforeEach((): void => {
            message = `@H`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with -`, (): void => {
          beforeEach((): void => {
            message = `-H`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with !`, (): void => {
          beforeEach((): void => {
            message = `!H`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with @ and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `@H dummy`;
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with - and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `-H dummy`;
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = service.hasCommand(message);

            expect(result).toStrictEqual(true);
          });
        });

        describe(`when the given message is a message with the shortcut help command uppercase starting with ! and have more text after that`, (): void => {
          beforeEach((): void => {
            message = `!H dummy`;
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
});
