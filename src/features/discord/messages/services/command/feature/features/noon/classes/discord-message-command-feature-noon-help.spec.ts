import { DiscordMessageCommandFeatureNoonHelp } from './discord-message-command-feature-noon-help';
import { ColorEnum } from '../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../enums/icon.enum';
import { ILoggerLog } from '../../../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordSoniaService } from '../../../../../../../users/services/discord-sonia.service';
import { DiscordCommandFlags } from '../../../../../../classes/commands/flags/discord-command-flags';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../../../config/discord-message-config.service';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from '../constants/discord-message-command-feature-noon-flags';
import { DiscordMessageCommandFeatureNoonFlagEnum } from '../enums/discord-message-command-feature-noon-flag.enum';
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import moment from 'moment-timezone';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonHelp`, (): void => {
  let service: DiscordMessageCommandFeatureNoonHelp<DiscordMessageCommandFeatureNoonFlagEnum>;
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
    let value: string | null | undefined;
    let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum>;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonHelp();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      value = undefined;
      discordCommandFlags = DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS;
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
    });

    it(`should log about executing the help action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value, discordCommandFlags)).rejects.toThrow(
        new Error(`getMessageResponse error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureNoonHelp`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-help action`,
      } as ILoggerLog);
    });

    it(`should get the message response for the noon help flag`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value, discordCommandFlags)).rejects.toThrow(
        new Error(`getMessageResponse error`)
      );

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage, discordCommandFlags);
    });

    describe(`when the message response for the noon help flag failed to be fetched`, (): void => {
      beforeEach((): void => {
        getMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.execute(anyDiscordMessage, value, discordCommandFlags)).rejects.toThrow(
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

        const result = await service.execute(anyDiscordMessage, value, discordCommandFlags);

        expect(result).toStrictEqual(discordMessageResponse);
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum>;

    let discordMessageHelpServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonHelp();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      discordCommandFlags = DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS;

      discordMessageHelpServiceGetMessageResponseSpy = jest.spyOn(discordMessageHelpService, `getMessageResponse`);
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
    });

    it(`should get the message response for the help`, async (): Promise<void> => {
      expect.assertions(3);
      discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));

      await expect(service.getMessageResponse(anyDiscordMessage, discordCommandFlags)).rejects.toThrow(
        new Error(`getMessageResponse help error`)
      );

      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response for the help failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse(anyDiscordMessage, discordCommandFlags)).rejects.toThrow(
          new Error(`getMessageResponse help error`)
        );
      });
    });

    describe(`when the message response for the help command was successfully fetched`, (): void => {
      it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
        expect.assertions(1);
        const messageEmbedAuthor: APIEmbedAuthor = createMock<APIEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a description`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.description).toBe(
          `Below is the complete list of all flags available for the noon feature. You can even combine them!`
        );
      });

      it(`should return a Discord message response embed with 6 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields).toHaveLength(6);
      });

      it(`should return a Discord message response embed with a disabled flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[0]).toStrictEqual({
          inline: false,
          name: `--disabled (or -d)`,
          value: `Disable the noon message on this channel.`,
        } as APIEmbedField);
      });

      it(`should return a Discord message response embed with an enabled flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[1]).toStrictEqual({
          inline: false,
          name: `--enabled (or -e)`,
          value: `Enable the noon message on this channel. The message will be sent on the Europe/Paris timezone.`,
        } as APIEmbedField);
      });

      it(`should return a Discord message response embed with an help flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[2]).toStrictEqual({
          inline: false,
          name: `--help (or -h)`,
          value: `Get some help with the noon command. Display all the flags with an example.`,
        } as APIEmbedField);
      });

      it(`should return a Discord message response embed with a humanize flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[3]).toStrictEqual({
          inline: false,
          name: `--humanize (or -hu)`,
          value: `Display the current noon configuration for this channel.`,
        } as APIEmbedField);
      });

      it(`should return a Discord message response embed with a status flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[4]).toStrictEqual({
          inline: false,
          name: `--status (or -s)`,
          value: `Display either or not the feature is enabled.`,
        } as APIEmbedField);
      });

      it(`should return a Discord message response embed with a field to show an example of the command with a random valid flag`, async (): Promise<void> => {
        expect.assertions(1);
        anyDiscordMessage.content = `dummy message !feature noon`;

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[5]).toBeOneOf([
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --disabled=true\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --disabled=false\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon -d\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --enabled=true\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --enabled=false\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon -e\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --help\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon -h\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --humanize\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon -hu\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon --status\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!feature noon -s\``,
          } as APIEmbedField,
        ]);
      });

      it(`should return a Discord message response embed with a field to show an example of shortcut the command with a random valid flag`, async (): Promise<void> => {
        expect.assertions(1);
        anyDiscordMessage.content = `dummy message !f n`;

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.fields?.[5]).toBeOneOf([
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --disabled=true\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --disabled=false\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n -d\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --enabled=true\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --enabled=false\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n -e\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --help\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n -h\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --humanize\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n -hu\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n --status\``,
          } as APIEmbedField,
          {
            inline: false,
            name: `Example`,
            value: `\`!f n -s\``,
          } as APIEmbedField,
        ]);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.footer).toStrictEqual({
          icon_url: `dummy-image-url`,
          text: `At your service`,
        } as APIEmbedFooter);
      });

      describe(`when the Sonia image url is null`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        });

        it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

          const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
          expect(embed?.footer).toStrictEqual({
            icon_url: undefined,
            text: `At your service`,
          } as APIEmbedFooter);
        });
      });

      describe(`when the Sonia image url is "image-url"`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        });

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

          const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
          expect(embed?.footer).toStrictEqual({
            icon_url: `image-url`,
            text: `At your service`,
          } as APIEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as APIEmbedImage);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(moment(embed?.timestamp).isValid()).toBe(true);
        expect(moment(embed?.timestamp).fromNow()).toBe(`a few seconds ago`);
      });

      it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.title).toBe(`So, you need my help with the noon feature? Cool.`);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.content).toBeUndefined();
      });
    });
  });
});
