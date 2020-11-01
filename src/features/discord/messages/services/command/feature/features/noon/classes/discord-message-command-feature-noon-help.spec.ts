import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
} from "discord.js";
import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ColorEnum } from "../../../../../../../../../enums/color.enum";
import { IconEnum } from "../../../../../../../../../enums/icon.enum";
import { ILoggerLog } from "../../../../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { DiscordSoniaService } from "../../../../../../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../../../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../../../../config/discord-message-config.service";
import { DiscordMessageHelpService } from "../../../../../discord-message-help.service";
import { DiscordMessageCommandFeatureNoonHelp } from "./discord-message-command-feature-noon-help";

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonHelp`, (): void => {
  let service: DiscordMessageCommandFeatureNoonHelp;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageHelpService: DiscordMessageHelpService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageHelpService = DiscordMessageHelpService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonHelp();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
    });

    it(`should log about executing the help action`, async (): Promise<
      void
    > => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(
        new Error(`getMessageResponse error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureNoonHelp`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-help action`,
      } as ILoggerLog);
    });

    it(`should get the message response for the noon help flag`, async (): Promise<
      void
    > => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(
        new Error(`getMessageResponse error`)
      );

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response for the noon help flag failed to be fetched`, (): void => {
      beforeEach((): void => {
        getMessageResponseSpy.mockRejectedValue(
          new Error(`getMessageResponse error`)
        );
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(
          new Error(`getMessageResponse error`)
        );
      });
    });

    describe(`when the message response for the noon help flag was successfully fetched`, (): void => {
      beforeEach((): void => {
        getMessageResponseSpy.mockResolvedValue(discordMessageResponse);
      });

      it(`should return the message response`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.execute(anyDiscordMessage);

        expect(result).toStrictEqual(discordMessageResponse);
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let discordMessageHelpServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonHelp();

      discordMessageHelpServiceGetMessageResponseSpy = jest.spyOn(
        discordMessageHelpService,
        `getMessageResponse`
      );
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandHelpImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandHelpImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(
        discordSoniaService,
        `getImageUrl`
      );
      discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandHelpImageUrl`
      );
    });

    it(`should get the message response for the help`, async (): Promise<
      void
    > => {
      expect.assertions(3);
      discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(
        new Error(`getMessageResponse help error`)
      );

      await expect(service.getMessageResponse()).rejects.toThrow(
        new Error(`getMessageResponse help error`)
      );

      expect(
        discordMessageHelpServiceGetMessageResponseSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        discordMessageHelpServiceGetMessageResponseSpy
      ).toHaveBeenCalledWith();
    });

    describe(`when the message response for the help failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(
          new Error(`getMessageResponse help error`)
        );
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse()).rejects.toThrow(
          new Error(`getMessageResponse help error`)
        );
      });
    });

    describe(`when the message response for the help command was successfully fetched`, (): void => {
      it(`should return a Discord message response embed with an author`, async (): Promise<
        void
      > => {
        expect.assertions(1);
        const messageEmbedAuthor: MessageEmbedAuthor = createMock<
          MessageEmbedAuthor
        >();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(
          messageEmbedAuthor
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<
        void
      > => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(
          ColorEnum.CANDY
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a description`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.description).toStrictEqual(
          `Below is the complete list of all flags available for the \`noon\` feature. You can even combine them!`
        );
      });

      it(`should return a Discord message response embed with 8 fields`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields).toHaveLength(8);
      });

      it(`should return a Discord message response embed with a cookie field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          name: `Cookie (*cookie*, *cookies* or *c*)`,
          value: `Because I am good, life gave me cookies. Now it is my turn to give you some.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with an error field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[1]).toStrictEqual({
          name: `Error (*error* or *bug*)`,
          value: `Create a bug in my core system. Do not do this one, of course!`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a feature field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[2]).toStrictEqual({
          name: `Feature (*feature* or *f*)`,
          value: `Change my behavior on this guild or on this channel. Help me to be better!`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a help field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[3]).toStrictEqual({
          name: `Help (*help* or *h*)`,
          value: `Ask for my help, it is obvious! And maybe I will, who knows?`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a lunch field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[4]).toStrictEqual({
          name: `Lunch (*lunch* or *l*)`,
          value: `There is a time to eat.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a release notes field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[5]).toStrictEqual({
          name: `Release notes (*release-notes* or *r*)`,
          value: `Display the last version release notes.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a version field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[6]).toStrictEqual({
          name: `Version (*version* or *v*)`,
          value: `Display my current application version.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a more help field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.fields?.[7]).toStrictEqual({
          name: `Further help`,
          value: `You can also checkout the [readme](https://github.com/Sonia-corporation/sonia-discord/blob/master/README.md).
      It contains more information about how I work.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<
        void
      > => {
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

        it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<
          void
        > => {
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

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.getMessageResponse();

          expect(result.options.embed?.footer).toStrictEqual({
            iconURL: `image-url`,
            text: `At your service`,
          } as MessageEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<
        void
      > => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy.mockReturnValue(
          IconEnum.ARTIFICIAL_INTELLIGENCE
        );

        const result = await service.getMessageResponse();

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as MessageEmbedThumbnail);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        const result = await service.getMessageResponse();

        expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(
          true
        );

        expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(
          `a few seconds ago`
        );
      });

      it(`should return a Discord message response embed with a title`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embed?.title).toStrictEqual(
          `So, you need my help with the \`noon\` feature? Cool.`
        );
      });

      it(`should return a Discord message response not split`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.split).toStrictEqual(false);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.response).toStrictEqual(``);
      });
    });
  });
});
