import { DiscordMessageScheduleNoonCountHumanizedService } from './discord-message-schedule-noon-count-humanized.service';
import { DiscordMessageScheduleNoonCountMessageResponseService } from './discord-message-schedule-noon-count-message-response.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { DiscordMessageCommandFeatureNoonConfigService } from '../command/feature/features/noon/services/config/discord-message-command-feature-noon-config.service';
import { MessageEmbedAuthor } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageScheduleNoonCountMessageResponseService`, (): void => {
  let service: DiscordMessageScheduleNoonCountMessageResponseService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageCommandFeatureNoonConfigService: DiscordMessageCommandFeatureNoonConfigService;
  let discordMessageScheduleNoonCountHumanizedService: DiscordMessageScheduleNoonCountHumanizedService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageCommandFeatureNoonConfigService = DiscordMessageCommandFeatureNoonConfigService.getInstance();
    discordMessageScheduleNoonCountHumanizedService = DiscordMessageScheduleNoonCountHumanizedService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageScheduleNoonCountMessageResponse service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageScheduleNoonCountMessageResponseService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageScheduleNoonCountMessageResponseService));
    });

    it(`should return the created DiscordMessageScheduleNoonCountMessageResponse service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageScheduleNoonCountMessageResponseService.getInstance();

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

    it(`should notify the DiscordMessageScheduleNoonCountMessageResponse service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageScheduleNoonCountMessageResponseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_MESSAGE_RESPONSE_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let totalGuildCount: number;
    let guildCount: number;
    let channelCount: number;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageUrlSpy: jest.SpyInstance;
    let discordMessageScheduleNoonCountHumanizedServiceGetHumanizedCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      totalGuildCount = 8;
      guildCount = 4;
      channelCount = 122;

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest
        .spyOn(discordSoniaService, `getCorporationMessageEmbedAuthor`)
        .mockImplementation();
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageColorSpy = jest
        .spyOn(discordMessageCommandFeatureNoonConfigService, `getNoonConfigImageColor`)
        .mockImplementation();
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`).mockImplementation();
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageUrlSpy = jest
        .spyOn(discordMessageCommandFeatureNoonConfigService, `getNoonConfigImageUrl`)
        .mockImplementation();
      discordMessageScheduleNoonCountHumanizedServiceGetHumanizedCountSpy = jest
        .spyOn(discordMessageScheduleNoonCountHumanizedService, `getHumanizedCount`)
        .mockImplementation();
    });

    it(`should return a message response with an embed author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = service.getMessageResponse(totalGuildCount, guildCount, channelCount);

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a message response with an embed color using the noon feature color`, (): void => {
      expect.assertions(1);
      const color: ColorEnum = ColorEnum.CANDY;
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageColorSpy.mockReturnValue(color);

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
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageUrlSpy.mockReturnValue(icon);

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

      expect(result.options.embed?.title).toStrictEqual(`Noon report`);
    });

    it(`should return a message response with an embed description`, (): void => {
      expect.assertions(1);
      discordMessageScheduleNoonCountHumanizedServiceGetHumanizedCountSpy.mockReturnValue(`dummy-description`);

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
