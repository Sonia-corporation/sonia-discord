import { DiscordMessageCommandVersionService } from './discord-message-command-version.service';
import { ColorEnum } from '../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { AppProductionStateEnum } from '../../../../../app/enums/app-production-state.enum';
import { AppConfigQueryService } from '../../../../../app/services/config/app-config-query.service';
import { AppConfigService } from '../../../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordSoniaEmotionalStateEnum } from '../../../../emotional-states/enums/discord-sonia-emotional-state.enum';
import { DiscordSoniaEmotionalStateService } from '../../../../emotional-states/services/discord-sonia-emotional-state.service';
import { DiscordSoniaService } from '../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandVersionService`, (): void => {
  let service: DiscordMessageCommandVersionService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordSoniaEmotionalStateService: DiscordSoniaEmotionalStateService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let appConfigQueryService: AppConfigQueryService;
  let appConfigService: AppConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordSoniaEmotionalStateService = DiscordSoniaEmotionalStateService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    appConfigQueryService = AppConfigQueryService.getInstance();
    appConfigService = AppConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVersionService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandVersionService));
    });

    it(`should return the created DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandVersionService.getInstance();

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

    it(`should notify the DiscordMessageCommandVersion service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVersionService();
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
        context: `DiscordMessageCommandVersionService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-version command detected`,
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
    let discordMessageConfigServiceGetMessageCommandVersionImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let appConfigQueryServiceGetTotalReleaseCountHumanizedSpy: jest.SpyInstance;
    let appConfigQueryServiceGetFirstReleaseDateFormattedSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandVersionImageUrlSpy: jest.SpyInstance;
    let discordSoniaServiceGetFullNameSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let appConfigQueryServiceGetReleaseDateHumanizedSpy: jest.SpyInstance;
    let appConfigQueryServiceGetInitializationDateHumanizedSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseNotesSpy: jest.SpyInstance;
    let appConfigQueryServiceGetProductionStateHumanizedSpy: jest.SpyInstance;
    let discordSoniaEmotionalStateServiceGetEmotionalStateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVersionService();

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandVersionImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandVersionImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getTotalReleaseCountHumanized`
      );
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy = jest.spyOn(
        appConfigQueryService,
        `getFirstReleaseDateFormatted`
      );
      discordMessageConfigServiceGetMessageCommandVersionImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandVersionImageUrl`
      );
      discordSoniaServiceGetFullNameSpy = jest.spyOn(discordSoniaService, `getFullName`);
      appConfigServiceGetVersionSpy = jest.spyOn(appConfigService, `getVersion`);
      appConfigQueryServiceGetReleaseDateHumanizedSpy = jest.spyOn(appConfigQueryService, `getReleaseDateHumanized`);
      appConfigQueryServiceGetInitializationDateHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getInitializationDateHumanized`
      );
      appConfigServiceGetReleaseNotesSpy = jest.spyOn(appConfigService, `getReleaseNotes`);
      appConfigQueryServiceGetProductionStateHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getProductionStateHumanized`
      );
      discordSoniaEmotionalStateServiceGetEmotionalStateSpy = jest.spyOn(
        discordSoniaEmotionalStateService,
        `getEmotionalState`
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
      discordMessageConfigServiceGetMessageCommandVersionImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with 6 fields`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields).toHaveLength(6);
    });

    it(`should return a Discord message response embed with an application version field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigServiceGetVersionSpy.mockReturnValue(`8`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[0]).toStrictEqual({
        name: `My age`,
        value: `[8](https://github.com/Sonia-corporation/sonia-discord/releases/tag/8)`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a release date field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigQueryServiceGetReleaseDateHumanizedSpy.mockReturnValue(`dummy-release-date-humanized`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[1]).toStrictEqual({
        inline: false,
        name: `My last birthday`,
        value: `dummy-release-date-humanized`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a initialization date field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigQueryServiceGetInitializationDateHumanizedSpy.mockReturnValue(`dummy-initialization-date-humanized`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[2]).toStrictEqual({
        inline: false,
        name: `The last time I woken up`,
        value: `dummy-initialization-date-humanized`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a release notes field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigServiceGetReleaseNotesSpy.mockReturnValue(`dummy-release-notes`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[3]).toStrictEqual({
        name: `My birthday card`,
        value: `dummy-release-notes\n\nCheckout all my [birthday cards](https://github.com/Sonia-corporation/sonia-discord/blob/master/CHANGELOG.md).`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a status field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigQueryServiceGetProductionStateHumanizedSpy.mockReturnValue(AppProductionStateEnum.DEVELOPMENT);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[4]).toStrictEqual({
        inline: false,
        name: `My location`,
        value: `Running in development`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with an emotional state field`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaEmotionalStateServiceGetEmotionalStateSpy.mockReturnValue(DiscordSoniaEmotionalStateEnum.AGITATED);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.fields?.[5]).toStrictEqual({
        inline: false,
        name: `My emotional state`,
        value: `Agitated`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 birthdays`);
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `8 birthdays since the 24th March 2020`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 birthdays`);
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: undefined,
          text: `8 birthdays since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 birthdays`);
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `8 birthdays since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandVersionImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

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
      discordSoniaServiceGetFullNameSpy.mockReturnValue(`dummy-full-name`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.title).toStrictEqual(`dummy-full-name version`);
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
      service = new DiscordMessageCommandVersionService();
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

      describe(`when the given message is a message with an almost version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!VERSION dummy`;
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

      describe(`when the given message is a message with an almost version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!VERSION dummy`;
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
