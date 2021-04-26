import { DiscordMessageTextService } from './discord-message-text.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { AppConfigService } from '../../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordMentionService } from '../../../mentions/services/discord-mention.service';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { ISonia } from '../../../users/types/sonia';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { IDiscordMessage } from '../../types/discord-message';
import { DiscordMessageCommandService } from '../command/discord-message-command.service';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { DiscordMessageAnyQuestionPineapplePizzaService } from '../responses/discord-message-any-question-pineapple-pizza.service';
import { DiscordMessageAuthorService } from '../responses/discord-message-author.service';
import { DiscordMessageHotelTrivagoService } from '../responses/discord-message-hotel-trivago.service';
import { DiscordMessagePingPongService } from '../responses/discord-message-ping-pong.service';
import { DiscordMessageSimpleBasicService } from '../responses/discord-message-simple-basic.service';
import { Message, PartialMessage } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageTextService`, (): void => {
  let service: DiscordMessageTextService;
  let coreEventService: CoreEventService;
  let discordAuthorService: DiscordAuthorService;
  let discordMentionService: DiscordMentionService;
  let discordSoniaService: DiscordSoniaService;
  let loggerService: LoggerService;
  let appConfigService: AppConfigService;
  let discordMessageContentService: DiscordMessageContentService;
  let discordMessageAuthorService: DiscordMessageAuthorService;
  let discordMessageCommandService: DiscordMessageCommandService;
  let discordMessagePingPongService: DiscordMessagePingPongService;
  let discordMessageHotelTrivagoService: DiscordMessageHotelTrivagoService;
  let discordMessageAnyQuestionPineapplePizzaService: DiscordMessageAnyQuestionPineapplePizzaService;
  let discordMessageSimpleBasicService: DiscordMessageSimpleBasicService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordAuthorService = DiscordAuthorService.getInstance();
    discordMentionService = DiscordMentionService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    loggerService = LoggerService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordMessageContentService = DiscordMessageContentService.getInstance();
    discordMessageAuthorService = DiscordMessageAuthorService.getInstance();
    discordMessageCommandService = DiscordMessageCommandService.getInstance();
    discordMessagePingPongService = DiscordMessagePingPongService.getInstance();
    discordMessageHotelTrivagoService = DiscordMessageHotelTrivagoService.getInstance();
    discordMessageAnyQuestionPineapplePizzaService = DiscordMessageAnyQuestionPineapplePizzaService.getInstance();
    discordMessageSimpleBasicService = DiscordMessageSimpleBasicService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageText service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageTextService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageTextService));
    });

    it(`should return the created DiscordMessageText service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageTextService.getInstance();

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

    it(`should notify the DiscordMessageText service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageTextService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_TEXT_SERVICE
      );
    });
  });

  describe(`getMessage()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordAuthorServiceIsValidSpy: jest.SpyInstance;
    let discordMentionServiceIsValidSpy: jest.SpyInstance;
    let getAnyDiscordMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageTextService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>();

      discordAuthorServiceIsValidSpy = jest.spyOn(discordAuthorService, `isValid`).mockImplementation();
      discordMentionServiceIsValidSpy = jest.spyOn(discordMentionService, `isValid`).mockImplementation();
      getAnyDiscordMessageResponseSpy = jest
        .spyOn(service, `getAnyDiscordMessageResponse`)
        .mockRejectedValue(new Error(`getAnyDiscordMessageResponse error`));
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

      it(`should check if the mentions inside the message are valid`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid mention`));

        expect(discordMentionServiceIsValidSpy).toHaveBeenCalledTimes(1);
        expect(discordMentionServiceIsValidSpy).toHaveBeenCalledWith(anyDiscordMessage.mentions);
      });

      describe(`when the mentions inside the message are not valid`, (): void => {
        beforeEach((): void => {
          discordMentionServiceIsValidSpy.mockReturnValue(false);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(new Error(`Invalid mention`));
        });
      });

      describe(`when the mentions inside the message are valid`, (): void => {
        beforeEach((): void => {
          discordMentionServiceIsValidSpy.mockReturnValue(true);
        });

        it(`should get a message response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getMessage(anyDiscordMessage)).rejects.toThrow(
            new Error(`getAnyDiscordMessageResponse error`)
          );

          expect(getAnyDiscordMessageResponseSpy).toHaveBeenCalledTimes(1);
          expect(getAnyDiscordMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
        });
      });
    });
  });

  describe(`getDiscordMessageResponse()`, (): void => {
    let discordMessage: IDiscordMessage;

    let discordMentionServiceIsForEveryoneSpy: jest.SpyInstance;
    let discordSoniaServiceGetSoniaSpy: jest.SpyInstance;
    let discordSoniaServiceIsValidSpy: jest.SpyInstance;
    let discordMentionServiceIsUserMentionedSpy: jest.SpyInstance;
    let getSoniaMentionMessageResponseSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let appConfigServiceIsProductionSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageTextService();
      discordMessage = createHydratedMock<IDiscordMessage>({
        id: `dummy-id`,
      });

      discordMentionServiceIsForEveryoneSpy = jest.spyOn(discordMentionService, `isForEveryone`).mockImplementation();
      discordSoniaServiceGetSoniaSpy = jest.spyOn(discordSoniaService, `getSonia`).mockReturnValue(null);
      discordSoniaServiceIsValidSpy = jest.spyOn(discordSoniaService, `isValid`).mockImplementation();
      discordMentionServiceIsUserMentionedSpy = jest
        .spyOn(discordMentionService, `isUserMentioned`)
        .mockImplementation();
      getSoniaMentionMessageResponseSpy = jest
        .spyOn(service, `getSoniaMentionMessageResponse`)
        .mockRejectedValue(new Error(`getSoniaMentionMessageResponse error`));
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      appConfigServiceIsProductionSpy = jest.spyOn(appConfigService, `isProduction`).mockImplementation();
    });

    it(`should check if the message is for everyone based on the mentions`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(new Error(`Invalid Sonia`));

      expect(discordMentionServiceIsForEveryoneSpy).toHaveBeenCalledTimes(1);
      expect(discordMentionServiceIsForEveryoneSpy).toHaveBeenCalledWith(discordMessage.mentions);
    });

    describe(`when the message is for everyone based on the mentions`, (): void => {
      beforeEach((): void => {
        discordMentionServiceIsForEveryoneSpy.mockReturnValue(true);
      });

      it(`should log about sending a message for an everyone mention`, async (): Promise<void> => {
        expect.assertions(3);

        const result = await service.getDiscordMessageResponse(discordMessage);

        expect(result).toBeDefined();
        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageTextService`,
          hasExtendedContext: true,
          message: `context-[dummy-id] text-everyone mention`,
        } as ILoggerLog);
      });

      it(`should get a message response not split`, async (): Promise<void> => {
        expect.assertions(1);

        const result = (await service.getDiscordMessageResponse(discordMessage)) as IDiscordMessageResponse;

        expect(result.options.split).toStrictEqual(false);
      });

      it(`should check if the app is in production`, async (): Promise<void> => {
        expect.assertions(3);

        const result = await service.getDiscordMessageResponse(discordMessage);

        expect(result).toBeDefined();
        expect(appConfigServiceIsProductionSpy).toHaveBeenCalledTimes(1);
        expect(appConfigServiceIsProductionSpy).toHaveBeenCalledWith();
      });

      describe(`when the app is in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(true);
        });

        it(`should get a message response responding to the all mention`, async (): Promise<void> => {
          expect.assertions(1);

          const result = (await service.getDiscordMessageResponse(discordMessage)) as IDiscordMessageResponse;

          expect(result.response).toStrictEqual(`Il est midi everyone!`);
        });
      });

      describe(`when the app is not in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(false);
        });

        it(`should get a message response responding to the all mention with a dev prefix`, async (): Promise<void> => {
          expect.assertions(1);

          const result = (await service.getDiscordMessageResponse(discordMessage)) as IDiscordMessageResponse;

          expect(result.response).toStrictEqual(`**[dev]** Il est midi everyone!`);
        });
      });
    });

    describe(`when the message is not for everyone based on the mentions`, (): void => {
      beforeEach((): void => {
        discordMentionServiceIsForEveryoneSpy.mockReturnValue(false);
      });

      it(`should get the Sonia Discord instance`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(new Error(`Invalid Sonia`));

        expect(discordSoniaServiceGetSoniaSpy).toHaveBeenCalledTimes(1);
        expect(discordSoniaServiceGetSoniaSpy).toHaveBeenCalledWith();
      });

      it(`should check if the Sonia Discord instance is valid`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(new Error(`Invalid Sonia`));

        expect(discordSoniaServiceIsValidSpy).toHaveBeenCalledTimes(1);
        expect(discordSoniaServiceIsValidSpy).toHaveBeenCalledWith(null);
      });

      describe(`when the Sonia Discord instance is not valid`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetSoniaSpy.mockReturnValue(null);
          discordSoniaServiceIsValidSpy.mockReturnValue(false);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(new Error(`Invalid Sonia`));
        });
      });

      describe(`when the Sonia Discord instance is valid`, (): void => {
        let sonia: ISonia;

        beforeEach((): void => {
          sonia = createHydratedMock<ISonia>();

          discordSoniaServiceGetSoniaSpy.mockReturnValue(sonia);
          discordSoniaServiceIsValidSpy.mockReturnValue(true);
        });

        it(`should check if Sonia is mentioned in the message`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(
            new Error(`Invalid user mention`)
          );

          expect(discordMentionServiceIsUserMentionedSpy).toHaveBeenCalledTimes(1);
          expect(discordMentionServiceIsUserMentionedSpy).toHaveBeenCalledWith(discordMessage.mentions, sonia);
        });

        describe(`when Sonia is not mentioned in the message`, (): void => {
          beforeEach((): void => {
            discordMentionServiceIsUserMentionedSpy.mockReturnValue(false);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(
              new Error(`Invalid user mention`)
            );
          });
        });

        describe(`when Sonia is mentioned in the message`, (): void => {
          beforeEach((): void => {
            discordMentionServiceIsUserMentionedSpy.mockReturnValue(true);
          });

          it(`should get a message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.getDiscordMessageResponse(discordMessage)).rejects.toThrow(
              new Error(`getSoniaMentionMessageResponse error`)
            );

            expect(getSoniaMentionMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(getSoniaMentionMessageResponseSpy).toHaveBeenCalledWith(discordMessage);
          });
        });
      });
    });
  });

  describe(`getAnyDiscordMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getDiscordMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageTextService();
      anyDiscordMessage = createHydratedMock<PartialMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getDiscordMessageResponseSpy = jest
        .spyOn(service, `getDiscordMessageResponse`)
        .mockRejectedValue(new Error(`getDiscordMessageResponse error`));
    });

    it(`should log about the fact that the message has a valid mention`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getAnyDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
        new Error(`Invalid Discord message`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageTextService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-message with valid mention`,
      } as ILoggerLog);
    });

    describe(`when the given message is a partial message`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<PartialMessage>();
      });

      it(`should throw an error about not being a valid message`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getAnyDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`Invalid Discord message`)
        );
      });

      it(`should not get a message response`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.getAnyDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`Invalid Discord message`)
        );

        expect(getDiscordMessageResponseSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given message is a message`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createInstance(Message.prototype);
      });

      it(`should not throw an error about not being a valid message`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getAnyDiscordMessageResponse(anyDiscordMessage)).rejects.not.toThrow(
          new Error(`Invalid Discord message`)
        );
      });

      it(`should get a message response`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getAnyDiscordMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`getDiscordMessageResponse error`)
        );

        expect(getDiscordMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getDiscordMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });
    });
  });

  describe(`getSoniaMentionMessageResponse()`, (): void => {
    let discordMessage: IDiscordMessage;

    let discordMessageContentServiceHasContentSpy: jest.SpyInstance;
    let discordMessageAuthorServiceReplySpy: jest.SpyInstance;
    let discordMessageCommandServiceHasCommandSpy: jest.SpyInstance;
    let discordMessageCommandServiceHandleCommandsSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordMessagePingPongServiceHasCriteriaSpy: jest.SpyInstance;
    let discordMessagePingPongServiceReplySpy: jest.SpyInstance;
    let discordMessageHotelTrivagoServiceHasCriteriaSpy: jest.SpyInstance;
    let discordMessageHotelTrivagoServiceReplySpy: jest.SpyInstance;
    let discordMessageAnyQuestionPineapplePizzaServiceHasCriteriaSpy: jest.SpyInstance;
    let discordMessageAnyQuestionPineapplePizzaServiceReplySpy: jest.SpyInstance;
    let discordMessageSimpleBasicServiceHasCriteriaSpy: jest.SpyInstance;
    let discordMessageSimpleBasicServiceReplySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageTextService();
      discordMessage = createHydratedMock<IDiscordMessage>({
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
      discordMessageHotelTrivagoServiceHasCriteriaSpy = jest
        .spyOn(discordMessageHotelTrivagoService, `hasCriteria`)
        .mockImplementation();
      discordMessageHotelTrivagoServiceReplySpy = jest
        .spyOn(discordMessageHotelTrivagoService, `reply`)
        .mockRejectedValue(new Error(`hotel trivago reply error`));
      discordMessageAnyQuestionPineapplePizzaServiceHasCriteriaSpy = jest
        .spyOn(discordMessageAnyQuestionPineapplePizzaService, `hasCriteria`)
        .mockImplementation();
      discordMessageAnyQuestionPineapplePizzaServiceReplySpy = jest
        .spyOn(discordMessageAnyQuestionPineapplePizzaService, `reply`)
        .mockRejectedValue(new Error(`any question pineapple pizza reply error`));
      discordMessageSimpleBasicServiceHasCriteriaSpy = jest
        .spyOn(discordMessageSimpleBasicService, `hasCriteria`)
        .mockImplementation();
      discordMessageSimpleBasicServiceReplySpy = jest
        .spyOn(discordMessageSimpleBasicService, `reply`)
        .mockRejectedValue(new Error(`simple basic reply error`));
    });

    it(`should log about the fact than Sonia was mentioned`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(new Error(`reply error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageTextService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-Sonia was mentioned`,
      } as ILoggerLog);
    });

    it(`should check if the given Discord message is empty`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(new Error(`reply error`));

      expect(discordMessageContentServiceHasContentSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageContentServiceHasContentSpy).toHaveBeenCalledWith(discordMessage.content);
    });

    describe(`when the given Discord message is empty`, (): void => {
      beforeEach((): void => {
        discordMessageContentServiceHasContentSpy.mockReturnValue(false);
      });

      it(`should respond with the default replay`, async (): Promise<void> => {
        expect.assertions(8);

        await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(new Error(`reply error`));

        expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledTimes(1);
        expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledWith(discordMessage);
        expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
        expect(discordMessagePingPongServiceReplySpy).not.toHaveBeenCalled();
        expect(discordMessageHotelTrivagoServiceReplySpy).not.toHaveBeenCalled();
        expect(discordMessageAnyQuestionPineapplePizzaServiceReplySpy).not.toHaveBeenCalled();
        expect(discordMessageSimpleBasicServiceReplySpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given Discord message is not empty`, (): void => {
      beforeEach((): void => {
        discordMessageContentServiceHasContentSpy.mockReturnValue(true);
      });

      it(`should check if the given Discord message contains a command`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(new Error(`reply error`));

        expect(discordMessageCommandServiceHasCommandSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageCommandServiceHasCommandSpy).toHaveBeenCalledWith(discordMessage.content);
      });

      describe(`when the given Discord message do not contains a command`, (): void => {
        beforeEach((): void => {
          discordMessageCommandServiceHasCommandSpy.mockReturnValue(false);
        });

        it(`should check if the given Discord message contains the criteria for a ping pong response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
            new Error(`reply error`)
          );

          expect(discordMessagePingPongServiceHasCriteriaSpy).toHaveBeenCalledTimes(1);
          expect(discordMessagePingPongServiceHasCriteriaSpy).toHaveBeenCalledWith(discordMessage.content);
        });

        describe(`when the given Discord message do not contains the criteria for a ping pong response`, (): void => {
          beforeEach((): void => {
            discordMessagePingPongServiceHasCriteriaSpy.mockReturnValue(false);
          });

          it(`should check if the given Discord message contains the criteria for a hotel trivago response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
              new Error(`reply error`)
            );

            expect(discordMessageHotelTrivagoServiceHasCriteriaSpy).toHaveBeenCalledTimes(1);
            expect(discordMessageHotelTrivagoServiceHasCriteriaSpy).toHaveBeenCalledWith(discordMessage.content);
          });

          describe(`when the given Discord message do not contains the criteria for a hotel trivago response`, (): void => {
            beforeEach((): void => {
              discordMessageHotelTrivagoServiceHasCriteriaSpy.mockReturnValue(false);
            });

            it(`should check if the given Discord message contains the criteria for an any question pineapple pizza response`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                new Error(`reply error`)
              );

              expect(discordMessageAnyQuestionPineapplePizzaServiceHasCriteriaSpy).toHaveBeenCalledTimes(1);
              expect(discordMessageAnyQuestionPineapplePizzaServiceHasCriteriaSpy).toHaveBeenCalledWith(
                discordMessage.content
              );
            });

            describe(`when the given Discord message do not contains the criteria for an any question pineapple pizza response`, (): void => {
              beforeEach((): void => {
                discordMessageAnyQuestionPineapplePizzaServiceHasCriteriaSpy.mockReturnValue(false);
              });

              it(`should check if the given Discord message contains the criteria for a simple basic response`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                  new Error(`reply error`)
                );

                expect(discordMessageSimpleBasicServiceHasCriteriaSpy).toHaveBeenCalledTimes(1);
                expect(discordMessageSimpleBasicServiceHasCriteriaSpy).toHaveBeenCalledWith(discordMessage.content);
              });

              describe(`when the given Discord message do not contains the criteria for a simple basic response`, (): void => {
                beforeEach((): void => {
                  discordMessageSimpleBasicServiceHasCriteriaSpy.mockReturnValue(false);
                });

                it(`should respond with the default replay`, async (): Promise<void> => {
                  expect.assertions(8);

                  await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                    new Error(`reply error`)
                  );

                  expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledTimes(1);
                  expect(discordMessageAuthorServiceReplySpy).toHaveBeenCalledWith(discordMessage);
                  expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
                  expect(discordMessagePingPongServiceReplySpy).not.toHaveBeenCalled();
                  expect(discordMessageHotelTrivagoServiceReplySpy).not.toHaveBeenCalled();
                  expect(discordMessageAnyQuestionPineapplePizzaServiceReplySpy).not.toHaveBeenCalled();
                  expect(discordMessageSimpleBasicServiceReplySpy).not.toHaveBeenCalled();
                });
              });

              describe(`when the given Discord message contains the criteria for a simple basic response`, (): void => {
                beforeEach((): void => {
                  discordMessageSimpleBasicServiceHasCriteriaSpy.mockReturnValue(true);
                });

                it(`should log about responding to any question`, async (): Promise<void> => {
                  expect.assertions(3);

                  await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                    new Error(`simple basic reply error`)
                  );

                  expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
                  expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                    context: `DiscordMessageTextService`,
                    hasExtendedContext: true,
                    message: `context-[dummy-id] text-message simple basic`,
                  } as ILoggerLog);
                });

                it(`should respond with simple or basic`, async (): Promise<void> => {
                  expect.assertions(5);

                  await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                    new Error(`simple basic reply error`)
                  );

                  expect(discordMessageSimpleBasicServiceReplySpy).toHaveBeenCalledTimes(1);
                  expect(discordMessageSimpleBasicServiceReplySpy).toHaveBeenCalledWith(discordMessage);
                  expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
                  expect(discordMessageAuthorServiceReplySpy).not.toHaveBeenCalled();
                });
              });
            });

            describe(`when the given Discord message contains the criteria for an any question pineapple pizza response`, (): void => {
              beforeEach((): void => {
                discordMessageAnyQuestionPineapplePizzaServiceHasCriteriaSpy.mockReturnValue(true);
              });

              it(`should log about responding to any question`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                  new Error(`any question pineapple pizza reply error`)
                );

                expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
                expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                  context: `DiscordMessageTextService`,
                  hasExtendedContext: true,
                  message: `context-[dummy-id] text-message any question pineapple pizza`,
                } as ILoggerLog);
              });

              it(`should respond with pineapple pizza`, async (): Promise<void> => {
                expect.assertions(5);

                await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                  new Error(`any question pineapple pizza reply error`)
                );

                expect(discordMessageAnyQuestionPineapplePizzaServiceReplySpy).toHaveBeenCalledTimes(1);
                expect(discordMessageAnyQuestionPineapplePizzaServiceReplySpy).toHaveBeenCalledWith(discordMessage);
                expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
                expect(discordMessageAuthorServiceReplySpy).not.toHaveBeenCalled();
              });
            });
          });

          describe(`when the given Discord message contains the criteria for a hotel trivago response`, (): void => {
            beforeEach((): void => {
              discordMessageHotelTrivagoServiceHasCriteriaSpy.mockReturnValue(true);
            });

            it(`should log about responding to hotel`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                new Error(`hotel trivago reply error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordMessageTextService`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-message hotel trivago`,
              } as ILoggerLog);
            });

            it(`should respond with hotel`, async (): Promise<void> => {
              expect.assertions(5);

              await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
                new Error(`hotel trivago reply error`)
              );

              expect(discordMessageHotelTrivagoServiceReplySpy).toHaveBeenCalledTimes(1);
              expect(discordMessageHotelTrivagoServiceReplySpy).toHaveBeenCalledWith(discordMessage);
              expect(discordMessageCommandServiceHandleCommandsSpy).not.toHaveBeenCalled();
              expect(discordMessageAuthorServiceReplySpy).not.toHaveBeenCalled();
            });
          });
        });

        describe(`when the given Discord message contains the criteria for a ping pong response`, (): void => {
          beforeEach((): void => {
            discordMessagePingPongServiceHasCriteriaSpy.mockReturnValue(true);
          });

          it(`should log about responding to ping`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
              new Error(`ping pong reply error`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
              context: `DiscordMessageTextService`,
              hasExtendedContext: true,
              message: `context-[dummy-id] text-message ping pong`,
            } as ILoggerLog);
          });

          it(`should respond with pong`, async (): Promise<void> => {
            expect.assertions(5);

            await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
              new Error(`ping pong reply error`)
            );

            expect(discordMessagePingPongServiceReplySpy).toHaveBeenCalledTimes(1);
            expect(discordMessagePingPongServiceReplySpy).toHaveBeenCalledWith(discordMessage);
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

          await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
            new Error(`handleCommands error`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordMessageTextService`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-message with command`,
          } as ILoggerLog);
        });

        it(`should respond with the appropriate message for the command`, async (): Promise<void> => {
          expect.assertions(8);

          await expect(service.getSoniaMentionMessageResponse(discordMessage)).rejects.toThrow(
            new Error(`handleCommands error`)
          );

          expect(discordMessageCommandServiceHandleCommandsSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageCommandServiceHandleCommandsSpy).toHaveBeenCalledWith(discordMessage);
          expect(discordMessagePingPongServiceReplySpy).not.toHaveBeenCalled();
          expect(discordMessageHotelTrivagoServiceReplySpy).not.toHaveBeenCalled();
          expect(discordMessageAnyQuestionPineapplePizzaServiceReplySpy).not.toHaveBeenCalled();
          expect(discordMessageSimpleBasicServiceReplySpy).not.toHaveBeenCalled();
          expect(discordMessageAuthorServiceReplySpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
