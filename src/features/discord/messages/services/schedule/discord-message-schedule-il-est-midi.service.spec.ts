import { Guild } from "discord.js";
import * as NodeScheduleModule from "node-schedule";
import { Job } from "node-schedule";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import * as GetEveryHourScheduleRuleModule from "../../../../../functions/schedule/get-every-hour-schedule-rule";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { FirebaseGuildsService } from "../../../../firebase/services/guilds/firebase-guilds.service";
import { ILoggerLog } from "../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../logger/services/logger.service";
import * as GetNextJobDateModule from "../../../../schedules/functions/get-next-job-date";
import * as GetNextJobDateHumanizedModule from "../../../../schedules/functions/get-next-job-date-humanized";
import { DiscordMessageScheduleIlEstMidiService } from "./discord-message-schedule-il-est-midi.service";

jest.mock(`../../../../logger/services/chalk/chalk.service`);
jest.mock(`node-schedule`);

describe(`DiscordMessageScheduleIlEstMidiService`, (): void => {
  let service: DiscordMessageScheduleIlEstMidiService;
  let coreEventService: CoreEventService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageScheduleIlEstMidi service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageScheduleIlEstMidiService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageScheduleIlEstMidiService)
      );
    });

    it(`should return the created DiscordMessageScheduleIlEstMidi service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageScheduleIlEstMidiService.getInstance();

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

    it(`should notify the DiscordMessageScheduleIlEstMidi service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageScheduleIlEstMidiService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_IL_EST_MIDI_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let startScheduleSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleIlEstMidiService();

      startScheduleSpy = jest
        .spyOn(service, `startSchedule`)
        .mockImplementation();
    });

    it(`should start the schedule`, (): void => {
      expect.assertions(2);

      service.init();

      expect(startScheduleSpy).toHaveBeenCalledTimes(1);
      expect(startScheduleSpy).toHaveBeenCalledWith();
    });
  });

  describe(`startSchedule()`, (): void => {
    let job: Job;

    let scheduleJobSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let getEveryHourScheduleRuleSpy: jest.SpyInstance;
    let handleMessagesSpy: jest.SpyInstance;
    let jobRescheduleMock: jest.Mock;

    beforeEach((): void => {
      jobRescheduleMock = jest.fn();
      getEveryHourScheduleRuleSpy = jest
        .spyOn(GetEveryHourScheduleRuleModule, `getEveryHourScheduleRule`)
        .mockReturnValue(`dummy-schedule`);
      service = new DiscordMessageScheduleIlEstMidiService();
      job = createMock<Job>({
        reschedule: jobRescheduleMock,
      });

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
      handleMessagesSpy = jest
        .spyOn(service, `handleMessages`)
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

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when the job is valid`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockReturnValue(job);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordMessageScheduleIlEstMidiService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordMessageScheduleIlEstMidiService`,
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

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordMessageScheduleIlEstMidiService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log about the triggered job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordMessageScheduleIlEstMidiService`,
          message: `text-job triggered`,
        } as ILoggerLog);
      });

      it(`should handle the messages`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(handleMessagesSpy).toHaveBeenCalledTimes(1);
        expect(handleMessagesSpy).toHaveBeenCalledWith();
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordMessageScheduleIlEstMidiService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });
  });

  describe(`sendMessage()`, (): void => {
    let guild: Guild;

    let firebaseGuildsServiceGetGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleIlEstMidiService();
      guild = createMock<Guild>({
        id: `dummy-guild-id`,
      });

      firebaseGuildsServiceGetGuildSpy = jest
        .spyOn(firebaseGuildsService, `getGuild`)
        .mockRejectedValue(new Error(`getGuild error`));
    });

    it(`should start the schedule`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendMessage(guild)).rejects.toThrow(
        new Error(`getGuild error`)
      );

      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledWith(
        `dummy-guild-id`
      );
    });
  });
});
