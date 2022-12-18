import { DiscordMessageHelpService } from './discord-message-help.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import moment from 'moment-timezone';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageHelpService`, (): void => {
  let service: DiscordMessageHelpService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageHelp service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageHelpService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageHelpService));
    });

    it(`should return the created DiscordMessageHelp service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageHelpService.getInstance();

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

    it(`should notify the DiscordMessageHelp service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageHelpService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_HELP_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageHelpService();

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

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: APIEmbedAuthor = createMock<APIEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed without a description`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.description).toBeUndefined();
    });

    it(`should return a Discord message response embed without fields`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.fields).toBeUndefined();
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse();

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

        const result = await service.getMessageResponse();

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

        const result = await service.getMessageResponse();

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

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as APIEmbedImage);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(moment(embed?.timestamp).isValid()).toBe(true);
      expect(moment(embed?.timestamp).fromNow()).toBe(`a few seconds ago`);
    });

    it(`should return a Discord message response embed without a title`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.title).toBeUndefined();
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.content).toBeUndefined();
    });
  });
});
