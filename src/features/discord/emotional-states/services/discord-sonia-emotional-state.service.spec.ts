import { DiscordSoniaEmotionalStateService } from './discord-sonia-emotional-state.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import * as GetEveryHourScheduleRuleModule from '../../../../functions/schedule/get-every-hour-schedule-rule';
import * as GetRandomRangeMinuteScheduleRuleModule from '../../../../functions/schedule/get-random-range-minute-schedule-rule';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import * as GetNextJobDateModule from '../../../schedules/functions/get-next-job-date';
import * as GetNextJobDateHumanizedModule from '../../../schedules/functions/get-next-job-date-humanized';
import { DiscordClientService } from '../../services/discord-client.service';
import { DISCORD_EMOTIONAL_STATE_MESSAGES } from '../constants/discord-emotional-state-messages';
import { DiscordSoniaEmotionalStateEnum } from '../enums/discord-sonia-emotional-state.enum';
import * as NodeScheduleModule from 'node-schedule';
import { BehaviorSubject, noop } from 'rxjs';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);
jest.mock(`node-schedule`);

describe(`DiscordSoniaEmotionalStateService`, (): void => {
  let service: DiscordSoniaEmotionalStateService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordClientService: DiscordClientService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordSoniaEmotionalState service`, (): void => {
      expect.assertions(1);

      service = DiscordSoniaEmotionalStateService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordSoniaEmotionalStateService));
    });

    it(`should return the created DiscordSoniaEmotionalState service`, (): void => {
      expect.assertions(1);

      const result = DiscordSoniaEmotionalStateService.getInstance();

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

    it(`should notify the DiscordSoniaEmotionalState service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordSoniaEmotionalStateService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_EMOTIONAL_STATE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let isReady$: BehaviorSubject<boolean>;
    let emotionalState: DiscordSoniaEmotionalStateEnum;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let setRandomEmotionalStateSpy: jest.SpyInstance<Promise<DiscordSoniaEmotionalStateEnum>>;
    let startScheduleSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();
      emotionalState = DiscordSoniaEmotionalStateEnum.ANNOYED;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `isReady$`).mockReturnValue(isReady$);
      setRandomEmotionalStateSpy = jest.spyOn(service, `setRandomEmotionalState`).mockResolvedValue(emotionalState);
      startScheduleSpy = jest.spyOn(service, `startSchedule`).mockImplementation();
    });

    it(`should log about listening Discord client ready state`, async (): Promise<void> => {
      expect.assertions(2);
      isReady$ = new BehaviorSubject<boolean>(true);
      discordClientServiceGetClientSpy.mockReturnValue(isReady$);

      await service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledOnce();
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaEmotionalStateService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });

    it(`should check if the Discord client is ready`, async (): Promise<void> => {
      expect.assertions(2);
      isReady$ = new BehaviorSubject<boolean>(true);
      discordClientServiceGetClientSpy.mockReturnValue(isReady$);

      await service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledOnce();
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord client is ready`, (): void => {
      it(`should set a random emotional state for Sonia`, async (): Promise<void> => {
        expect.assertions(2);
        isReady$ = new BehaviorSubject<boolean>(true);
        discordClientServiceGetClientSpy.mockReturnValue(isReady$);

        await service.init();

        expect(setRandomEmotionalStateSpy).toHaveBeenCalledOnce();
        expect(setRandomEmotionalStateSpy).toHaveBeenCalledWith();
      });

      describe(`when the random emotional state for Sonia failed to be set`, (): void => {
        beforeEach((): void => {
          setRandomEmotionalStateSpy.mockRejectedValue(new Error(`setRandomEmotionalState error`));
        });

        it(`should not start the schedule`, async (): Promise<void> => {
          expect.assertions(2);
          isReady$ = new BehaviorSubject<boolean>(true);
          discordClientServiceGetClientSpy.mockReturnValue(isReady$);

          await expect(service.init()).rejects.toThrow(new Error(`setRandomEmotionalState error`));

          expect(startScheduleSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the random emotional state for Sonia was successfully set`, (): void => {
        beforeEach((): void => {
          setRandomEmotionalStateSpy.mockResolvedValue(emotionalState);
        });

        it(`should start the schedule`, async (): Promise<void> => {
          expect.assertions(2);
          isReady$ = new BehaviorSubject<boolean>(true);
          discordClientServiceGetClientSpy.mockReturnValue(isReady$);

          await service.init();

          expect(startScheduleSpy).toHaveBeenCalledOnce();
          expect(startScheduleSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`when the Discord client ready state throw error`, (): void => {
      it(`should not set a random emotional state for Sonia`, async (): Promise<void> => {
        expect.assertions(2);
        isReady$ = new BehaviorSubject<boolean>(true);
        isReady$.error(new Error(`error`));
        discordClientServiceGetClientSpy.mockReturnValue(isReady$);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(setRandomEmotionalStateSpy).not.toHaveBeenCalled();
      });

      it(`should not start the schedule`, async (): Promise<void> => {
        expect.assertions(2);
        isReady$ = new BehaviorSubject<boolean>(true);
        isReady$.error(new Error(`error`));
        discordClientServiceGetClientSpy.mockReturnValue(isReady$);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(startScheduleSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe(`startSchedule()`, (): void => {
    let job: NodeScheduleModule.Job;

    let scheduleJobSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let getEveryHourScheduleRuleSpy: jest.SpyInstance;
    let getRandomRangeMinuteScheduleRuleSpy: jest.SpyInstance;
    let setRandomEmotionalStateSpy: jest.SpyInstance;
    let jobRescheduleMock: jest.Mock;

    beforeEach((): void => {
      jobRescheduleMock = jest.fn();
      getEveryHourScheduleRuleSpy = jest
        .spyOn(GetEveryHourScheduleRuleModule, `getEveryHourScheduleRule`)
        .mockReturnValue(`dummy-updater-schedule`);
      getRandomRangeMinuteScheduleRuleSpy = jest
        .spyOn(GetRandomRangeMinuteScheduleRuleModule, `getRandomRangeMinuteScheduleRule`)
        .mockReturnValueOnce(`dummy-schedule`)
        .mockReturnValueOnce(`dummy-new-schedule`);
      service = new DiscordSoniaEmotionalStateService();
      job = createMock<NodeScheduleModule.Job>({
        reschedule: jobRescheduleMock,
      });

      scheduleJobSpy = jest.spyOn(NodeScheduleModule, `scheduleJob`).mockReturnValue(job);
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      jest
        .spyOn(GetNextJobDateHumanizedModule, `getNextJobDateHumanized`)
        .mockReturnValue(`dummy-next-job-date-humanized`);
      jest.spyOn(GetNextJobDateModule, `getNextJobDate`).mockReturnValue(`dummy-next-job-date`);
      setRandomEmotionalStateSpy = jest.spyOn(service, `setRandomEmotionalState`).mockImplementation();
    });

    it(`should create an updater schedule`, (): void => {
      expect.assertions(2);

      service.startSchedule();

      expect(getEveryHourScheduleRuleSpy).toHaveBeenCalledOnce();
      expect(getEveryHourScheduleRuleSpy).toHaveBeenCalledWith();
    });

    it(`should create a schedule`, (): void => {
      expect.assertions(2);

      service.startSchedule();

      expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenCalledOnce();
      expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenCalledWith(5, 30);
    });

    it(`should schedule and create an updater job and a job`, (): void => {
      expect.assertions(3);

      service.startSchedule();

      expect(scheduleJobSpy).toHaveBeenCalledTimes(2);
      expect(scheduleJobSpy).toHaveBeenNthCalledWith(1, `dummy-updater-schedule`, expect.any(Function));
      expect(scheduleJobSpy).toHaveBeenNthCalledWith(2, `dummy-schedule`, expect.any(Function));
    });

    describe(`when the updater job is undefined`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockImplementation();
      });

      it(`should not log the next updater job date`, (): void => {
        expect.assertions(1);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      });
    });

    describe(`when the updater job is valid`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockImplementation().mockReturnValueOnce(job);
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next updater job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-next updater job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });
    });

    describe(`once the scheduled updater job is triggered`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy
          .mockImplementation()
          .mockImplementationOnce((_rule: string, callback: () => void): NodeScheduleModule.Job => {
            callback();

            return job;
          });
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log about the triggered updater job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-updater job triggered`,
        } as ILoggerLog);
      });

      it(`should update the job rule to use a new random schedule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenCalledTimes(2);
        expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenNthCalledWith(2, 5, 30);
      });

      it(`should log about the new updated job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job rule updated to: value-dummy-new-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next updater job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(4, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-next updater job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });

      it(`should log the new job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(5, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job rule: value-dummy-new-schedule`,
        } as ILoggerLog);
      });

      describe(`when the job is not valid`, (): void => {
        beforeEach((): void => {
          scheduleJobSpy
            .mockImplementation()
            .mockImplementationOnce((_rule: string, callback: () => void): NodeScheduleModule.Job => {
              callback();

              return job;
            });
        });

        it(`should not reschedule the job with the new updated job rule`, (): void => {
          expect.assertions(1);

          service.startSchedule();

          expect(jobRescheduleMock).not.toHaveBeenCalled();
        });
      });

      describe(`when the job is valid`, (): void => {
        beforeEach((): void => {
          scheduleJobSpy.mockImplementation((_rule: string, callback: () => void): NodeScheduleModule.Job => {
            callback();

            return job;
          });
        });

        /**
         * @todo fix this test on error
         */
        it.skip(`should reschedule the job with the new updated job rule`, (): void => {
          expect.assertions(2);

          service.startSchedule();

          expect(jobRescheduleMock).toHaveBeenCalledOnce();
          expect(jobRescheduleMock).toHaveBeenCalledWith(`dummy-new-schedule`);
        });
      });
    });

    describe(`when the job is undefined`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockImplementation();
      });

      it(`should not log the next job date`, (): void => {
        expect.assertions(1);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      });
    });

    describe(`when the job is valid`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockReturnValue(job).mockImplementationOnce(noop);
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });

    describe(`once the scheduled job is triggered`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy
          .mockImplementation((_rule: string, callback: () => void): NodeScheduleModule.Job => {
            callback();

            return job;
          })
          .mockImplementationOnce(noop);
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log about the triggered job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job triggered`,
        } as ILoggerLog);
      });

      it(`should set a new random emotional state for Sonia`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(setRandomEmotionalStateSpy).toHaveBeenCalledOnce();
        expect(setRandomEmotionalStateSpy).toHaveBeenCalledWith();
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(4, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });
  });

  describe(`setEmotionalState()`, (): void => {
    let emotionalState: DiscordSoniaEmotionalStateEnum;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();
      emotionalState = DiscordSoniaEmotionalStateEnum.ANNOYED;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    it(`should replace the current emotional state with the given one`, (): void => {
      expect.assertions(1);

      service.setEmotionalState(emotionalState);

      expect(service.getEmotionalState()).toStrictEqual(DiscordSoniaEmotionalStateEnum.ANNOYED);
    });

    it(`should log about the update of the emotional state`, (): void => {
      expect.assertions(2);

      service.setEmotionalState(emotionalState);

      expect(loggerServiceDebugSpy).toHaveBeenCalledOnce();
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaEmotionalStateService`,
        message: `text-Sonia emotional state updated to: value-annoyed`,
      } as ILoggerLog);
    });
  });

  describe(`setRandomEmotionalState()`, (): void => {
    let getRandomEmotionalStateSpy: jest.SpyInstance;
    let setEmotionalStateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();

      getRandomEmotionalStateSpy = jest
        .spyOn(service, `getRandomEmotionalState`)
        .mockReturnValue(DiscordSoniaEmotionalStateEnum.AGITATED);
      setEmotionalStateSpy = jest.spyOn(service, `setEmotionalState`).mockImplementation();
    });

    it(`should get a random Discord Sonia emotional state`, async (): Promise<void> => {
      expect.assertions(2);

      await service.setRandomEmotionalState();

      expect(getRandomEmotionalStateSpy).toHaveBeenCalledOnce();
      expect(getRandomEmotionalStateSpy).toHaveBeenCalledWith();
    });

    it(`should set the Discord Sonia emotional state`, async (): Promise<void> => {
      expect.assertions(2);

      await service.setRandomEmotionalState();

      expect(setEmotionalStateSpy).toHaveBeenCalledOnce();
      expect(setEmotionalStateSpy).toHaveBeenCalledWith(DiscordSoniaEmotionalStateEnum.AGITATED);
    });

    it(`should return the Discord Sonia emotional state`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.setRandomEmotionalState();

      expect(result).toStrictEqual(DiscordSoniaEmotionalStateEnum.AGITATED);
    });
  });

  describe(`getEmotionalState()`, (): void => {
    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();
    });

    it(`should return the default emotional state`, (): void => {
      expect.assertions(1);

      const result = service.getEmotionalState();

      expect(result).toBe(`annoyed`);
    });

    describe(`when the emotional state was updated`, (): void => {
      beforeEach((): void => {
        service.setEmotionalState(DiscordSoniaEmotionalStateEnum.ANGRY);
      });

      it(`should return the updated emotional state`, (): void => {
        expect.assertions(1);

        const result = service.getEmotionalState();

        expect(result).toBe(`angry`);
      });
    });
  });

  describe(`getRandomEmotionalState()`, (): void => {
    let getRandomMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();

      getRandomMessageSpy = jest
        .spyOn(DISCORD_EMOTIONAL_STATE_MESSAGES, `getRandomMessage`)
        .mockReturnValue(DiscordSoniaEmotionalStateEnum.COMFORTABLE);
    });

    it(`should get a random Sonia emotional state`, (): void => {
      expect.assertions(1);

      service.getRandomEmotionalState();

      expect(getRandomMessageSpy).toHaveBeenCalledOnce();
    });

    it(`should return the random Sonia emotional state`, (): void => {
      expect.assertions(1);

      const result = service.getRandomEmotionalState();

      expect(result).toBe(`comfortable`);
    });
  });
});
