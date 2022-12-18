import { FirebaseDmsNewVersionCountHumanizedService } from './firebase-dms-new-version-count-humanized.service';
import { FirebaseDmsNewVersionCountMessageResponseService } from './firebase-dms-new-version-count-message-response.service';
import { ColorEnum } from '../../../../enums/color.enum';
import { IconEnum } from '../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from '../../../discord/messages/services/command/feature/features/release-notes/services/config/discord-message-command-feature-release-notes-config.service';
import { DiscordSoniaService } from '../../../discord/users/services/discord-sonia.service';
import { APIEmbed, APIEmbedAuthor } from 'discord.js';
import moment from 'moment-timezone';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsNewVersionCountMessageResponseService`, (): void => {
  let service: FirebaseDmsNewVersionCountMessageResponseService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageCommandFeatureReleaseNotesConfigService: DiscordMessageCommandFeatureReleaseNotesConfigService;
  let firebaseDmsNewVersionCountHumanizedService: FirebaseDmsNewVersionCountHumanizedService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageCommandFeatureReleaseNotesConfigService =
      DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();
    firebaseDmsNewVersionCountHumanizedService = FirebaseDmsNewVersionCountHumanizedService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsNewVersionCountMessageResponseService service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsNewVersionCountMessageResponseService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsNewVersionCountMessageResponseService));
    });

    it(`should return the created FirebaseDmsNewVersionCountMessageResponseService service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsNewVersionCountMessageResponseService.getInstance();

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

    it(`should notify the FirebaseDmsNewVersionCountMessageResponseService service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsNewVersionCountMessageResponseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_COUNT_MESSAGE_RESPONSE_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let totalDmCount: number;
    let dmCount: number;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageUrlSpy: jest.SpyInstance;
    let firebaseDmsNewVersionCountHumanizedServiceGetHumanizedCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      totalDmCount = 8;
      dmCount = 4;

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest
        .spyOn(discordSoniaService, `getCorporationMessageEmbedAuthor`)
        .mockImplementation();
      discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageColorSpy = jest
        .spyOn(discordMessageCommandFeatureReleaseNotesConfigService, `getReleaseNotesConfigImageColor`)
        .mockImplementation();
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`).mockImplementation();
      discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageUrlSpy = jest
        .spyOn(discordMessageCommandFeatureReleaseNotesConfigService, `getReleaseNotesConfigImageUrl`)
        .mockImplementation();
      firebaseDmsNewVersionCountHumanizedServiceGetHumanizedCountSpy = jest
        .spyOn(firebaseDmsNewVersionCountHumanizedService, `getHumanizedCount`)
        .mockImplementation();
    });

    it(`should return a message response with an embed author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: APIEmbedAuthor = createMock<APIEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a message response with an embed color using the release notes feature color`, (): void => {
      expect.assertions(1);
      const color: ColorEnum = ColorEnum.CANDY;
      discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageColorSpy.mockReturnValue(color);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when the Discord Sonia image url is null`, (): void => {
      let imageUrl: null;

      beforeEach((): void => {
        imageUrl = null;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a message response with an embed footer without an icon`, (): void => {
        expect.assertions(1);

        const result = service.getMessageResponse(totalDmCount, dmCount);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.footer?.icon_url).toBeUndefined();
      });
    });

    describe(`when the Discord Sonia image url is an icon url`, (): void => {
      let imageUrl: string;

      beforeEach((): void => {
        imageUrl = `dummy-image-url`;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a message response with an embed footer with a Sonia icon`, (): void => {
        expect.assertions(1);

        const result = service.getMessageResponse(totalDmCount, dmCount);

        const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
        expect(embed?.footer?.icon_url).toBe(`dummy-image-url`);
      });
    });

    it(`should return a message response with an embed footer with a text`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.footer?.text).toBe(`Sonia reporter out`);
    });

    it(`should return a message response with an embed thumbnail icon`, (): void => {
      expect.assertions(1);
      const icon: IconEnum = IconEnum.ALARM;
      discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageUrlSpy.mockReturnValue(icon);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.thumbnail?.url).toStrictEqual(IconEnum.ALARM);
    });

    it(`should return a message response with an embed timestamp set as now`, (): void => {
      expect.assertions(2);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(moment(embed?.timestamp).isValid()).toBe(true);
      expect(moment(embed?.timestamp).fromNow()).toBe(`a few seconds ago`);
    });

    it(`should return a message response with an embed title`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.title).toBe(`Release notes report`);
    });

    it(`should return a message response with an embed description`, (): void => {
      expect.assertions(1);
      firebaseDmsNewVersionCountHumanizedServiceGetHumanizedCountSpy.mockReturnValue(`dummy-description`);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      const embed: APIEmbed = result.options.embeds?.[0] as APIEmbed;
      expect(embed?.description).toBe(`dummy-description`);
    });

    it(`should return an error message response with an empty response`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalDmCount, dmCount);

      expect(result.content).toBeUndefined();
    });
  });
});
