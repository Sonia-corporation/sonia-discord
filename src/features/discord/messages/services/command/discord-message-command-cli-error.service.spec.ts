import { DiscordMessageCommandCliErrorService } from './discord-message-command-cli-error.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import moment from 'moment-timezone';
import { createMock } from 'ts-auto-mock';

describe(`DiscordMessageCommandCliErrorService`, (): void => {
  let service: DiscordMessageCommandCliErrorService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandCliError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandCliErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandCliErrorService));
    });

    it(`should return the created DiscordMessageCommandCliError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandCliErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandCliError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandCliErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_CLI_ERROR_SERVICE
      );
    });
  });

  describe(`getCliErrorMessageResponse()`, (): void => {
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandCliErrorService();

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCliErrorImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCliErrorImageUrl`
      );
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: APIEmbedAuthor = createMock<APIEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getCliErrorMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getCliErrorMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getCliErrorMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.footer).toStrictEqual({
        icon_url: `dummy-image-url`,
        text: `Retry with the right argument`,
      } as APIEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getCliErrorMessageResponse();

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.footer).toStrictEqual({
          icon_url: undefined,
          text: `Retry with the right argument`,
        } as APIEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getCliErrorMessageResponse();

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.footer).toStrictEqual({
          icon_url: `image-url`,
          text: `Retry with the right argument`,
        } as APIEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

      const result = await service.getCliErrorMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as APIEmbedImage);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getCliErrorMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(moment(embed?.timestamp).isValid()).toBe(true);
      expect(moment(embed?.timestamp).fromNow()).toBe(`a few seconds ago`);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getCliErrorMessageResponse();

      expect(result.content).toBeUndefined();
    });
  });
});
