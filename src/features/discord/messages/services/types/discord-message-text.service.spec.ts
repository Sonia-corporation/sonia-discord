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
import { Message, PartialMessage } from 'discord.js';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageTextService`, (): void => {
  let service: DiscordMessageTextService;
  let coreEventService: CoreEventService;
  let discordAuthorService: DiscordAuthorService;
  let discordMentionService: DiscordMentionService;
  let discordSoniaService: DiscordSoniaService;
  let loggerService: LoggerService;
  let appConfigService: AppConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordAuthorService = DiscordAuthorService.getInstance();
    discordMentionService = DiscordMentionService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    loggerService = LoggerService.getInstance();
    appConfigService = AppConfigService.getInstance();
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
      anyDiscordMessage = createMock<IAnyDiscordMessage>();

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
      discordMessage = createMock<IDiscordMessage>({
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
          sonia = createMock<ISonia>();

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
      anyDiscordMessage = createMock<PartialMessage>({
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
        anyDiscordMessage = createMock<PartialMessage>();
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
});
