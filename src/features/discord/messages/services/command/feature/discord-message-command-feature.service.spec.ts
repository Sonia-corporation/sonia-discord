/* eslint-disable import/order */
import {
  CategoryChannel,
  DMChannel,
  GuildBasedChannel,
  NewsChannel,
  StageChannel,
  TextBasedChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from 'discord.js';
import _ from 'lodash';
import { createHydratedMock, createMock } from 'ts-auto-mock';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordCommandFlagDuplicated } from '../../../interfaces/commands/flags/discord-command-flag-duplicated';
import { IDiscordCommandFlagError } from '../../../interfaces/commands/flags/discord-command-flag-error';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { DiscordMessageCommandVerifyChannelRightService } from '../discord-message-command-verify-channel-right.service';
import { DiscordMessageCommandFeatureService } from './discord-message-command-feature.service';
import { DiscordMessageCommandFeatureNoonService } from './features/noon/services/discord-message-command-feature-noon.service';
import { DiscordMessageCommandFeatureReleaseNotesService } from './features/release-notes/services/discord-message-command-feature-release-notes.service';
import { DiscordMessageCommandFeatureEmptyContentErrorService } from './services/discord-message-command-feature-empty-content-error.service';
import { DiscordMessageCommandFeatureEmptyFeatureNameErrorService } from './services/feature-names/discord-message-command-feature-empty-feature-name-error.service';
import { DiscordMessageCommandFeatureWrongFeatureNameErrorService } from './services/feature-names/discord-message-command-feature-wrong-feature-name-error.service';
import { DiscordMessageCommandFeatureDuplicatedFlagsErrorService } from './services/flags/discord-message-command-feature-duplicated-flags-error.service';
import { DiscordMessageCommandFeatureEmptyFlagsErrorService } from './services/flags/discord-message-command-feature-empty-flags-error.service';
import { DiscordMessageCommandFeatureOppositeFlagsErrorService } from './services/flags/discord-message-command-feature-opposite-flags-error.service';
import { DiscordMessageCommandFeatureWrongFlagsErrorService } from './services/flags/discord-message-command-feature-wrong-flags-error.service';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureService`, (): void => {
  let service: DiscordMessageCommandFeatureService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageCommandFeatureNoonService: DiscordMessageCommandFeatureNoonService;
  let discordMessageCommandFeatureReleaseNotesService: DiscordMessageCommandFeatureReleaseNotesService;
  let discordMessageCommandFeatureEmptyContentErrorService: DiscordMessageCommandFeatureEmptyContentErrorService;
  let discordMessageCommandFeatureEmptyFeatureNameErrorService: DiscordMessageCommandFeatureEmptyFeatureNameErrorService;
  let discordMessageCommandFeatureWrongFeatureNameErrorService: DiscordMessageCommandFeatureWrongFeatureNameErrorService;
  let discordMessageCommandFeatureEmptyFlagsErrorService: DiscordMessageCommandFeatureEmptyFlagsErrorService;
  let discordMessageCommandFeatureWrongFlagsErrorService: DiscordMessageCommandFeatureWrongFlagsErrorService;
  let discordMessageCommandFeatureDuplicatedFlagsErrorService: DiscordMessageCommandFeatureDuplicatedFlagsErrorService;
  let discordMessageCommandFeatureOppositeFlagsErrorService: DiscordMessageCommandFeatureOppositeFlagsErrorService;
  let discordMessageCommandVerifyChannelRightService: DiscordMessageCommandVerifyChannelRightService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageCommandFeatureNoonService = DiscordMessageCommandFeatureNoonService.getInstance();
    discordMessageCommandFeatureReleaseNotesService = DiscordMessageCommandFeatureReleaseNotesService.getInstance();
    discordMessageCommandFeatureEmptyContentErrorService =
      DiscordMessageCommandFeatureEmptyContentErrorService.getInstance();
    discordMessageCommandFeatureEmptyFeatureNameErrorService =
      DiscordMessageCommandFeatureEmptyFeatureNameErrorService.getInstance();
    discordMessageCommandFeatureWrongFeatureNameErrorService =
      DiscordMessageCommandFeatureWrongFeatureNameErrorService.getInstance();
    discordMessageCommandFeatureEmptyFlagsErrorService =
      DiscordMessageCommandFeatureEmptyFlagsErrorService.getInstance();
    discordMessageCommandFeatureWrongFlagsErrorService =
      DiscordMessageCommandFeatureWrongFlagsErrorService.getInstance();
    discordMessageCommandFeatureDuplicatedFlagsErrorService =
      DiscordMessageCommandFeatureDuplicatedFlagsErrorService.getInstance();
    discordMessageCommandFeatureOppositeFlagsErrorService =
      DiscordMessageCommandFeatureOppositeFlagsErrorService.getInstance();
    discordMessageCommandVerifyChannelRightService = DiscordMessageCommandVerifyChannelRightService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeature service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureService));
    });

    it(`should return the created DiscordMessageCommandFeature service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeature service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE
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
      service = new DiscordMessageCommandFeatureService();
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
        context: `DiscordMessageCommandFeatureService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-feature command detected`,
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

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeFalse();
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
                  value: `You can use this command only on private messages and text channels.`,
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
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;
    let getEmptyContentErrorMessageResponse: IDiscordMessageResponse;
    let getEmptyFeatureNameErrorMessageResponse: IDiscordMessageResponse;
    let getWrongFeatureNameErrorMessageResponse: IDiscordMessageResponse;
    let getEmptyFlagsErrorMessageResponse: IDiscordMessageResponse;
    let getWrongFlagsErrorMessageResponse: IDiscordMessageResponse;
    let getDuplicatedFlagsErrorMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesServiceIsReleaseNotesFeatureSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonServiceVerifyMessageSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesServiceVerifyMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
        valueOf: _.stubObject(),
      });
      discordMessageResponse = createMock<IDiscordMessageResponse>({
        content: `discordMessageResponse`,
      });
      getEmptyContentErrorMessageResponse = createMock<IDiscordMessageResponse>({
        content: `getEmptyContentErrorMessageResponse`,
      });
      getEmptyFeatureNameErrorMessageResponse = createMock<IDiscordMessageResponse>({
        content: `getEmptyFeatureNameErrorMessageResponse`,
      });
      getWrongFeatureNameErrorMessageResponse = createMock<IDiscordMessageResponse>({
        content: `getWrongFeatureNameErrorMessageResponse`,
      });
      getEmptyFlagsErrorMessageResponse = createMock<IDiscordMessageResponse>({
        content: `getEmptyFlagsErrorMessageResponse`,
      });
      getWrongFlagsErrorMessageResponse = createMock<IDiscordMessageResponse>({
        content: `getWrongFlagsErrorMessageResponse`,
      });
      getDuplicatedFlagsErrorMessageResponse = createMock<IDiscordMessageResponse>({
        content: `getDuplicatedFlagsErrorMessageResponse`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy = jest
        .spyOn(discordMessageCommandFeatureNoonService, `isNoonFeature`)
        .mockImplementation();
      discordMessageCommandFeatureReleaseNotesServiceIsReleaseNotesFeatureSpy = jest
        .spyOn(discordMessageCommandFeatureReleaseNotesService, `isReleaseNotesFeature`)
        .mockImplementation();
      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureNoonService, `getMessageResponse`)
        .mockRejectedValue(new Error(`discordMessageCommandFeatureNoonService getMessageResponse error`));
      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureReleaseNotesService, `getMessageResponse`)
        .mockRejectedValue(new Error(`discordMessageCommandFeatureReleaseNotesService getMessageResponse error`));
      discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureEmptyContentErrorService, `getMessageResponse`)
        .mockRejectedValue(new Error(`discordMessageCommandFeatureEmptyContentErrorService getMessageResponse error`));
      discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureEmptyFeatureNameErrorService, `getMessageResponse`)
        .mockRejectedValue(
          new Error(`discordMessageCommandFeatureEmptyFeatureNameErrorService getMessageResponse error`)
        );
      discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureWrongFeatureNameErrorService, `getMessageResponse`)
        .mockRejectedValue(
          new Error(`discordMessageCommandFeatureWrongFeatureNameErrorService getMessageResponse error`)
        );
      discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureEmptyFlagsErrorService, `getMessageResponse`)
        .mockRejectedValue(new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`));
      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureWrongFlagsErrorService, `getMessageResponse`)
        .mockRejectedValue(new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`));
      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureDuplicatedFlagsErrorService, `getMessageResponse`)
        .mockRejectedValue(
          new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
        );
      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureOppositeFlagsErrorService, `getMessageResponse`)
        .mockRejectedValue(new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`));
      discordMessageCommandFeatureNoonServiceVerifyMessageSpy = jest.spyOn(
        discordMessageCommandFeatureNoonService,
        `verifyMessage`
      );
      discordMessageCommandFeatureReleaseNotesServiceVerifyMessageSpy = jest.spyOn(
        discordMessageCommandFeatureReleaseNotesService,
        `verifyMessage`
      );
    });

    describe(`when the given message content is null`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = null;
      });

      it(`should get the empty content error message response`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`discordMessageCommandFeatureEmptyContentErrorService getMessageResponse error`)
        );

        expect(discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy).toHaveBeenCalledWith();
      });

      describe(`when the fetch of the empty content error message response failed`, (): void => {
        beforeEach((): void => {
          discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy.mockRejectedValue(
            new Error(`discordMessageCommandFeatureEmptyContentErrorService getMessageResponse error`)
          );
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`discordMessageCommandFeatureEmptyContentErrorService getMessageResponse error`)
          );
        });
      });

      describe(`when the fetch of the empty content error message response succeeded`, (): void => {
        beforeEach((): void => {
          discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy.mockResolvedValue(
            getEmptyContentErrorMessageResponse
          );
        });

        it(`should return the empty content error message response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(result).toStrictEqual(getEmptyContentErrorMessageResponse);
        });
      });

      it(`should not get a message response for the noon feature`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`discordMessageCommandFeatureEmptyContentErrorService getMessageResponse error`)
        );

        expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given message content is valid`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = `message`;
      });

      describe(`when the given message has no feature name`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `message !feature`;
        });

        it(`should get the empty feature name error message response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`discordMessageCommandFeatureEmptyFeatureNameErrorService getMessageResponse error`)
          );

          expect(discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
            1
          );
          expect(discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy).toHaveBeenCalledWith(
            anyDiscordMessage,
            [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F]
          );
        });

        describe(`when the fetch of the empty feature name error message response failed`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy.mockRejectedValue(
              new Error(`discordMessageCommandFeatureEmptyFeatureNameErrorService getMessageResponse error`)
            );
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`discordMessageCommandFeatureEmptyFeatureNameErrorService getMessageResponse error`)
            );
          });
        });

        describe(`when the fetch of the empty feature name error message response succeeded`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy.mockResolvedValue(
              getEmptyFeatureNameErrorMessageResponse
            );
          });

          it(`should return the empty feature name error message response`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getMessageResponse(anyDiscordMessage);

            expect(result).toStrictEqual(getEmptyFeatureNameErrorMessageResponse);
          });
        });

        it(`should log about not having a feature name`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`discordMessageCommandFeatureEmptyFeatureNameErrorService getMessageResponse error`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureService`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-feature name not specified`,
          } as ILoggerLog);
        });

        it(`should not get a message response for the noon feature`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`discordMessageCommandFeatureEmptyFeatureNameErrorService getMessageResponse error`)
          );

          expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message has a feature name`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `message !feature dummy`;
        });

        describe(`when the given message feature is not an existing feature`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy.mockReturnValue(false);
            discordMessageCommandFeatureReleaseNotesServiceIsReleaseNotesFeatureSpy.mockReturnValue(false);
          });

          it(`should get the wrong feature name error message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`discordMessageCommandFeatureWrongFeatureNameErrorService getMessageResponse error`)
            );

            expect(discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
              1
            );
            expect(discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy).toHaveBeenCalledWith(
              anyDiscordMessage,
              [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F],
              `dummy`
            );
          });

          describe(`when the fetch of the wrong feature name error message response failed`, (): void => {
            beforeEach((): void => {
              discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy.mockRejectedValue(
                new Error(`discordMessageCommandFeatureWrongFeatureNameErrorService getMessageResponse error`)
              );
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                new Error(`discordMessageCommandFeatureWrongFeatureNameErrorService getMessageResponse error`)
              );
            });
          });

          describe(`when the fetch of the wrong feature name error message response succeeded`, (): void => {
            beforeEach((): void => {
              discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy.mockResolvedValue(
                getWrongFeatureNameErrorMessageResponse
              );
            });

            it(`should return the wrong feature name error message response`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getMessageResponse(anyDiscordMessage);

              expect(result).toStrictEqual(getWrongFeatureNameErrorMessageResponse);
            });
          });

          it(`should log about the fact that the feature does not exist`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`discordMessageCommandFeatureWrongFeatureNameErrorService getMessageResponse error`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordMessageCommandFeatureService`,
              hasExtendedContext: true,
              message: `context-[dummy-id] text-feature name value-dummy not matching an existing feature`,
            } as ILoggerLog);
          });

          it(`should not get a message response for the noon feature`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`discordMessageCommandFeatureWrongFeatureNameErrorService getMessageResponse error`)
            );

            expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the given message feature is the noon feature`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy.mockReturnValue(true);
          });

          it(`should verify the message channel`, async (): Promise<void> => {
            expect.assertions(2);

            await service.getMessageResponse(anyDiscordMessage);

            expect(discordMessageCommandFeatureNoonServiceVerifyMessageSpy).toHaveBeenCalledTimes(1);
            expect(discordMessageCommandFeatureNoonServiceVerifyMessageSpy).toHaveBeenCalledWith(anyDiscordMessage);
          });

          describe.each`
            channel                                               | channelType
            ${createInstance<TextChannel>(TextChannel.prototype)} | ${`text channels`}
            ${createInstance<DMChannel>(DMChannel.prototype)}     | ${`DM channels`}
          `(
            `when the message comes from an unsupported channel ($channelType)`,
            ({ channel }: IChannelMatrix): void => {
              beforeEach((): void => {
                anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
                  // @ts-ignore
                  channel,
                  content: `message !feature Noon`,
                  id: `dummy-id`,
                  valueOf: _.stubObject(),
                });
              });

              it(`should get the empty flags error message response`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                  new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                );

                expect(discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
                  1
                );
                expect(discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                  anyDiscordMessage,
                  [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F],
                  `noon`
                );
              });

              describe(`when the given message feature does not contain a flag`, (): void => {
                beforeEach((): void => {
                  anyDiscordMessage.content = `message !feature Noon`;
                });

                it(`should get the empty flags error message response`, async (): Promise<void> => {
                  expect.assertions(3);

                  await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                    new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                  );

                  expect(discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
                    1
                  );
                  expect(discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                    anyDiscordMessage,
                    [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F],
                    `noon`
                  );
                });

                describe(`when the fetch of the empty flags error message response failed`, (): void => {
                  beforeEach((): void => {
                    discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                      new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                    );
                  });

                  it(`should throw an error`, async (): Promise<void> => {
                    expect.assertions(1);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                    );
                  });
                });

                describe(`when the fetch of the empty flags error message response succeeded`, (): void => {
                  beforeEach((): void => {
                    discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                      getEmptyFlagsErrorMessageResponse
                    );
                  });

                  it(`should return the empty flags error message response`, async (): Promise<void> => {
                    expect.assertions(1);

                    const result = await service.getMessageResponse(anyDiscordMessage);

                    expect(result).toStrictEqual(getEmptyFlagsErrorMessageResponse);
                  });
                });

                it(`should log about the fact that no flags was specified`, async (): Promise<void> => {
                  expect.assertions(3);

                  await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                    new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                  );

                  expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                  expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                    context: `DiscordMessageCommandFeatureService`,
                    hasExtendedContext: true,
                    message: `context-[dummy-id] text-feature name value-Noon not having any flags`,
                  } as ILoggerLog);
                });
              });

              describe(`when the given message feature contains a flag`, (): void => {
                beforeEach((): void => {
                  anyDiscordMessage.content = `message !feature Noon --yo`;
                });

                describe(`when the given message feature flag is unknown`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --yo`;
                  });

                  it(`should get the wrong flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flag \`yo\` is unknown to the noon feature.`,
                        isUnknown: true,
                        name: `Unknown flag`,
                      } as IDiscordCommandFlagError,
                    ]);
                  });

                  describe(`when the fetch of the wrong flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the wrong flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getWrongFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the wrong flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getWrongFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is wrong`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon not having all valid flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags enabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --enabled=true -e`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--enabled=true\` and \`-e\` are duplicated.`,
                        name: `Enabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags disabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --disabled=true -d`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--disabled=true\` and \`-d\` are duplicated.`,
                        name: `Disabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags help which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --help -h`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--help\` and \`-h\` are duplicated.`,
                        name: `Help flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 3 flags enabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --enabled=true -e --enabled=false`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--enabled=true\`, \`-e\` and \`--enabled=false\` are duplicated.`,
                        name: `Enabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 3 flags disabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --disabled=true -d --disabled=false`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--disabled=true\`, \`-d\` and \`--disabled=false\` are duplicated.`,
                        name: `Disabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 3 flags help which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --help -h --help`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--help\`, \`-h\` and \`--help\` are duplicated.`,
                        name: `Help flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags which are known and valid but opposites`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --enabled=true --disabled=true`;
                  });

                  it(`should get the opposite flags error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--enabled=true\` and \`--disabled=true\` are opposites.`,
                        name: `Enabled and Disabled flags can not be combined`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the opposite flags error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the opposite flags error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the opposite flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is opposite`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has opposite flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 shortcut flags which are known and valid but opposites`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon -e -d`;
                  });

                  it(`should get the opposite flags error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`-e\` and \`-d\` are opposites.`,
                        name: `Enabled and Disabled flags can not be combined`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the opposite flags error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the opposite flags error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the opposite flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is opposite`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Noon has opposite flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature enabled flag is known and valid`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --enabled=true`;
                  });

                  it(`should get a message response for the noon feature`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureNoonService getMessageResponse error`)
                    );

                    expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
                    expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                      anyDiscordMessage,
                      `--enabled=true`
                    );
                  });

                  describe(`when the message response for the noon feature failed to be fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should return the message response error for the noon feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the message response for the noon feature was successfully fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockResolvedValue(
                        discordMessageResponse
                      );
                    });

                    it(`should return a Discord message response for the noon feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(discordMessageResponse);
                    });
                  });
                });

                describe(`when the given message feature disabled flag is known and valid`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --disabled=true`;
                  });

                  it(`should get a message response for the noon feature`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureNoonService getMessageResponse error`)
                    );

                    expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
                    expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                      anyDiscordMessage,
                      `--disabled=true`
                    );
                  });

                  describe(`when the message response for the noon feature failed to be fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should return the message response error for the noon feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the message response for the noon feature was successfully fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockResolvedValue(
                        discordMessageResponse
                      );
                    });

                    it(`should return a Discord message response for the noon feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(discordMessageResponse);
                    });
                  });
                });

                describe(`when the given message feature help flag is known and valid`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Noon --help`;
                  });

                  it(`should get a message response for the noon feature`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureNoonService getMessageResponse error`)
                    );

                    expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
                    expect(discordMessageCommandFeatureNoonServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                      anyDiscordMessage,
                      `--help`
                    );
                  });

                  describe(`when the message response for the noon feature failed to be fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should return the message response error for the noon feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the message response for the noon feature was successfully fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockResolvedValue(
                        discordMessageResponse
                      );
                    });

                    it(`should return a Discord message response for the noon feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(discordMessageResponse);
                    });
                  });
                });
              });
            }
          );

          describe.each`
            channel                                                   | channelType
            ${createInstance<NewsChannel>(NewsChannel.prototype)}     | ${`news channels`}
            ${createInstance<NewsChannel>(VoiceChannel.prototype)}    | ${`voice channels`}
            ${createInstance<NewsChannel>(CategoryChannel.prototype)} | ${`category channels`}
            ${createInstance<NewsChannel>(StageChannel.prototype)}    | ${`stage channels`}
            ${createInstance<NewsChannel>(ThreadChannel.prototype)}   | ${`threads`}
          `(
            `when the message comes from an unsupported channel ($channelType)`,
            ({ channel, channelType }: IChannelMatrix): void => {
              beforeEach((): void => {
                anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
                  // @ts-ignore
                  channel,
                  content: `message !feature Noon`,
                  id: `dummy-id`,
                  valueOf: _.stubObject(),
                });
              });

              it(`should return the unsupported channel type error message response`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.getMessageResponse(anyDiscordMessage);

                const discordMessageResponse: Partial<IDiscordMessageResponse> = {
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
                            value: `This sub-command is not allowed on ${channelType}.`,
                          },
                          {
                            name: `Allowed channels`,
                            value: `You can use this sub-command only on private messages and text channels.`,
                          },
                          {
                            name: `Help me to get better!`,
                            value: `If you think that using this sub-command on ${channelType} should be allowed, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
                          },
                        ],
                        footer: {
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
            }
          );
        });

        describe(`when the given message feature is the release notes feature`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureReleaseNotesServiceIsReleaseNotesFeatureSpy.mockReturnValue(true);
          });

          it(`should verify the message channel`, async (): Promise<void> => {
            expect.assertions(2);

            await service.getMessageResponse(anyDiscordMessage);

            expect(discordMessageCommandFeatureReleaseNotesServiceVerifyMessageSpy).toHaveBeenCalledTimes(1);
            expect(discordMessageCommandFeatureReleaseNotesServiceVerifyMessageSpy).toHaveBeenCalledWith(
              anyDiscordMessage
            );
          });

          describe.each`
            channel                                               | channelType
            ${createInstance<TextChannel>(TextChannel.prototype)} | ${`text channels`}
            ${createInstance<DMChannel>(DMChannel.prototype)}     | ${`DM channels`}
          `(
            `when the message comes from an unsupported channel ($channelType)`,
            ({ channel }: IChannelMatrix): void => {
              beforeEach((): void => {
                anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
                  // @ts-ignore
                  channel,
                  content: `message !feature Release-notes`,
                  id: `dummy-id`,
                  valueOf: _.stubObject(),
                });
              });

              describe(`when the given message feature does not contain a flag`, (): void => {
                beforeEach((): void => {
                  anyDiscordMessage.content = `message !feature Release-notes`;
                });

                it(`should get the empty flags error message response`, async (): Promise<void> => {
                  expect.assertions(3);

                  await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                    new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                  );

                  expect(discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
                    1
                  );
                  expect(discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                    anyDiscordMessage,
                    [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F],
                    `release-notes`
                  );
                });

                describe(`when the fetch of the empty flags error message response failed`, (): void => {
                  beforeEach((): void => {
                    discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                      new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                    );
                  });

                  it(`should throw an error`, async (): Promise<void> => {
                    expect.assertions(1);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                    );
                  });
                });

                describe(`when the fetch of the empty flags error message response succeeded`, (): void => {
                  beforeEach((): void => {
                    discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                      getEmptyFlagsErrorMessageResponse
                    );
                  });

                  it(`should return the empty flags error message response`, async (): Promise<void> => {
                    expect.assertions(1);

                    const result = await service.getMessageResponse(anyDiscordMessage);

                    expect(result).toStrictEqual(getEmptyFlagsErrorMessageResponse);
                  });
                });

                it(`should log about the fact that no flags was specified`, async (): Promise<void> => {
                  expect.assertions(3);

                  await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                    new Error(`discordMessageCommandFeatureEmptyFlagsErrorService getMessageResponse error`)
                  );

                  expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                  expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                    context: `DiscordMessageCommandFeatureService`,
                    hasExtendedContext: true,
                    message: `context-[dummy-id] text-feature name value-Release-notes not having any flags`,
                  } as ILoggerLog);
                });
              });

              describe(`when the given message feature contains a flag`, (): void => {
                beforeEach((): void => {
                  anyDiscordMessage.content = `message !feature Release-notes --yo`;
                });

                describe(`when the given message feature flag is unknown`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --yo`;
                  });

                  it(`should get the wrong flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flag \`yo\` is unknown to the release-notes feature.`,
                        isUnknown: true,
                        name: `Unknown flag`,
                      } as IDiscordCommandFlagError,
                    ]);
                  });

                  describe(`when the fetch of the wrong flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the wrong flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureWrongFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getWrongFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the wrong flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getWrongFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is wrong`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes not having all valid flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags enabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --enabled=true -e`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--enabled=true\` and \`-e\` are duplicated.`,
                        name: `Enabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags disabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --disabled=true -d`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--disabled=true\` and \`-d\` are duplicated.`,
                        name: `Disabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags help which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --help -h`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--help\` and \`-h\` are duplicated.`,
                        name: `Help flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 3 flags enabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --enabled=true -e --enabled=false`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--enabled=true\`, \`-e\` and \`--enabled=false\` are duplicated.`,
                        name: `Enabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 3 flags disabled which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --disabled=true -d --disabled=false`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--disabled=true\`, \`-d\` and \`--disabled=false\` are duplicated.`,
                        name: `Disabled flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 3 flags help which are known and valid but duplicated`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --help -h --help`;
                  });

                  it(`should get the duplicated flag error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--help\`, \`-h\` and \`--help\` are duplicated.`,
                        name: `Help flag duplicated`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the duplicated flag error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the duplicated flag error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureDuplicatedFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the duplicated flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is duplicated`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureDuplicatedFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has duplicated flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 flags which are known and valid but opposites`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --enabled=true --disabled=true`;
                  });

                  it(`should get the opposite flags error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`--enabled=true\` and \`--disabled=true\` are opposites.`,
                        name: `Enabled and Disabled flags can not be combined`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the opposite flags error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the opposite flags error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the opposite flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is opposite`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has opposite flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature has 2 shortcut flags which are known and valid but opposites`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes -e -d`;
                  });

                  it(`should get the opposite flags error message response`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledTimes(1);
                    expect(
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy
                    ).toHaveBeenCalledWith([
                      {
                        description: `The flags \`-e\` and \`-d\` are opposites.`,
                        name: `Enabled and Disabled flags can not be combined`,
                      } as IDiscordCommandFlagDuplicated,
                    ]);
                  });

                  describe(`when the fetch of the opposite flags error message response failed`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should throw an error`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the fetch of the opposite flags error message response succeeded`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureOppositeFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                        getDuplicatedFlagsErrorMessageResponse
                      );
                    });

                    it(`should return the opposite flags error message response`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(getDuplicatedFlagsErrorMessageResponse);
                    });
                  });

                  it(`should log about the fact that at least one flag is opposite`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureOppositeFlagsErrorService getMessageResponse error`)
                    );

                    expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                      context: `DiscordMessageCommandFeatureService`,
                      hasExtendedContext: true,
                      message: `context-[dummy-id] text-feature name value-Release-notes has opposite flags`,
                    } as ILoggerLog);
                  });
                });

                describe(`when the given message feature enabled flag is known and valid`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --enabled=true`;
                  });

                  it(`should get a message response for the release notes feature`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureReleaseNotesService getMessageResponse error`)
                    );

                    expect(discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
                      1
                    );
                    expect(discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                      anyDiscordMessage,
                      `--enabled=true`
                    );
                  });

                  describe(`when the message response for the release notes feature failed to be fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should return the message response error for the release notes feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the message response for the release notes feature was successfully fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy.mockResolvedValue(
                        discordMessageResponse
                      );
                    });

                    it(`should return a Discord message response for the release notes feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(discordMessageResponse);
                    });
                  });
                });

                describe(`when the given message feature disabled flag is known and valid`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --disabled=true`;
                  });

                  it(`should get a message response for the release notes feature`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureReleaseNotesService getMessageResponse error`)
                    );

                    expect(discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
                      1
                    );
                    expect(discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                      anyDiscordMessage,
                      `--disabled=true`
                    );
                  });

                  describe(`when the message response for the release notes feature failed to be fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should return the message response error for the release notes feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the message response for the release notes feature was successfully fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy.mockResolvedValue(
                        discordMessageResponse
                      );
                    });

                    it(`should return a Discord message response for the release notes feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(discordMessageResponse);
                    });
                  });
                });

                describe(`when the given message feature help flag is known and valid`, (): void => {
                  beforeEach((): void => {
                    anyDiscordMessage.content = `message !feature Release-notes --help`;
                  });

                  it(`should get a message response for the release notes feature`, async (): Promise<void> => {
                    expect.assertions(3);

                    await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                      new Error(`discordMessageCommandFeatureReleaseNotesService getMessageResponse error`)
                    );

                    expect(discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledTimes(
                      1
                    );
                    expect(discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy).toHaveBeenCalledWith(
                      anyDiscordMessage,
                      `--help`
                    );
                  });

                  describe(`when the message response for the release notes feature failed to be fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy.mockRejectedValue(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });

                    it(`should return the message response error for the release notes feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
                        new Error(`discordMessageCommandFeatureWrongFlagsErrorService getMessageResponse error`)
                      );
                    });
                  });

                  describe(`when the message response for the release notes feature was successfully fetched`, (): void => {
                    beforeEach((): void => {
                      discordMessageCommandFeatureReleaseNotesServiceGetMessageResponseSpy.mockResolvedValue(
                        discordMessageResponse
                      );
                    });

                    it(`should return a Discord message response for the release notes feature`, async (): Promise<void> => {
                      expect.assertions(1);

                      const result = await service.getMessageResponse(anyDiscordMessage);

                      expect(result).toStrictEqual(discordMessageResponse);
                    });
                  });
                });
              });
            }
          );

          describe.each`
            channel                                                   | channelType
            ${createInstance<NewsChannel>(NewsChannel.prototype)}     | ${`news channels`}
            ${createInstance<NewsChannel>(VoiceChannel.prototype)}    | ${`voice channels`}
            ${createInstance<NewsChannel>(CategoryChannel.prototype)} | ${`category channels`}
            ${createInstance<NewsChannel>(StageChannel.prototype)}    | ${`stage channels`}
            ${createInstance<NewsChannel>(ThreadChannel.prototype)}   | ${`threads`}
          `(
            `when the message comes from an unsupported channel ($channelType)`,
            ({ channel, channelType }: IChannelMatrix): void => {
              beforeEach((): void => {
                anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
                  // @ts-ignore
                  channel,
                  content: `message !feature Release-notes`,
                  id: `dummy-id`,
                  valueOf: _.stubObject(),
                });
              });

              it(`should return the unsupported channel type error message response`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.getMessageResponse(anyDiscordMessage);

                const discordMessageResponse: Partial<IDiscordMessageResponse> = {
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
                            value: `This sub-command is not allowed on ${channelType}.`,
                          },
                          {
                            name: `Allowed channels`,
                            value: `You can use this sub-command only on private messages and text channels.`,
                          },
                          {
                            name: `Help me to get better!`,
                            value: `If you think that using this sub-command on ${channelType} should be allowed, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
                          },
                        ],
                        footer: {
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
            }
          );
        });
      });
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
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
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feature`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feature`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feature`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feature dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feature dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feature dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@f`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-f`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!f`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@f dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-f dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!f dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@F`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-F`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!F`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@F dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-F dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!F dummy`;
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
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feature`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feature`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feature`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feature dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feature dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feature dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@f`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-f`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!f`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@f dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-f dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!f dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@F`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-F`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!F`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@F dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-F dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!F dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });
    });
  });

  describe(`hasFlags()`, (): void => {
    let message: string;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
    });

    describe(`when the given message does not contains some flags`, (): void => {
      beforeEach((): void => {
        message = `!feature noon`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasFlags(message);

        expect(result).toBe(false);
      });
    });

    describe(`when the given message contains an enabled flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon --enabled=true`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasFlags(message);

        expect(result).toBe(true);
      });
    });

    describe(`when the given message contains a disabled flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon --disabled=true`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasFlags(message);

        expect(result).toBe(true);
      });
    });

    describe(`when the given message contains an help flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon --help`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasFlags(message);

        expect(result).toBe(true);
      });
    });
  });

  describe(`getFlags()`, (): void => {
    let message: string;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
    });

    describe(`when the given message does not contains a flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBeNull();
      });
    });

    describe(`when the given message contains one enabled flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon --enabled=true`;
      });

      it(`should return the flag`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBe(`--enabled=true`);
      });
    });

    describe(`when the given message contains one disabled flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon --disabled=true`;
      });

      it(`should return the flag`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBe(`--disabled=true`);
      });
    });

    describe(`when the given message contains one help flag`, (): void => {
      beforeEach((): void => {
        message = `!feature noon --help`;
      });

      it(`should return the flag`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBe(`--help`);
      });
    });

    describe(`when the given message contains multiple enabled flags`, (): void => {
      beforeEach((): void => {
        message = `message !feature Noon --enabled=true -e --enabled=false`;
      });

      it(`should return the flags`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBe(`--enabled=true -e --enabled=false`);
      });
    });

    describe(`when the given message contains multiple disabled flags`, (): void => {
      beforeEach((): void => {
        message = `message !feature Noon --disabled=true -d --disabled=false`;
      });

      it(`should return the flags`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBe(`--disabled=true -d --disabled=false`);
      });
    });

    describe(`when the given message contains multiple help flags`, (): void => {
      beforeEach((): void => {
        message = `message !feature Noon --help -h --help`;
      });

      it(`should return the flags`, (): void => {
        expect.assertions(1);

        const result = service.getFlags(message);

        expect(result).toBe(`--help -h --help`);
      });
    });
  });
});

interface IChannelMatrix {
  readonly channel: GuildBasedChannel | TextBasedChannel;
  readonly channelType: string;
}
