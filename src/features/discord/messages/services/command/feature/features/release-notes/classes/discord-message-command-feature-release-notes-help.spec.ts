import { DiscordMessageCommandFeatureReleaseNotesHelp } from './discord-message-command-feature-release-notes-help';
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
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS } from '../constants/discord-message-command-feature-release-notes-flags';
import { DiscordMessageCommandFeatureReleaseNotesFlagEnum } from '../enums/discord-message-command-feature-release-notes-flag.enum';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureReleaseNotesHelp`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesHelp<DiscordMessageCommandFeatureReleaseNotesFlagEnum>;
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
    let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureReleaseNotesFlagEnum>;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHelp();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      value = undefined;
      discordCommandFlags = DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS;
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();

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
        context: `DiscordMessageCommandFeatureReleaseNotesHelp`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-help action`,
      } as ILoggerLog);
    });

    it(`should get the message response for the release notes help flag`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value, discordCommandFlags)).rejects.toThrow(
        new Error(`getMessageResponse error`)
      );

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage, discordCommandFlags);
    });

    describe(`when the message response for the release notes help flag failed to be fetched`, (): void => {
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

    describe(`when the message response for the release notes help flag was successfully fetched`, (): void => {
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
    let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureReleaseNotesFlagEnum>;

    let discordMessageHelpServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHelp();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      discordCommandFlags = DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS;

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
        const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with a description`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.description).toStrictEqual(
          `Below is the complete list of all flags available for the release notes feature. You can even combine them!`
        );
      });

      it(`should return a Discord message response embed with 6 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields).toHaveLength(6);
      });

      it(`should return a Discord message response embed with a disabled flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          name: `--disabled (or -d)`,
          value: `Disable the release notes message on this channel.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with an enabled flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[1]).toStrictEqual({
          name: `--enabled (or -e)`,
          value: `Enable the release notes message on this channel. The message will be sent each time a new release is published.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with an help flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[2]).toStrictEqual({
          name: `--help (or -h)`,
          value: `Get some help with the release notes command. Display all the flags with an example.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a humanize flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[3]).toStrictEqual({
          name: `--humanize (or -hu)`,
          value: `Display the current release notes configuration for this channel.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a status flag field documentation`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[4]).toStrictEqual({
          name: `--status (or -s)`,
          value: `Display either or not the feature is enabled.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a field to show an example of the command with a random valid flag`, async (): Promise<void> => {
        expect.assertions(1);
        anyDiscordMessage.content = `dummy message !feature release-notes`;

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[5]).toBeOneOf([
          {
            name: `Example`,
            value: `\`!feature release-notes --disabled=true\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes --disabled=false\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes -d\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes --enabled=true\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes --enabled=false\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes -e\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes --help\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes -h\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes --humanize\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes -hu\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes --status\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!feature release-notes -s\``,
          } as EmbedFieldData,
        ]);
      });

      it(`should return a Discord message response embed with a field to show an example of shortcut the command with a random valid flag`, async (): Promise<void> => {
        expect.assertions(1);
        anyDiscordMessage.content = `dummy message !f r`;

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.fields?.[5]).toBeOneOf([
          {
            name: `Example`,
            value: `\`!f r --disabled=true\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r --disabled=false\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r -d\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r --enabled=true\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r --enabled=false\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r -e\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r --help\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r -h\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r --humanize\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r -hu\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r --status\``,
          } as EmbedFieldData,
          {
            name: `Example`,
            value: `\`!f r -s\``,
          } as EmbedFieldData,
        ]);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

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

          const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

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

          const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

          expect(result.options.embed?.footer).toStrictEqual({
            iconURL: `image-url`,
            text: `At your service`,
          } as MessageEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as MessageEmbedThumbnail);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);

        expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
      });

      it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.embed?.title).toStrictEqual(`So, you need my help with the release notes feature? Cool.`);
      });

      it(`should return a Discord message response not split`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.options.split).toStrictEqual(false);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(anyDiscordMessage, discordCommandFlags);

        expect(result.response).toStrictEqual(``);
      });
    });
  });
});
