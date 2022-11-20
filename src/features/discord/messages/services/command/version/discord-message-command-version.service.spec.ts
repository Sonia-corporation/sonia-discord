import { DiscordMessageCommandVersionService } from './discord-message-command-version.service';
import { ColorEnum } from '../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { AppProductionStateEnum } from '../../../../../app/enums/app-production-state.enum';
import { AppConfigQueryService } from '../../../../../app/services/config/app-config-query.service';
import { AppConfigService } from '../../../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordSoniaEmotionalStateEnum } from '../../../../emotional-states/enums/discord-sonia-emotional-state.enum';
import { DiscordSoniaEmotionalStateService } from '../../../../emotional-states/services/discord-sonia-emotional-state.service';
import { DiscordSoniaService } from '../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { DiscordMessageCommandVerifyChannelRightService } from '../discord-message-command-verify-channel-right.service';
import {
  DMChannel,
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
  NewsChannel,
  TextChannel,
  ThreadChannel,
} from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock, createMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandVersionService`, (): void => {
  let service: DiscordMessageCommandVersionService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordSoniaEmotionalStateService: DiscordSoniaEmotionalStateService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let appConfigQueryService: AppConfigQueryService;
  let appConfigService: AppConfigService;
  let discordMessageCommandVerifyChannelRightService: DiscordMessageCommandVerifyChannelRightService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordSoniaEmotionalStateService = DiscordSoniaEmotionalStateService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    appConfigQueryService = AppConfigQueryService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordMessageCommandVerifyChannelRightService = DiscordMessageCommandVerifyChannelRightService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVersionService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandVersionService));
    });

    it(`should return the created DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandVersionService.getInstance();

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

    it(`should notify the DiscordMessageCommandVersion service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;
    let errorDiscordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let canSendMessageResponseToThisChannelSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let getNotAllowedChannelErrorMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVersionService();
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();
      errorDiscordMessageResponse = createHydratedMock<IDiscordMessageResponse>();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        channel: createInstance(TextChannel.prototype),
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      canSendMessageResponseToThisChannelSpy = jest
        .spyOn(service, `canSendMessageResponseToThisChannel`)
        .mockReturnValue(false);
      getMessageResponseSpy = jest.spyOn(service, `getMessageResponse`).mockResolvedValue(discordMessageResponse);
      getNotAllowedChannelErrorMessageResponseSpy = jest
        .spyOn(service, `getNotAllowedChannelErrorMessageResponse`)
        .mockResolvedValue(errorDiscordMessageResponse);
    });

    it(`should log about the command`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandVersionService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-version command detected`,
      } as ILoggerLog);
    });

    it(`should check if the command is allowed for this channel`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(canSendMessageResponseToThisChannelSpy).toHaveBeenCalledTimes(1);
      expect(canSendMessageResponseToThisChannelSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the command is not allowed for this channel`, (): void => {
      beforeEach((): void => {
        canSendMessageResponseToThisChannelSpy.mockReturnValue(false);
      });

      it(`should not get a message response`, async (): Promise<void> => {
        expect.assertions(1);

        await service.handleResponse(anyDiscordMessage);

        expect(getMessageResponseSpy).not.toHaveBeenCalled();
      });

      it(`should return an error message response`, async (): Promise<void> => {
        expect.assertions(4);

        const result = await service.handleResponse(anyDiscordMessage);

        expect(getNotAllowedChannelErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getNotAllowedChannelErrorMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
        expect(result).toStrictEqual(errorDiscordMessageResponse);
        expect(result).not.toStrictEqual(discordMessageResponse);
      });
    });

    describe(`when the command is allowed for this channel`, (): void => {
      beforeEach((): void => {
        canSendMessageResponseToThisChannelSpy.mockReturnValue(true);
      });

      it(`should get a message response`, async (): Promise<void> => {
        expect.assertions(3);

        await service.handleResponse(anyDiscordMessage);

        expect(getNotAllowedChannelErrorMessageResponseSpy).not.toHaveBeenCalled();
        expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      it(`should return the message response`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.handleResponse(anyDiscordMessage);

        expect(result).not.toStrictEqual(errorDiscordMessageResponse);
        expect(result).toStrictEqual(discordMessageResponse);
      });
    });
  });

  describe(`canSendMessageResponseToThisChannel()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageCommandVerifyChannelRightServiceVerifySpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>();
      discordMessageCommandVerifyChannelRightServiceVerifySpy = jest.spyOn(
        discordMessageCommandVerifyChannelRightService,
        `verify`
      );
    });

    it(`should verify if the command can be executed for the type of channel related to this message`, (): void => {
      expect.assertions(2);

      service.canSendMessageResponseToThisChannel(anyDiscordMessage);

      expect(discordMessageCommandVerifyChannelRightServiceVerifySpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandVerifyChannelRightServiceVerifySpy).toHaveBeenCalledWith(
        anyDiscordMessage,
        service.allowedChannels
      );
    });

    describe(`when the message comes from a DM channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(DMChannel.prototype),
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message comes from a text channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message comes from a thread channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(ThreadChannel.prototype),
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message comes from a news channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(NewsChannel.prototype),
        });
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeFalse();
      });
    });
  });

  describe(`getNotAllowedChannelErrorMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        channel: createInstance(TextChannel.prototype),
      });
      discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy = jest.spyOn(
        discordMessageCommandVerifyChannelRightService,
        `getErrorMessageResponse`
      );
    });

    it(`should get the error message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.getNotAllowedChannelErrorMessageResponse(anyDiscordMessage);

      expect(discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy).toHaveBeenCalledWith(
        anyDiscordMessage,
        service.allowedChannels
      );
    });

    it(`should return the error message response`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getNotAllowedChannelErrorMessageResponse(anyDiscordMessage);

      const discordMessageResponse: IDiscordMessageResponse = {
        options: {
          embeds: [
            {
              author: {
                iconURL: `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`,
                name: `[dev] Sonia`,
                url: `https://github.com/Sonia-corporation?type=source`,
              },
              color: 15562905,
              fields: [
                {
                  name: `Wrong channel!`,
                  value: `This command is not allowed on text channels.`,
                },
                {
                  name: `Allowed channels`,
                  value: `You can use this command only on private messages, text channels, and threads.`,
                },
                {
                  name: `Help me to get better!`,
                  value: `If you think that using this command on text channels should be allowed, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
                },
              ],
              footer: {
                iconURL: undefined,
                text: `I don't allow you!`,
              },
              thumbnail: {
                url: `https://i.ibb.co/5jZmzSB/icons8-error-512.png`,
              },
              title: `I cannot let you do that!`,
            },
          ],
        },
      };
      expect(result).toMatchObject(discordMessageResponse);
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandVersionImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let appConfigQueryServiceGetTotalReleaseCountHumanizedSpy: jest.SpyInstance;
    let appConfigQueryServiceGetFirstReleaseDateFormattedSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandVersionImageUrlSpy: jest.SpyInstance;
    let discordSoniaServiceGetFullNameSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let appConfigQueryServiceGetReleaseDateHumanizedSpy: jest.SpyInstance;
    let appConfigQueryServiceGetInitializationDateHumanizedSpy: jest.SpyInstance;
    let appConfigServiceGetReleaseNotesSpy: jest.SpyInstance;
    let appConfigQueryServiceGetProductionStateHumanizedSpy: jest.SpyInstance;
    let discordSoniaEmotionalStateServiceGetEmotionalStateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVersionService();

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandVersionImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandVersionImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getTotalReleaseCountHumanized`
      );
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy = jest.spyOn(
        appConfigQueryService,
        `getFirstReleaseDateFormatted`
      );
      discordMessageConfigServiceGetMessageCommandVersionImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandVersionImageUrl`
      );
      discordSoniaServiceGetFullNameSpy = jest.spyOn(discordSoniaService, `getFullName`);
      appConfigServiceGetVersionSpy = jest.spyOn(appConfigService, `getVersion`);
      appConfigQueryServiceGetReleaseDateHumanizedSpy = jest.spyOn(appConfigQueryService, `getReleaseDateHumanized`);
      appConfigQueryServiceGetInitializationDateHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getInitializationDateHumanized`
      );
      appConfigServiceGetReleaseNotesSpy = jest.spyOn(appConfigService, `getReleaseNotes`);
      appConfigQueryServiceGetProductionStateHumanizedSpy = jest.spyOn(
        appConfigQueryService,
        `getProductionStateHumanized`
      );
      discordSoniaEmotionalStateServiceGetEmotionalStateSpy = jest.spyOn(
        discordSoniaEmotionalStateService,
        `getEmotionalState`
      );
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandVersionImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with 6 fields`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields).toHaveLength(6);
    });

    it(`should return a Discord message response embed with an application version field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigServiceGetVersionSpy.mockReturnValue(`8`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields?.[0]).toStrictEqual({
        name: `My age`,
        value: `[8](https://github.com/Sonia-corporation/sonia-discord/releases/tag/8)`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a release date field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigQueryServiceGetReleaseDateHumanizedSpy.mockReturnValue(`dummy-release-date-humanized`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields?.[1]).toStrictEqual({
        inline: false,
        name: `My last birthday`,
        value: `dummy-release-date-humanized`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a initialization date field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigQueryServiceGetInitializationDateHumanizedSpy.mockReturnValue(`dummy-initialization-date-humanized`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields?.[2]).toStrictEqual({
        inline: false,
        name: `The last time I woken up`,
        value: `dummy-initialization-date-humanized`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a release notes field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigServiceGetReleaseNotesSpy.mockReturnValue(`dummy-release-notes`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields?.[3]).toStrictEqual({
        name: `My birthday card`,
        value: `dummy-release-notes\n\nCheckout all my [birthday cards](https://github.com/Sonia-corporation/sonia-discord/blob/master/CHANGELOG.md).`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a status field`, async (): Promise<void> => {
      expect.assertions(1);
      appConfigQueryServiceGetProductionStateHumanizedSpy.mockReturnValue(AppProductionStateEnum.DEVELOPMENT);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields?.[4]).toStrictEqual({
        inline: false,
        name: `My location`,
        value: `Running in development`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with an emotional state field`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaEmotionalStateServiceGetEmotionalStateSpy.mockReturnValue(DiscordSoniaEmotionalStateEnum.AGITATED);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.fields?.[5]).toStrictEqual({
        inline: false,
        name: `My emotional state`,
        value: `Agitated`,
      } as EmbedFieldData);
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);
      appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 birthdays`);
      appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `8 birthdays since the 24th March 2020`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 birthdays`);
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: undefined,
          text: `8 birthdays since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        appConfigQueryServiceGetTotalReleaseCountHumanizedSpy.mockReturnValue(`8 birthdays`);
        appConfigQueryServiceGetFirstReleaseDateFormattedSpy.mockReturnValue(`the 24th March 2020`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `8 birthdays since the 24th March 2020`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandVersionImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse();

      expect(moment(result.options.embeds?.[0]?.timestamp).isValid()).toBe(true);
      expect(moment(result.options.embeds?.[0]?.timestamp).fromNow()).toBe(`a few seconds ago`);
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetFullNameSpy.mockReturnValue(`dummy-full-name`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.title).toBe(`dummy-full-name version`);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.content).toBeUndefined();
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVersionService();
      message = `dummy-message`;

      discordMessageConfigServiceGetMessageCommandPrefixSpy = jest
        .spyOn(discordMessageConfigService, `getMessageCommandPrefix`)
        .mockImplementation();
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(`@`);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });
    });

    describe(`when the message command prefix is "-" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([`-`, `!`]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });
    });
  });
});
