import { DiscordMessageCommandReleaseNotesService } from './discord-message-command-release-notes.service';
import { ColorEnum } from '../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { AppConfigReleaseTypeEnum } from '../../../../../app/enums/app-config-release-type.enum';
import { AppConfigQueryService } from '../../../../../app/services/config/app-config-query.service';
import { AppConfigService } from '../../../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordSoniaService } from '../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandReleaseNotesService`, (): void => {
  let service: DiscordMessageCommandReleaseNotesService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let appConfigQueryService: AppConfigQueryService;
  let appConfigService: AppConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    appConfigQueryService = AppConfigQueryService.getInstance();
    appConfigService = AppConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandReleaseNotes service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandReleaseNotesService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandReleaseNotesService));
    });

    it(`should return the created DiscordMessageCommandReleaseNotes service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandReleaseNotesService.getInstance();

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

    it(`should notify the DiscordMessageCommandReleaseNotes service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandReleaseNotesService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_RELEASE_NOTES_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandReleaseNotesService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getMessageResponseSpy = jest.spyOn(service, `getMessageResponse`).mockResolvedValue(discordMessageResponse);
    });

    it(`should log about the command`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandReleaseNotesService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-release notes command detected`,
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
    let releaseType: AppConfigReleaseTypeEnum;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesBugFixesImageColorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesFeaturesImageColorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesMixedImageColorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesPerformanceImprovementsImageColorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesUnknownImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let appConfigQueryServiceGetTotalReleaseCountHumanizedSpy: jest.SpyInstance;
    let appConfigQueryServiceGetFirstReleaseDateFormattedSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesBugFixesImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesFeaturesImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesMixedImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesPerformanceImprovementsImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesUnknownImageUrlSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let appConfigQueryServiceGetReleaseDateHumanizedSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseNotesSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseTypeSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandReleaseNotesService();
      releaseType = AppConfigReleaseTypeEnum.UNKNOWN;

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesBugFixesImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesBugFixesImageColor`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesFeaturesImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesFeaturesImageColor`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesMixedImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesMixedImageColor`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesPerformanceImprovementsImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesPerformanceImprovementsImageColor`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesUnknownImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesUnknownImageColor`
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
      discordMessageConfigServiceGetMessageCommandReleaseNotesBugFixesImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesBugFixesImageUrl`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesFeaturesImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesFeaturesImageUrl`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesMixedImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesMixedImageUrl`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesPerformanceImprovementsImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesPerformanceImprovementsImageUrl`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesUnknownImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesUnknownImageUrl`
      );
      appConfigServiceGetVersionSpy = jest.spyOn(appConfigService, `getVersion`);
      appConfigQueryServiceGetReleaseDateHumanizedSpy = jest.spyOn(appConfigQueryService, `getReleaseDateHumanized`);
      appConfigServiceGetReleaseNotesSpy = jest.spyOn(appConfigService, `getReleaseNotes`);
      appConfigServiceGetReleaseTypeSpy = jest.spyOn(appConfigService, `getReleaseType`).mockReturnValue(releaseType);
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a description`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigServiceGetReleaseNotesSpy.mockReturnValue(`dummy-release-notes`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.description).toBe(
        `dummy-release-notes\n\nCheckout all the [release notes](https://github.com/Sonia-corporation/sonia-discord/blob/master/CHANGELOG.md).`
      );
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 versions`);
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `8 versions since the 24th March 2020`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 versions`);
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: undefined,
          text: `8 versions since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 versions`);
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `8 versions since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the release type is bug fixes`, (): void => {
      beforeEach((): void => {
        releaseType = AppConfigReleaseTypeEnum.BUG_FIXES;

        appConfigServiceGetReleaseTypeSpy.mockReturnValue(releaseType);
      });

      it(`should return a Discord message response embed with a bug fixes color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesBugFixesImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a bug fixes thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesBugFixesImageUrlSpy.mockReturnValue(
          IconEnum.NEW_PRODUCT
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.NEW_PRODUCT,
        } as MessageEmbedThumbnail);
      });
    });

    describe(`when the release type is features`, (): void => {
      beforeEach((): void => {
        releaseType = AppConfigReleaseTypeEnum.FEATURES;

        appConfigServiceGetReleaseTypeSpy.mockReturnValue(releaseType);
      });

      it(`should return a Discord message response embed with a features color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesFeaturesImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a features thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesFeaturesImageUrlSpy.mockReturnValue(
          IconEnum.NEW_PRODUCT
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.NEW_PRODUCT,
        } as MessageEmbedThumbnail);
      });
    });

    describe(`when the release type is mixed`, (): void => {
      beforeEach((): void => {
        releaseType = AppConfigReleaseTypeEnum.MIXED;

        appConfigServiceGetReleaseTypeSpy.mockReturnValue(releaseType);
      });

      it(`should return a Discord message response embed with a mixed color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesMixedImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a mixed thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesMixedImageUrlSpy.mockReturnValue(IconEnum.NEW_PRODUCT);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.NEW_PRODUCT,
        } as MessageEmbedThumbnail);
      });
    });

    describe(`when the release type is performance improvements`, (): void => {
      beforeEach((): void => {
        releaseType = AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS;

        appConfigServiceGetReleaseTypeSpy.mockReturnValue(releaseType);
      });

      it(`should return a Discord message response embed with a performance improvements color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesPerformanceImprovementsImageColorSpy.mockReturnValue(
          ColorEnum.CANDY
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a performance improvements thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesPerformanceImprovementsImageUrlSpy.mockReturnValue(
          IconEnum.NEW_PRODUCT
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.NEW_PRODUCT,
        } as MessageEmbedThumbnail);
      });
    });

    describe(`when the release type is unknown`, (): void => {
      beforeEach((): void => {
        releaseType = AppConfigReleaseTypeEnum.UNKNOWN;

        appConfigServiceGetReleaseTypeSpy.mockReturnValue(releaseType);
      });

      it(`should return a Discord message response embed with an unknown color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesUnknownImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with an unknown thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandReleaseNotesUnknownImageUrlSpy.mockReturnValue(
          IconEnum.NEW_PRODUCT
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.NEW_PRODUCT,
        } as MessageEmbedThumbnail);
      });
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse();

      expect(moment(result.options.embed?.timestamp).isValid()).toBe(true);
      expect(moment(result.options.embed?.timestamp).fromNow()).toBe(`a few seconds ago`);
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigServiceGetVersionSpy.mockReturnValue(`8`);
      appConfigQueryServiceGetReleaseDateHumanizedSpy.mockReturnValue(`dummy-release-date-humanized`);

      const result = await service.getMessageResponse();

      expect(result.options.embed?.title).toBe(`**8** release notes - dummy-release-date-humanized`);
    });

    it(`should return a Discord message response not split`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.split).toBe(false);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.response).toBe(``);
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandReleaseNotesService();
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

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@rel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-rel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!rel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@rel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-rel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!rel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@release-notes`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command starting with @ without the dashed separator`, (): void => {
        beforeEach((): void => {
          message = `@releasenotes`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-release-notes`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!release-notes`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@release-notes dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-release-notes dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!release-notes dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@r`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-r`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!r`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@r dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-r dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!r dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@RELEASE-NOTES`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-RELEASE-NOTES`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!RELEASE-NOTES`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@RELEASE-NOTES dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-RELEASE-NOTES dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!RELEASE-NOTES dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@R`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-R`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!R`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@R dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-R dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!R dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
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

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@rel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-rel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!rel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@rel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-rel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost release notes command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!rel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@release-notes`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-release-notes`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!release-notes`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@release-notes dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-release-notes dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!release-notes dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@RELEASE-NOTES`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-RELEASE-NOTES`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!RELEASE-NOTES`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@RELEASE-NOTES dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-RELEASE-NOTES dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the release notes command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!RELEASE-NOTES dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@r`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-r`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!r`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@r dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-r dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!r dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@R`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-R`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!R`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@R dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-R dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut release notes command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!R dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });
    });
  });
});
