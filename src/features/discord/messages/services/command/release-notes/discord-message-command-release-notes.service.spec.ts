import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
} from "discord.js";
import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ColorEnum } from "../../../../../../enums/color.enum";
import { IconEnum } from "../../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { AppConfigQueryService } from "../../../../../app/services/config/app-config-query.service";
import { AppConfigService } from "../../../../../app/services/config/app-config.service";
import { CoreEventService } from "../../../../../core/services/core-event.service";
import { ILoggerLog } from "../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordSoniaService } from "../../../../users/services/discord-sonia.service";
import { AnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";
import { DiscordMessageCommandReleaseNotesService } from "./discord-message-command-release-notes.service";

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

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandReleaseNotesService)
      );
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
    let anyDiscordMessage: AnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let appConfigQueryServiceGetTotalReleaseCountHumanizedSpy: jest.SpyInstance;
    let appConfigQueryServiceGetFirstReleaseDateFormattedSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandReleaseNotesImageUrlSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let appConfigQueryServiceGetReleaseDateHumanizedSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseNotesSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<AnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`);
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(
        discordSoniaService,
        `getImageUrl`
      );
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getTotalReleaseCountHumanized`
      );
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy = jest.spyOn(
        appConfigQueryService,
        `getFirstReleaseDateFormatted`
      );
      discordMessageConfigServiceGetMessageCommandReleaseNotesImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandReleaseNotesImageUrl`
      );
      appConfigServiceGetVersionSpy = jest.spyOn(
        appConfigService,
        `getVersion`
      );
      appConfigQueryServiceGetReleaseDateHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getReleaseDateHumanized`
      );
      appConfigServiceGetReleaseNotesSpy = jest.spyOn(
        appConfigService,
        `getReleaseNotes`
      );
    });

    it(`should log about the command`, (): void => {
      expect.assertions(2);

      service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandReleaseNotesService`,
        extendedContext: true,
        message: `context-[dummy-id] text-release notes command detected`,
      } as ILoggerLog);
    });

    it(`should return a Discord message response embed with an author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createMock<
        MessageEmbedAuthor
      >();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(
        messageEmbedAuthor
      );

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, (): void => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandReleaseNotesImageColorSpy.mockReturnValue(
        ColorEnum.CANDY
      );

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with a description`, (): void => {
      expect.assertions(1);
      appConfigServiceGetReleaseNotesSpy.mockReturnValue(`dummy-release-notes`);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.description).toStrictEqual(
        `dummy-release-notes\n\nCheckout all the [release notes](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md).`
      );
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, (): void => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(
        `8 versions`
      );
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(
        `the 24th March 2020`
      );

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `8 versions since the 24th March 2020`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(
          `8 versions`
        );
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(
          `the 24th March 2020`
        );
      });

      it(`should return a Discord message response embed with a footer but without an icon`, (): void => {
        expect.assertions(1);

        const result: unknown = service.handleResponse(anyDiscordMessage);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: undefined,
          text: `8 versions since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(
          `8 versions`
        );
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(
          `the 24th March 2020`
        );
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, (): void => {
        expect.assertions(1);

        const result: unknown = service.handleResponse(anyDiscordMessage);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `8 versions since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, (): void => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandReleaseNotesImageUrlSpy.mockReturnValue(
        IconEnum.NEW_PRODUCT
      );

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.thumbnail).toStrictEqual({
        url: IconEnum.NEW_PRODUCT,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, (): void => {
      expect.assertions(2);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(moment(result.options.embed.timestamp).isValid()).toStrictEqual(
        true
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(moment(result.options.embed.timestamp).fromNow()).toStrictEqual(
        `a few seconds ago`
      );
    });

    it(`should return a Discord message response embed with a title`, (): void => {
      expect.assertions(1);
      appConfigServiceGetVersionSpy.mockReturnValue(`8`);
      appConfigQueryServiceGetReleaseDateHumanizedSpy.mockReturnValue(
        `dummy-release-date-humanized`
      );

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.title).toStrictEqual(
        `**8** release notes - dummy-release-date-humanized`
      );
    });

    it(`should return a Discord message response splitted`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.split).toStrictEqual(true);
    });

    it(`should return a Discord message response without a response text`, (): void => {
      expect.assertions(1);

      const result = service.handleResponse(anyDiscordMessage);

      expect(result.response).toStrictEqual(``);
    });
  });
});
