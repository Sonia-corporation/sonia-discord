import { DiscordMessageDmService } from './discord-message-dm.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageCommandService } from '../command/discord-message-command.service';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { DiscordMessageAuthorService } from '../responses/discord-message-author.service';
import { DiscordMessagePingPongService } from '../responses/discord-message-ping-pong.service';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageDmService`, (): void => {
  let service: DiscordMessageDmService;
  let coreEventService: CoreEventService;
  let discordAuthorService: DiscordAuthorService;
  let discordMessageContentService: DiscordMessageContentService;
  let discordMessageAuthorService: DiscordMessageAuthorService;
  let discordMessageCommandService: DiscordMessageCommandService;
  let loggerService: LoggerService;
  let discordMessagePingPongService: DiscordMessagePingPongService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordAuthorService = DiscordAuthorService.getInstance();
    discordMessageContentService = DiscordMessageContentService.getInstance();
    discordMessageAuthorService = DiscordMessageAuthorService.getInstance();
    discordMessageCommandService = DiscordMessageCommandService.getInstance();
    loggerService = LoggerService.getInstance();
    discordMessagePingPongService = DiscordMessagePingPongService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageDmService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageDmService));
    });

    it(`should return the created DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageDmService.getInstance();

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

    it(`should notify the DiscordMessageDm service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageDmService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_MESSAGE_DM_SERVICE);
    });
  });

  describe(`getMessage()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordAuthorServiceIsValidSpy: jest.SpyInstance;
    let getDiscordMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageDmService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        author: {
          id: `dummy-author-id`,
        },
      });

      discordAuthorServiceIsValidSpy = jest.spyOn(discordAuthorService, `isValid`).mockImplementation();
      getDiscordMessageResponseSpy = jest
        .spyOn(service, `getDiscordMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
    });

    it(`should check if the author of the message is valid`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid author`));

      expect(discordAuthorServiceIsValidSpy).toHaveBeenCalledTimes(1);
      expect(discordAuthorServiceIsValidSpy).toHaveBeenCalledWith(anyDiscordMessage.author);
    });

    describe(`when the author of the message is not valid`, (): void => {
      beforeEach((): void => {
        discordAuthorServiceIsValidSpy.mockReturnValue(false);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid author`));
      });
    });

    describe(`when the author of the message is valid`, (): void => {
      beforeEach((): void => {
        discordAuthorServiceIsValidSpy.mockReturnValue(true);
      });

      it(`should get a Discord message response`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));

        expect(getDiscordMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getDiscordMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });
    });
  });

  describe(`getDiscordMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageContentServiceHasContentSpy: jest.SpyInstance;
    let discordMessageAuthorServiceReplySpy: jest.SpyInstance;
    let discordMessageCommandServiceHasCommandSpy: jest.SpyInstance;
    let discordMessageCommandServiceHandleCommandsSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordMessagePingPongServiceHasCriteriaSpy: jest.SpyInstance;
    let discordMessagePingPongServiceReplySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageDmService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        content: `dummy-content`,
        id: `dummy-id`,
      });

      discordMessageContentServiceHasContentSpy = jest
        .spyOn(discordMessageContentService, `hasContent`)
        .mockImplementation();
      discordMessageAuthorServiceReplySpy = jest
        .spyOn(discordMessageAuthorService, `reply`)
        .mockRejectedValue(new Error(`reply error`));
      discordMessageCommandServiceHasCommandSpy = jest
        .spyOn(discordMessageCommandService, `hasCommand`)
        .mockImplementation();
      discordMessageCommandServiceHandleCommandsSpy = jest
        .spyOn(discordMessageCommandService, `handleCommands`)
        .mockRejectedValue(new Error(`handleCommands error`));
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordMessagePingPongServiceHasCriteriaSpy = jest
        .spyOn(discordMessagePingPongService, `hasCriteria`)
        .mockImplementation();
      discordMessagePingPongServiceReplySpy = jest
        .spyOn(discordMessagePingPongService, `reply`)
        .mockRejectedValue(new Error(`ping pong reply error`));
    });

    it(`should check if the given Discord message is empty`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(new Error(`reply error`));

      expect(discordMessageContentServiceHasContentSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageContentServiceHasContentSpy).toHaveBeenCalledWith(anyDiscordMessage.content);
    });

    describe(`when the given Discord message is empty`, (): void => {
      beforeEach((): void => {
        discordMessageContentServiceHasContentSpy.mockReturnValue(false);
      });

      it(`should respond with the default replay`, async (): Promise<void> => {
        expect.assertions(5);

        await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(new Error(`reply error`));

        expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledTimes(1);
        expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledWith(anyDiscordMessage);
        expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
        expect(discordMessagePingPongServiceReplySpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given Discord message is not empty`, (): void => {
      beforeEach((): void => {
        discordMessageContentServiceHasContentSpy.mockReturnValue(true);
      });

      it(`should check if the given Discord message contains a command`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(new Error(`reply error`));

        expect(discordMessageCommandServiceHasCommandSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageCommandServiceHasCommandSpy).toHaveBeenCalledWith(anyDiscordMessage.content);
      });

      describe(`when the given Discord message do not contains a command`, (): void => {
        beforeEach((): void => {
          discordMessageCommandServiceHasCommandSpy.mockReturnValue(false);
        });

        it(`should check if the given Discord message contains the criteria for a ping pong response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(new Error(`reply error`));

          expect(discordMessagePingPongServiceHasCriteriaSpy).toHaveBeenCalledTimes(1);
          expect(discordMessagePingPongServiceHasCriteriaSpy).toHaveBeenCalledWith(anyDiscordMessage.content);
        });

        describe(`when the given Discord message do not contains the criteria for a ping pong response`, (): void => {
          beforeEach((): void => {
            discordMessagePingPongServiceHasCriteriaSpy.mockReturnValue(false);
          });

          it(`should respond with the default replay`, async (): Promise<void> => {
            expect.assertions(5);

            await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`reply error`)
            );

            expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledTimes(1);
            expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledWith(anyDiscordMessage);
            expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
            expect(discordMessagePingPongServiceReplySpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the given Discord message contains the criteria for a ping pong response`, (): void => {
          beforeEach((): void => {
            discordMessagePingPongServiceHasCriteriaSpy.mockReturnValue(true);
          });

          it(`should log about responding to ping`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`ping pong reply error`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordMessageDmService`,
              hasExtendedContext: true,
              message: `context-[dummy-id] text-message ping pong`,
            } as ILoggerLog);
          });

          it(`should respond with pong`, async (): Promise<void> => {
            expect.assertions(5);

            await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`ping pong reply error`)
            );

            expect(discordMessagePingPongServiceReplySpy).toHaveBeenCalledTimes(1);
            expect(discordMessagePingPongServiceReplySpy).toHaveBeenCalledWith(anyDiscordMessage);
            expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
            expect(discordMessageAuthorServiceReplySpy).not.toHaveBeenCalled();
          });
        });
      });

      describe(`when the given Discord message contains a command`, (): void => {
        beforeEach((): void => {
          discordMessageCommandServiceHasCommandSpy.mockReturnValue(true);
        });

        it(`should log about handling the commands`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`handleCommands error`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `DiscordMessageDmService`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-message with command`,
          } as ILoggerLog);
        });

        it(`should respond with the appropriate message for the command`, async (): Promise<void> => {
          expect.assertions(5);

          await expect(service.getDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`handleCommands error`)
          );

          expect(discordMessageCommandServiceHandleCommandsSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageCommandServiceHandleCommandsSpy).toHaveBeenCalledWith(anyDiscordMessage);
          expect(discordMessagePingPongServiceReplySpy).not.toHaveBeenCalled();
          expect(discordMessageAuthorServiceReplySpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
