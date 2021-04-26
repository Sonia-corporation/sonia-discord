import { FirebaseGuildsNewVersionCountHumanizedService } from './firebase-guilds-new-version-count-humanized.service';
import { FirebaseGuildsNewVersionCountMessageResponseService } from './firebase-guilds-new-version-count-message-response.service';
import { ColorEnum } from '../../../../enums/color.enum';
import { IconEnum } from '../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from '../../../discord/messages/services/command/feature/features/release-notes/services/config/discord-message-command-feature-release-notes-config.service';
import { DiscordSoniaService } from '../../../discord/users/services/discord-sonia.service';
import { MessageEmbedAuthor } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsNewVersionCountMessageResponseService`, (): void => {
  let service: FirebaseGuildsNewVersionCountMessageResponseService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageCommandFeatureReleaseNotesConfigService: DiscordMessageCommandFeatureReleaseNotesConfigService;
  let firebaseGuildsNewVersionCountHumanizedService: FirebaseGuildsNewVersionCountHumanizedService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageCommandFeatureReleaseNotesConfigService = DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();
    firebaseGuildsNewVersionCountHumanizedService = FirebaseGuildsNewVersionCountHumanizedService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsNewVersionCountMessageResponseService service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsNewVersionCountMessageResponseService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsNewVersionCountMessageResponseService));
    });

    it(`should return the created FirebaseGuildsNewVersionCountMessageResponseService service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsNewVersionCountMessageResponseService.getInstance();

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

    it(`should notify the FirebaseGuildsNewVersionCountMessageResponseService service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsNewVersionCountMessageResponseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_MESSAGE_RESPONSE_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let totalGuildCount: number;
    let guildCount: number;
    let channelCount: number;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageUrlSpy: jest.SpyInstance;
    let firebaseGuildsNewVersionCountHumanizedServiceGetHumanizedCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      totalGuildCount = 8;
      guildCount = 4;
      channelCount = 122;

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
      firebaseGuildsNewVersionCountHumanizedServiceGetHumanizedCountSpy = jest
        .spyOn(firebaseGuildsNewVersionCountHumanizedService, `getHumanizedCount`)
        .mockImplementation();
    });

    it(`should return a message response with an embed author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a message response with an embed color using the release notes feature color`, (): void => {
      expect.assertions(1);
      const color: ColorEnum = ColorEnum.CANDY;
      discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageColorSpy.mockReturnValue(color);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when the Discord Sonia image url is null`, (): void => {
      let imageUrl: null;

      beforeEach((): void => {
        imageUrl = null;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a message response with an embed footer without an icon`, (): void => {
        expect.assertions(1);

        const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

        expect(result.options.embed?.footer?.iconURL).toBeUndefined();
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

        const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

        expect(result.options.embed?.footer?.iconURL).toStrictEqual(`dummy-image-url`);
      });
    });

    it(`should return a message response with an embed footer with a text`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.footer?.text).toStrictEqual(`Sonia reporter out`);
    });

    it(`should return a message response with an embed thumbnail icon`, (): void => {
      expect.assertions(1);
      const icon: IconEnum = IconEnum.ALARM;
      discordMessageCommandFeatureReleaseNotesConfigServiceGetReleaseNotesConfigImageUrlSpy.mockReturnValue(icon);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.thumbnail?.url).toStrictEqual(IconEnum.ALARM);
    });

    it(`should return a message response with an embed timestamp set as now`, (): void => {
      expect.assertions(2);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);
      expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
    });

    it(`should return a message response with an embed title`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.title).toStrictEqual(`Release notes report`);
    });

    it(`should return a message response with an embed description`, (): void => {
      expect.assertions(1);
      firebaseGuildsNewVersionCountHumanizedServiceGetHumanizedCountSpy.mockReturnValue(`dummy-description`);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.description).toStrictEqual(`dummy-description`);
    });

    it(`should return an unify error message response`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return an error message response with an empty response`, (): void => {
      expect.assertions(1);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.response).toStrictEqual(``);
    });
  });
});
