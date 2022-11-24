import { DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService } from './discord-message-command-verify-channel-right-warning-unsupported-channel-type.service';
import { DiscordMessageCommandVerifyChannelRightService } from './discord-message-command-verify-channel-right.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordChannelEnum } from '../../../channels/enums/discord-channel.enum';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import {
  CategoryChannel,
  DMChannel,
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
  NewsChannel,
  StageChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordMessageCommandVerifyChannelRightService`, (): void => {
  let service: DiscordMessageCommandVerifyChannelRightService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService: DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService =
      DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandVerifyChannelRight service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVerifyChannelRightService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandVerifyChannelRightService));
    });

    it(`should return the created DiscordMessageCommandVerifyChannelRight service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandVerifyChannelRightService.getInstance();

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

    it(`should notify the DiscordMessageCommandVerifyChannelRight service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandVerifyChannelRightService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERIFY_CHANNEL_RIGHT_SERVICE
      );
    });
  });

  describe(`verify()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let allowedChannels: Set<DiscordChannelEnum>;

    let discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVerifyChannelRightService();

      discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy = jest
        .spyOn(discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService, `warn`)
        .mockImplementation();
    });

    describe(`when the message is from a text channel and the text channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a text channel and the text channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.TEXT]);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from a DM channel and the DM channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(DMChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a DM channel and the DM channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(DMChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.DM]);
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from a thread channel and the thread channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(ThreadChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a thread channel and the thread channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(ThreadChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.THREAD]);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from a news channel and the news channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(NewsChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a news channel and the news channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(NewsChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.NEWS]);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from a category channel and the category channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(CategoryChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a category channel and the category channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(CategoryChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.CATEGORY]);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from a stage channel and the stage channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(StageChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a stage channel and the stage channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(StageChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.STAGE]);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from a voice channel and the voice channel is not allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(VoiceChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should not log and not send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(1);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });

    describe(`when the message is from a voice channel and the voice channel is allowed`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(VoiceChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.VOICE]);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message is from an unsupported channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: undefined,
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>();
      });

      it(`should log and send a warning to Sonia warnings channel`, (): void => {
        expect.assertions(2);

        service.verify(anyDiscordMessage, allowedChannels);

        expect(
          discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy
        ).toHaveBeenCalledTimes(1);
        expect(discordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeServiceWarnSpy).toHaveBeenCalledWith(
          `dummy-id`
        );
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.verify(anyDiscordMessage, allowedChannels);

        expect(result).toBeFalse();
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let allowedChannels: Set<DiscordChannelEnum>;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandVerifyChannelRightService();

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
    });

    describe(`when the channel is a text channel and the allowed channels is containing only a text channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([DiscordChannelEnum.TEXT]);
      });

      it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
        expect.assertions(1);
        const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with 3 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields).toHaveLength(3);
      });

      it(`should return a Discord message response embed with a wrong channel field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields?.[0]).toStrictEqual({
          name: `Wrong channel!`,
          value: `This command is not allowed on text channels.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a hint field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields?.[1]).toStrictEqual({
          name: `Allowed channels`,
          value: `You can use this command only on text channels.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a report field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields?.[2]).toStrictEqual({
          name: `Help me to get better!`,
          value: `If you think that using this command on text channels should be allowed, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: `dummy-image-url`,
          text: `I don't allow you!`,
        } as MessageEmbedFooter);
      });

      describe(`when the Sonia image url is null`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        });

        it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: undefined,
            text: `I don't allow you!`,
          } as MessageEmbedFooter);
        });
      });

      describe(`when the Sonia image url is "image-url"`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        });

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: `image-url`,
            text: `I don't allow you!`,
          } as MessageEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as MessageEmbedThumbnail);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(moment(result.options.embeds?.[0]?.timestamp).isValid()).toBe(true);
        expect(moment(result.options.embeds?.[0]?.timestamp).fromNow()).toBe(`a few seconds ago`);
      });

      it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.title).toBe(`I cannot let you do that!`);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.content).toBeUndefined();
      });
    });

    describe(`when the channel is a text channel and the allowed channels is containing a text channel, a DM channel, and a news channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
          id: `dummy-id`,
        });
        allowedChannels = new Set<DiscordChannelEnum>([
          DiscordChannelEnum.TEXT,
          DiscordChannelEnum.DM,
          DiscordChannelEnum.NEWS,
        ]);
      });

      it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
        expect.assertions(1);
        const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.color).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should return a Discord message response embed with 3 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields).toHaveLength(3);
      });

      it(`should return a Discord message response embed with a wrong channel field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields?.[0]).toStrictEqual({
          name: `Wrong channel!`,
          value: `This command is not allowed on text channels.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a hint field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields?.[1]).toStrictEqual({
          name: `Allowed channels`,
          value: `You can use this command only on text channels, private messages, and news channels.`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a report field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.fields?.[2]).toStrictEqual({
          name: `Help me to get better!`,
          value: `If you think that using this command on text channels should be allowed, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: `dummy-image-url`,
          text: `I don't allow you!`,
        } as MessageEmbedFooter);
      });

      describe(`when the Sonia image url is null`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        });

        it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: undefined,
            text: `I don't allow you!`,
          } as MessageEmbedFooter);
        });
      });

      describe(`when the Sonia image url is "image-url"`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        });

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: `image-url`,
            text: `I don't allow you!`,
          } as MessageEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandErrorImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as MessageEmbedThumbnail);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(moment(result.options.embeds?.[0]?.timestamp).isValid()).toBe(true);
        expect(moment(result.options.embeds?.[0]?.timestamp).fromNow()).toBe(`a few seconds ago`);
      });

      it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.options.embeds?.[0]?.title).toBe(`I cannot let you do that!`);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getErrorMessageResponse(anyDiscordMessage, allowedChannels);

        expect(result.content).toBeUndefined();
      });
    });
  });
});