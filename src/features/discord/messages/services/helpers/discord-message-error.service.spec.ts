import { DiscordMessageErrorService } from './discord-message-error.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { ILoggerLog } from '../../../../logger/interfaces/logger-log';
import { LoggerConfigService } from '../../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../channels/services/discord-channel.service';
import { DiscordGuildSoniaChannelNameEnum } from '../../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildConfigService } from '../../../guilds/services/config/discord-guild-config.service';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { EmbedFieldData, Message, MessageEmbedAuthor, MessageEmbedThumbnail } from 'discord.js';
import faker from 'faker';
import moment, { MomentInput } from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageErrorService`, (): void => {
  let service: DiscordMessageErrorService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let loggerConfigService: LoggerConfigService;
  let discordChannelService: DiscordChannelService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let githubConfigService: GithubConfigService;
  let discordGuildConfigService: DiscordGuildConfigService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    loggerConfigService = LoggerConfigService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    githubConfigService = GithubConfigService.getInstance();
    discordGuildConfigService = DiscordGuildConfigService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageErrorService));
    });

    it(`should return the created DiscordMessageError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageErrorService.getInstance();

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

    it(`should notify the DiscordMessageError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_ERROR_SERVICE
      );
    });
  });

  describe(`handleError()`, (): void => {
    let error: unknown;
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerConfigServiceShouldDisplayMoreDebugLogsSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;
    let anyDiscordMessageChannelSendSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageErrorService();
      error = new Error(`dummy error`);
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        channel: {
          send(): Promise<Message<boolean>> {
            return Promise.resolve(createHydratedMock<Message<boolean>>());
          },
        },
        id: `dummy-id`,
      });

      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerConfigServiceShouldDisplayMoreDebugLogsSpy = jest
        .spyOn(loggerConfigService, `shouldDisplayMoreDebugLogs`)
        .mockReturnValue(false);
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
      anyDiscordMessageChannelSendSpy = jest
        .spyOn(anyDiscordMessage.channel, `send`)
        .mockRejectedValue(new Error(`send error`));
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      jest.spyOn(githubConfigService, `getBugReportUrl`).mockReturnValue(`dummy-bug-report-url`);
      jest
        .spyOn(discordGuildConfigService, `getSoniaPermanentGuildInviteUrl`)
        .mockReturnValue(`dummy-sonia-permanent-guild-invite-url`);
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest
        .spyOn(discordSoniaService, `getCorporationMessageEmbedAuthor`)
        .mockImplementation();
      discordMessageConfigServiceGetMessageCommandErrorImageColorSpy = jest
        .spyOn(discordMessageConfigService, `getMessageCommandErrorImageColor`)
        .mockImplementation();
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`).mockImplementation();
      discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy = jest
        .spyOn(discordMessageConfigService, `getMessageCommandErrorImageUrl`)
        .mockImplementation();
    });

    describe(`when the option to display more debug logs is enabled`, (): void => {
      beforeEach((): void => {
        loggerConfigServiceShouldDisplayMoreDebugLogsSpy.mockReturnValue(true);
      });

      describe(`when a custom log message is not provided`, (): void => {
        it(`should log about the message sending fail`, (): void => {
          expect.assertions(2);

          service.handleError(error, anyDiscordMessage);

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
            context: `DiscordMessageErrorService`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-message sending failed`,
          } as ILoggerLog);
        });
      });

      describe(`when a custom log message is provided`, (): void => {
        it(`should log the custom message`, (): void => {
          expect.assertions(2);

          service.handleError(error, anyDiscordMessage, `custom log message`);

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
            context: `DiscordMessageErrorService`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-custom log message`,
          } as ILoggerLog);
        });
      });
    });

    describe(`when the option to display more debug logs is disabled`, (): void => {
      beforeEach((): void => {
        loggerConfigServiceShouldDisplayMoreDebugLogsSpy.mockReturnValue(false);
      });

      it(`should not log about the message sending fail`, (): void => {
        expect.assertions(2);

        service.handleError(error, anyDiscordMessage);

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `DiscordMessageErrorService`,
          hasExtendedContext: true,
          message: `context-[dummy-id] text-message sending failed`,
        } as ILoggerLog);
      });
    });

    it(`should log the error`, (): void => {
      expect.assertions(2);

      service.handleError(error, anyDiscordMessage);

      expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
        context: `DiscordMessageErrorService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-Error: dummy error`,
      } as ILoggerLog);
    });

    describe(`when the message's channel is invalid`, (): void => {
      beforeEach((): void => {
        discordChannelServiceIsValidSpy.mockReturnValue(false);
      });

      it(`should not send a message to this channel`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the message's channel is valid`, (): void => {
      beforeEach((): void => {
        discordChannelServiceIsValidSpy.mockReturnValue(true);
      });

      it(`should send a message to this channel`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy).toHaveBeenCalledTimes(1);
      });

      it(`should send a message to this channel with an author`, (): void => {
        expect.assertions(1);
        const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should send a message to this channel with a color`, (): void => {
        expect.assertions(1);
        const color: ColorEnum = ColorEnum.CANDY;
        discordMessageConfigServiceGetMessageCommandErrorImageColorSpy.mockReturnValue(color);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].color).toStrictEqual(color);
      });

      describe(`when the Discord Sonia image url is null`, (): void => {
        let imageUrl: null;

        beforeEach((): void => {
          imageUrl = null;

          discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
        });

        it(`should send a message to this channel with a footer without an icon`, (): void => {
          expect.assertions(1);

          service.handleError(error, anyDiscordMessage);

          expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].footer.iconURL).toBeUndefined();
        });
      });

      describe(`when the Discord Sonia image url is an icon url`, (): void => {
        let imageUrl: string;

        beforeEach((): void => {
          imageUrl = `dummy-image-url`;

          discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
        });

        it(`should send a message to this channel with a footer with a Sonia icon`, (): void => {
          expect.assertions(1);

          service.handleError(error, anyDiscordMessage);

          expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].footer.iconURL).toBe(`dummy-image-url`);
        });
      });

      it(`should send a message to this channel with a footer with a text`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].footer.text).toBe(`I am very sorry for that`);
      });

      it(`should send a message to this channel with a thumbnail`, (): void => {
        expect.assertions(1);
        const icon: IconEnum = IconEnum.ERROR;
        discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy.mockReturnValue(icon);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].thumbnail).toStrictEqual({
          url: icon,
        } as MessageEmbedThumbnail);
      });

      it(`should send a message to this channel with 3 fields`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields).toHaveLength(3);
      });

      it(`should send a message to this channel with a message id field`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        const embedFieldData: EmbedFieldData = {
          name: `The message's id that killed me`,
          value: `dummy-id`,
        };
        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields[0]).toStrictEqual(embedFieldData);
      });

      it(`should send a message to this channel with a blood trace field`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        const embedFieldData: EmbedFieldData = {
          name: `My blood trace`,
          value: `Error: dummy error`,
        };
        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields[1]).toStrictEqual(embedFieldData);
      });

      describe(`when the given error is longer than 1024 characters`, (): void => {
        beforeEach((): void => {
          error = new Error(faker.datatype.string(1100));
        });

        it(`should send a message to this channel with a blood trace field with an ellipsis at 1024 characters`, (): void => {
          expect.assertions(3);

          service.handleError(error, anyDiscordMessage);

          expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields[1].name).toBe(`My blood trace`);
          expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields[1].value).toHaveLength(1024);
          expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields[1].value).toEndWith(`...`);
        });
      });

      it(`should send a message to this channel with a hint field`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        const embedFieldData: EmbedFieldData = {
          name: `Help me to help you`,
          value: `You can create a [bug report](dummy-bug-report-url) or reach my creators on [discord](dummy-sonia-permanent-guild-invite-url).`,
        };
        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].fields[2]).toStrictEqual(embedFieldData);
      });

      it(`should send a message to this channel with a timestamp set as now`, (): void => {
        expect.assertions(2);

        service.handleError(error, anyDiscordMessage);

        expect(
          moment(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].timestamp as MomentInput).isValid()
        ).toBe(true);
        expect(
          moment(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].timestamp as MomentInput).fromNow()
        ).toBe(`a few seconds ago`);
      });

      it(`should send a message to this channel with a title`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].embeds[0].title).toBe(`Oops, you have found a bug`);
      });

      it(`should send a message to this channel without a content`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(anyDiscordMessageChannelSendSpy.mock.calls[0][0].content).toBeUndefined();
      });
    });

    it(`should send a message to the Sonia error channel`, (): void => {
      expect.assertions(2);

      service.handleError(error, anyDiscordMessage);

      expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].channelName).toStrictEqual(
        DiscordGuildSoniaChannelNameEnum.ERRORS
      );
    });

    it(`should send a message to the Sonia error channel with an author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      service.handleError(error, anyDiscordMessage);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].author
      ).toStrictEqual(messageEmbedAuthor);
    });

    it(`should send a message to the Sonia error channel with a color`, (): void => {
      expect.assertions(1);
      const color: ColorEnum = ColorEnum.CANDY;
      discordMessageConfigServiceGetMessageCommandErrorImageColorSpy.mockReturnValue(color);

      service.handleError(error, anyDiscordMessage);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].color
      ).toStrictEqual(color);
    });

    describe(`when the Discord Sonia image url is null`, (): void => {
      let imageUrl: null;

      beforeEach((): void => {
        imageUrl = null;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should send a message to the Sonia error channel with a footer without an icon`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].footer
            .iconURL
        ).toBeUndefined();
      });
    });

    describe(`when the Discord Sonia image url is an icon url`, (): void => {
      let imageUrl: string;

      beforeEach((): void => {
        imageUrl = `dummy-image-url`;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should send a message to the Sonia error channel with a footer with a Sonia icon`, (): void => {
        expect.assertions(1);

        service.handleError(error, anyDiscordMessage);

        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].footer
            .iconURL
        ).toBe(`dummy-image-url`);
      });
    });

    it(`should send a message to the Sonia error channel with a footer with a text`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].footer.text
      ).toBe(`I am very sorry for that`);
    });

    it(`should send a message to the Sonia error channel with a thumbnail`, (): void => {
      expect.assertions(1);
      const icon: IconEnum = IconEnum.ERROR;
      discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy.mockReturnValue(icon);

      service.handleError(error, anyDiscordMessage);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].thumbnail
      ).toStrictEqual({ url: icon } as MessageEmbedThumbnail);
    });

    it(`should send a message to the Sonia error channel with 3 fields`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields
      ).toHaveLength(3);
    });

    it(`should send a message to the Sonia error channel with a message id field`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      const embedFieldData: EmbedFieldData = {
        name: `The message's id that killed me`,
        value: `dummy-id`,
      };
      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields[0]
      ).toStrictEqual(embedFieldData);
    });

    it(`should send a message to the Sonia error channel with a blood trace field`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      const embedFieldData: EmbedFieldData = {
        name: `My blood trace`,
        value: `Error: dummy error`,
      };
      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields[1]
      ).toStrictEqual(embedFieldData);
    });

    describe(`when the given error is longer than 1024 characters`, (): void => {
      beforeEach((): void => {
        error = new Error(faker.datatype.string(1100));
      });

      it(`should send a message to the Sonia error channel with a blood trace field with an ellipsis at 1024 characters`, (): void => {
        expect.assertions(3);

        service.handleError(error, anyDiscordMessage);

        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields[1]
            .name
        ).toBe(`My blood trace`);
        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields[1]
            .value
        ).toHaveLength(1024);
        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields[1]
            .value
        ).toEndWith(`...`);
      });
    });

    it(`should send a message to the Sonia error channel with a hint field`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      const embedFieldData: EmbedFieldData = {
        name: `Help me to help you`,
        value: `You can create a [bug report](dummy-bug-report-url) or reach my creators on [discord](dummy-sonia-permanent-guild-invite-url).`,
      };
      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].fields[2]
      ).toStrictEqual(embedFieldData);
    });

    it(`should send a message to the Sonia error channel with a timestamp set as now`, (): void => {
      expect.assertions(2);

      service.handleError(error, anyDiscordMessage);

      expect(
        moment(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0]
            .timestamp as MomentInput
        ).isValid()
      ).toBe(true);
      expect(
        moment(
          discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0]
            .timestamp as MomentInput
        ).fromNow()
      ).toBe(`a few seconds ago`);
    });

    it(`should send a message to the Sonia error channel with a title`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      expect(
        discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.options.embeds[0].title
      ).toBe(`Oops, you have found a bug`);
    });

    it(`should send a message to the Sonia error channel without a content`, (): void => {
      expect.assertions(1);

      service.handleError(error, anyDiscordMessage);

      expect(discordGuildSoniaServiceSendMessageToChannelSpy.mock.calls[0][0].messageResponse.content).toBeUndefined();
    });
  });
});
