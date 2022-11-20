import { DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService } from './discord-message-command-verify-channel-right-warning-unsupported-channel-type.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail, Snowflake } from 'discord.js';
import moment, { MomentInput } from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);
jest.mock(`../../../logger/services/discord-logger-error.service`);

describe(`DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService`, (): void => {
  let service: DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let loggerService: LoggerService;
  let discordGuildSoniaService: DiscordGuildSoniaService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelType service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService)
      );
    });

    it(`should return the created DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelType service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService.getInstance();

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

    it(`should notify the DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelType service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERIFY_CHANNEL_RIGHT_WARNING_UNSUPPORTED_CHANNEL_TYPE_SERVICE
      );
    });
  });

  describe(`warn()`, (): void => {
    let messageId: Snowflake;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy: jest.SpyInstance;
    let loggerServiceWarningSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService();
      messageId = `dummy-message-id`;

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandErrorImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandErrorImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandErrorImageUrl`
      );
      loggerServiceWarningSpy = jest.spyOn(loggerService, `warning`).mockImplementation();
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
    });

    it(`should log a warning about coming across an unsupported channel type`, (): void => {
      expect.assertions(2);

      service.warn(messageId);

      const loggerLog: ILoggerLog = {
        context: `DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService`,
        hasExtendedContext: true,
        message: `context-[dummy-message-id] text-unsupported channel type!`,
      };
      expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceWarningSpy).toHaveBeenCalledWith(loggerLog);
    });

    it(`should send a warning message on the Sonia warnings channel`, (): void => {
      expect.assertions(2);

      service.warn(messageId);

      expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].channelName).toBe(`warnings`);
    });

    it(`should send a warning message on the Sonia warnings channel with an author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      service.warn(messageId);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.author
      ).toStrictEqual(messageEmbedAuthor);
    });

    it(`should send a warning message on the Sonia warnings channel with a color`, (): void => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      service.warn(messageId);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.color
      ).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should send a warning message on the Sonia warnings channel with 1 field1`, (): void => {
      expect.assertions(1);

      service.warn(messageId);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.fields
      ).toHaveLength(1);
    });

    it(`should send a warning message on the Sonia warnings channel with a report field`, (): void => {
      expect.assertions(1);

      service.warn(messageId);

      const embedFieldDate: EmbedFieldData = {
        name: `Help me to get better!`,
        value: `If you think that using this command on this type of channel should be supported, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
      };
      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]
          ?.fields?.[0]
      ).toStrictEqual(embedFieldDate);
    });

    it(`should send a warning message on the Sonia warnings channel with a footer containing an icon and a text`, (): void => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      service.warn(messageId);

      const messageEmbedFooter: MessageEmbedFooter = {
        iconURL: `dummy-image-url`,
        text: `Discord unsupported command channel type`,
      };
      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.footer
      ).toStrictEqual(messageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
      });

      it(`should send a warning message on the Sonia warnings channel with a footer but without an icon`, (): void => {
        expect.assertions(1);

        service.warn(messageId);

        const messageEmbedFooter: MessageEmbedFooter = {
          iconURL: undefined,
          text: `Discord unsupported command channel type`,
        };
        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.footer
        ).toStrictEqual(messageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
      });

      it(`should send a warning message on the Sonia warnings channel with a footer containing an icon and a text`, (): void => {
        expect.assertions(1);

        service.warn(messageId);

        const messageEmbedFooter: MessageEmbedFooter = {
          iconURL: `image-url`,
          text: `Discord unsupported command channel type`,
        };
        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.footer
        ).toStrictEqual(messageEmbedFooter);
      });
    });

    it(`should send a warning message on the Sonia warnings channel with a thumbnail`, (): void => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy.mockReturnValue(IconEnum.WARNING_SHIELD);

      service.warn(messageId);

      const messageEmbedThumbnail: MessageEmbedThumbnail = {
        url: IconEnum.WARNING_SHIELD,
      };
      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.thumbnail
      ).toStrictEqual(messageEmbedThumbnail);
    });

    it(`should send a warning message on the Sonia warnings channel with a timestamp`, (): void => {
      expect.assertions(2);

      service.warn(messageId);

      expect(
        moment(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]
            ?.timestamp as MomentInput
        ).isValid()
      ).toBe(true);
      expect(
        moment(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]
            ?.timestamp as MomentInput
        ).fromNow()
      ).toBe(`a few seconds ago`);
    });

    it(`should send a warning message on the Sonia warnings channel with a title`, (): void => {
      expect.assertions(1);

      service.warn(messageId);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]?.title
      ).toBe(`Warning!`);
    });

    it(`should send a warning message on the Sonia warnings channel with a description`, (): void => {
      expect.assertions(1);

      service.warn(messageId);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds?.[0]
          ?.description
      ).toBe(
        `Your command cannot be processed in this type of channel! I am yet not able to process the commands on such channels!`
      );
    });

    it(`should return a Discord message response without a response text`, (): void => {
      expect.assertions(1);

      service.warn(messageId);

      expect(discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.content).toBeUndefined();
    });
  });
});
