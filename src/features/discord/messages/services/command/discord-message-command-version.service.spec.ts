import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
  EmbedFieldData,
} from "discord.js";
import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ColorEnum } from "../../../../../enums/color.enum";
import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { AppProductionStateEnum } from "../../../../app/enums/app-production-state.enum";
import { AppConfigQueryService } from "../../../../app/services/config/app-config-query.service";
import { AppConfigService } from "../../../../app/services/config/app-config.service";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { ILoggerLog } from "../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { DiscordSoniaEmotionalStateEnum } from "../../../users/enums/discord-sonia-emotional-state.enum";
import { DiscordSoniaService } from "../../../users/services/discord-sonia.service";
import { AnyDiscordMessage } from "../../types/any-discord-message";
import { DiscordMessageConfigService } from "../config/discord-message-config.service";
import { DiscordMessageCommandVersionService } from "./discord-message-command-version.service";

jest.mock(`../../../../logger/services/chalk.service`);

describe(`DiscordMessageCommandVersionService`, (): void => {
  let service: DiscordMessageCommandVersionService;
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
    it(`should create a DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVersionService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandVersionService)
      );
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
    let anyDiscordMessage: AnyDiscordMessage;
    let messageEmbedAuthor: MessageEmbedAuthor;
    let imageUrl: string | null;
    let discordMessageCommandVersionConfig: IDiscordMessageCommandVersionConfig;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<AnyDiscordMessage>({
        id: `dummy-id`,
      });
      messageEmbedAuthor = createMock<MessageEmbedAuthor>();
      imageUrl = `dummy-image-url`;
      discordMessageCommandVersionConfig = createMock<
        IDiscordMessageCommandVersionConfig
      >({
        imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
      });

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      jest
        .spyOn(discordSoniaService, `getCorporationMessageEmbedAuthor`)
        .mockReturnValue(messageEmbedAuthor);
      jest
        .spyOn(
          discordMessageConfigService,
          `getMessageCommandVersionImageColor`
        )
        .mockReturnValue(ColorEnum.CANDY);
      discordSoniaServiceGetImageUrlSpy = jest
        .spyOn(discordSoniaService, `getImageUrl`)
        .mockReturnValue(imageUrl);
      jest
        .spyOn(appConfigQueryService, `getTotalReleaseCountHumanized`)
        .mockReturnValue(`8 versions`);
      jest
        .spyOn(discordMessageConfigService, `getMessageCommandVersion`)
        .mockReturnValue(discordMessageCommandVersionConfig);
      jest
        .spyOn(discordSoniaService, `getFullName`)
        .mockReturnValue(`dummy-full-name`);
      jest.spyOn(appConfigService, `getVersion`).mockReturnValue(`8`);
      jest
        .spyOn(appConfigQueryService, `getReleaseDateHumanized`)
        .mockReturnValue(`dummy-release-date-humanized`);
      jest
        .spyOn(appConfigQueryService, `getInitializationDateHumanized`)
        .mockReturnValue(`dummy-initialization-date-humanized`);
      jest
        .spyOn(appConfigService, `getReleaseNotes`)
        .mockReturnValue(`dummy-release-notes`);
      jest
        .spyOn(appConfigQueryService, `getProductionStateHumanized`)
        .mockReturnValue(AppProductionStateEnum.DEVELOPMENT);
      jest
        .spyOn(discordSoniaService, `getEmotionalState`)
        .mockReturnValue(DiscordSoniaEmotionalStateEnum.AGITATED);
    });

    it(`should log about the command`, (): void => {
      expect.assertions(2);

      service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandVersionService`,
        extendedContext: true,
        message: `context-[dummy-id] text-version command detected`,
      } as ILoggerLog);
    });

    it(`should return a Discord message response embed with an author`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with 6 fields`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields).toHaveLength(6);
    });

    it(`should return a Discord message response embed with an application version field`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields[0]).toStrictEqual({
        name: `My age`,
        value: `[8](https://github.com/Sonia-corporation/il-est-midi-discord/releases/tag/8)`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a release date field`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields[1]).toStrictEqual({
        inline: true,
        name: `My last birthday`,
        value: `dummy-release-date-humanized`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a initialization date field`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields[2]).toStrictEqual({
        inline: true,
        name: `The last time I woken up`,
        value: `dummy-initialization-date-humanized`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a release notes field`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields[3]).toStrictEqual({
        name: `My birthday card`,
        value: `dummy-release-notes\n\nCheckout all my [birthday cards](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md).`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a status field`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields[4]).toStrictEqual({
        inline: true,
        name: `My location`,
        value: `Running in development`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with an emotional state field`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.fields[5]).toStrictEqual({
        inline: true,
        name: `My emotional state`,
        value: `Agitated`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `8 versions`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        imageUrl = null;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, (): void => {
        expect.assertions(1);

        const result: unknown = service.handleResponse(anyDiscordMessage);

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: undefined,
          text: `8 versions`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        imageUrl = `image-url`;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, (): void => {
        expect.assertions(1);

        const result: unknown = service.handleResponse(anyDiscordMessage);

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `8 versions`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, (): void => {
      expect.assertions(2);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(moment(result.options.embed.timestamp).isValid()).toStrictEqual(
        true
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(moment(result.options.embed.timestamp).fromNow()).toStrictEqual(
        `a few seconds ago`
      );
    });

    it(`should return a Discord message response embed with a title`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.embed.title).toStrictEqual(
        `dummy-full-name version`
      );
    });

    it(`should return a Discord message response splitted`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
