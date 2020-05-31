import * as NodeScheduleModule from "node-schedule";
import { Job } from "node-schedule";
import { Subject } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import * as GetRandomValueFromEnumModule from "../../../../functions/randoms/get-random-value-from-enum";
import * as GetEveryHourScheduleRuleModule from "../../../../functions/schedule/get-every-hour-schedule-rule";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import * as GetNextJobDateModule from "../../../schedules/functions/get-next-job-date";
import * as GetNextJobDateHumanizedModule from "../../../schedules/functions/get-next-job-date-humanized";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordSoniaEmotionalStateEnum } from "../enums/discord-sonia-emotional-state.enum";
import { DiscordSoniaEmotionalStateService } from "./discord-sonia-emotional-state.service";

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

      expect(service).toStrictEqual(
        expect.any(DiscordSoniaEmotionalStateService)
      );
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

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_EMOTIONAL_STATE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let isReady$: Subject<boolean>;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let setRandomEmotionalStateSpy: jest.SpyInstance;
    let startScheduleSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();
      isReady$ = new Subject<boolean>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `isReady$`)
        .mockReturnValue(isReady$.asObservable());
      setRandomEmotionalStateSpy = jest
        .spyOn(service, `setRandomEmotionalState`)
        .mockImplementation();
      startScheduleSpy = jest
        .spyOn(service, `startSchedule`)
        .mockImplementation();
    });

    it(`should check if the Discord client is ready`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord client is ready`, (): void => {
      it(`should set a random emotional state for Sonia`, (): void => {
        expect.assertions(2);

        service.init();
        isReady$.next(true);

        expect(setRandomEmotionalStateSpy).toHaveBeenCalledTimes(1);
        expect(setRandomEmotionalStateSpy).toHaveBeenCalledWith();
      });

      it(`should start the schedule`, (): void => {
        expect.assertions(2);

        service.init();
        isReady$.next(true);

        expect(startScheduleSpy).toHaveBeenCalledTimes(1);
        expect(startScheduleSpy).toHaveBeenCalledWith();
      });
    });

    describe(`when the Discord client is not ready`, (): void => {
      it(`should not set a random emotional state for Sonia`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(setRandomEmotionalStateSpy).not.toHaveBeenCalled();
      });

      it(`should not start the schedule`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(startScheduleSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Discord client ready state throw error`, (): void => {
      it(`should not set a random emotional state for Sonia`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.error(new Error(`error`));

        expect(setRandomEmotionalStateSpy).not.toHaveBeenCalled();
      });

      it(`should not start the schedule`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.error(new Error(`error`));

        expect(startScheduleSpy).not.toHaveBeenCalled();
      });
    });

    it(`should log about listening Discord client ready state`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordSoniaEmotionalStateService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });
  });

  describe(`startSchedule()`, (): void => {
    let job: Job;

    let scheduleJobSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let getEveryHourScheduleRuleSpy: jest.SpyInstance;
    let setRandomEmotionalStateSpy: jest.SpyInstance;

    beforeEach((): void => {
      getEveryHourScheduleRuleSpy = jest
        .spyOn(GetEveryHourScheduleRuleModule, `getEveryHourScheduleRule`)
        .mockReturnValue(`dummy-schedule`);
      service = new DiscordSoniaEmotionalStateService();
      job = createMock<Job>();

      scheduleJobSpy = jest
        .spyOn(NodeScheduleModule, `scheduleJob`)
        .mockReturnValue(job);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      jest
        .spyOn(GetNextJobDateHumanizedModule, `getNextJobDateHumanized`)
        .mockReturnValue(`dummy-next-job-date-humanized`);
      jest
        .spyOn(GetNextJobDateModule, `getNextJobDate`)
        .mockReturnValue(`dummy-next-job-date`);
      setRandomEmotionalStateSpy = jest
        .spyOn(service, `setRandomEmotionalState`)
        .mockImplementation();
    });

    it(`should create a schedule`, (): void => {
      expect.assertions(2);

      service.startSchedule();

      expect(getEveryHourScheduleRuleSpy).toHaveBeenCalledTimes(1);
      expect(getEveryHourScheduleRuleSpy).toHaveBeenCalledWith();
    });

    it(`should schedule and create a job`, (): void => {
      expect.assertions(2);

      service.startSchedule();

      expect(scheduleJobSpy).toHaveBeenCalledTimes(1);
      expect(scheduleJobSpy).toHaveBeenCalledWith(
        `dummy-schedule`,
        expect.any(Function)
      );
    });

    describe(`when the job is undefined`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockImplementation();
      });

      it(`should not log the next job date`, (): void => {
        expect.assertions(1);

        service.startSchedule();

        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the job is valid`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockReturnValue(job);
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });

    describe(`once the scheduled job is triggered`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockImplementation(
          (_rule: string, callback: () => void): Job => {
            callback();

            return job;
          }
        );
      });

      it(`should log about the triggered job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordSoniaEmotionalStateService`,
          message: `text-job triggered`,
        } as ILoggerLog);
      });

      it(`should set a new random emotional state for Sonia`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(setRandomEmotionalStateSpy).toHaveBeenCalledTimes(1);
        expect(setRandomEmotionalStateSpy).toHaveBeenCalledWith();
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
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

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should update the emotional state with the given one`, (): void => {
      expect.assertions(1);

      service.setEmotionalState(emotionalState);

      expect(service.getEmotionalState()).toStrictEqual(`annoyed`);
    });

    it(`should log about the update of the emotional state`, (): void => {
      expect.assertions(2);

      service.setEmotionalState(emotionalState);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
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

      getRandomEmotionalStateSpy = jest.spyOn(
        service,
        `getRandomEmotionalState`
      );
      setEmotionalStateSpy = jest.spyOn(service, `setEmotionalState`);
    });

    it(`should get a random emotional state`, (): void => {
      expect.assertions(2);

      service.setRandomEmotionalState();

      expect(getRandomEmotionalStateSpy).toHaveBeenCalledTimes(1);
      expect(getRandomEmotionalStateSpy).toHaveBeenCalledWith();
    });

    describe(`when a random emotional state was not found`, (): void => {
      beforeEach((): void => {
        getRandomEmotionalStateSpy.mockReturnValue(undefined);
      });

      it(`should not set the Discord presence activity`, (): void => {
        expect.assertions(1);

        service.setRandomEmotionalState();

        expect(setEmotionalStateSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when a random emotional state was found`, (): void => {
      beforeEach((): void => {
        getRandomEmotionalStateSpy.mockReturnValue(
          DiscordSoniaEmotionalStateEnum.COMFORTABLE
        );
      });

      it(`should update the emotional state with the random one`, (): void => {
        expect.assertions(1);

        service.setRandomEmotionalState();

        expect(service.getEmotionalState()).toStrictEqual(`comfortable`);
      });
    });
  });

  describe(`getEmotionalState()`, (): void => {
    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();
    });

    it(`should return the default emotional state`, (): void => {
      expect.assertions(1);

      const result = service.getEmotionalState();

      expect(result).toStrictEqual(`annoyed`);
    });

    describe(`when the emotional state was updated`, (): void => {
      beforeEach((): void => {
        service.setEmotionalState(DiscordSoniaEmotionalStateEnum.ANGRY);
      });

      it(`should return the updated emotional state`, (): void => {
        expect.assertions(1);

        const result = service.getEmotionalState();

        expect(result).toStrictEqual(`angry`);
      });
    });
  });

  describe(`getRandomEmotionalState()`, (): void => {
    let getRandomValueFromEnumSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordSoniaEmotionalStateService();

      getRandomValueFromEnumSpy = jest
        .spyOn(GetRandomValueFromEnumModule, `getRandomValueFromEnum`)
        .mockReturnValue(DiscordSoniaEmotionalStateEnum.COMFORTABLE);
    });

    it(`should get a random Sonia emotional state`, (): void => {
      expect.assertions(1);

      service.getRandomEmotionalState();

      expect(getRandomValueFromEnumSpy).toHaveBeenCalledTimes(1);
    });

    it(`should return the random Sonia emotional state`, (): void => {
      expect.assertions(1);

      const result = service.getRandomEmotionalState();

      expect(result).toStrictEqual(`comfortable`);
    });
  });
});
