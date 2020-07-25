import { Client, Presence, PresenceData } from "discord.js";
import _ from "lodash";
import * as NodeScheduleModule from "node-schedule";
import { Job } from "node-schedule";
import { Subject } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import * as GetEveryHourScheduleRuleModule from "../../../../functions/schedule/get-every-hour-schedule-rule";
import * as GetRandomRangeMinuteScheduleRuleModule from "../../../../functions/schedule/get-random-range-minute-schedule-rule";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import * as GetNextJobDateModule from "../../../schedules/functions/get-next-job-date";
import * as GetNextJobDateHumanizedModule from "../../../schedules/functions/get-next-job-date-humanized";
import { DiscordClientService } from "../../services/discord-client.service";
import { DISCORD_PRESENCE_ACTIVITY } from "../constants/discord-presence-activity";
import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DiscordActivitySoniaService } from "./discord-activity-sonia.service";

jest.mock(`../../../logger/services/chalk/chalk.service`);
jest.mock(`node-schedule`);

describe(`DiscordActivitySoniaService`, (): void => {
  let service: DiscordActivitySoniaService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordClientService: DiscordClientService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordActivitySonia service`, (): void => {
      expect.assertions(1);

      service = DiscordActivitySoniaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordActivitySoniaService));
    });

    it(`should return the created DiscordActivitySonia service`, (): void => {
      expect.assertions(1);

      const result = DiscordActivitySoniaService.getInstance();

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

    it(`should notify the DiscordActivitySonia service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordActivitySoniaService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let isReady$: Subject<boolean>;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let setRandomPresenceSpy: jest.SpyInstance;
    let startScheduleSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordActivitySoniaService();
      isReady$ = new Subject<boolean>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `isReady$`)
        .mockReturnValue(isReady$.asObservable());
      setRandomPresenceSpy = jest
        .spyOn(service, `setRandomPresence`)
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
      it(`should set a random presence for Sonia`, (): void => {
        expect.assertions(2);

        service.init();
        isReady$.next(true);

        expect(setRandomPresenceSpy).toHaveBeenCalledTimes(1);
        expect(setRandomPresenceSpy).toHaveBeenCalledWith();
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
      it(`should not set a random presence for Sonia`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(setRandomPresenceSpy).not.toHaveBeenCalled();
      });

      it(`should not start the schedule`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(startScheduleSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Discord client ready state throw error`, (): void => {
      it(`should not set a random presence for Sonia`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.error(new Error(`error`));

        expect(setRandomPresenceSpy).not.toHaveBeenCalled();
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
        context: `DiscordActivitySoniaService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });
  });

  describe(`startSchedule()`, (): void => {
    let job: Job;

    let scheduleJobSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let getEveryHourScheduleRuleSpy: jest.SpyInstance;
    let getRandomRangeMinuteScheduleRuleSpy: jest.SpyInstance;
    let setRandomPresenceSpy: jest.SpyInstance;
    let jobRescheduleMock: jest.Mock;

    beforeEach((): void => {
      jobRescheduleMock = jest.fn();
      getEveryHourScheduleRuleSpy = jest
        .spyOn(GetEveryHourScheduleRuleModule, `getEveryHourScheduleRule`)
        .mockReturnValue(`dummy-updater-schedule`);
      getRandomRangeMinuteScheduleRuleSpy = jest
        .spyOn(
          GetRandomRangeMinuteScheduleRuleModule,
          `getRandomRangeMinuteScheduleRule`
        )
        .mockReturnValueOnce(`dummy-schedule`)
        .mockReturnValueOnce(`dummy-new-schedule`);
      service = new DiscordActivitySoniaService();
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
      setRandomPresenceSpy = jest
        .spyOn(service, `setRandomPresence`)
        .mockImplementation();
    });

    it(`should create an updater schedule`, (): void => {
      expect.assertions(2);

      service.startSchedule();

      expect(getEveryHourScheduleRuleSpy).toHaveBeenCalledTimes(1);
      expect(getEveryHourScheduleRuleSpy).toHaveBeenCalledWith();
    });

    it(`should create a schedule`, (): void => {
      expect.assertions(2);

      service.startSchedule();

      expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenCalledTimes(1);
      expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenCalledWith(5, 15);
    });

    it(`should schedule and create an updater job and a job`, (): void => {
      expect.assertions(3);

      service.startSchedule();

      expect(scheduleJobSpy).toHaveBeenCalledTimes(2);
      expect(scheduleJobSpy).toHaveBeenNthCalledWith(
        1,
        `dummy-updater-schedule`,
        expect.any(Function)
      );
      expect(scheduleJobSpy).toHaveBeenNthCalledWith(
        2,
        `dummy-schedule`,
        expect.any(Function)
      );
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
          context: `DiscordActivitySoniaService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next updater job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordActivitySoniaService`,
          message: `text-next updater job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordActivitySoniaService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });
    });

    describe(`once the scheduled updater job is triggered`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy.mockImplementation().mockImplementationOnce(
          (_rule: string, callback: () => void): Job => {
            callback();

            return job;
          }
        );
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordActivitySoniaService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log about the triggered updater job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordActivitySoniaService`,
          message: `text-updater job triggered`,
        } as ILoggerLog);
      });

      it(`should update the job rule to use a new random schedule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenCalledTimes(2);
        expect(getRandomRangeMinuteScheduleRuleSpy).toHaveBeenNthCalledWith(
          2,
          5,
          15
        );
      });

      it(`should log about the new updated job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordActivitySoniaService`,
          message: `text-job rule updated to: value-dummy-new-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next updater job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(4, {
          context: `DiscordActivitySoniaService`,
          message: `text-next updater job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });

      it(`should log the new job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(5, {
          context: `DiscordActivitySoniaService`,
          message: `text-job rule: value-dummy-new-schedule`,
        } as ILoggerLog);
      });

      describe(`when the job is not valid`, (): void => {
        beforeEach((): void => {
          scheduleJobSpy.mockImplementation().mockImplementationOnce(
            (_rule: string, callback: () => void): Job => {
              callback();

              return job;
            }
          );
        });

        it(`should not reschedule the job with the new updated job rule`, (): void => {
          expect.assertions(1);

          service.startSchedule();

          expect(jobRescheduleMock).not.toHaveBeenCalled();
        });
      });

      describe(`when the job is valid`, (): void => {
        beforeEach((): void => {
          scheduleJobSpy.mockImplementation(
            (_rule: string, callback: () => void): Job => {
              callback();

              return job;
            }
          );
        });

        /**
         * @todo fix this test on error
         */
        it.skip(`should reschedule the job with the new updated job rule`, (): void => {
          expect.assertions(2);

          service.startSchedule();

          expect(jobRescheduleMock).toHaveBeenCalledTimes(1);
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
        scheduleJobSpy.mockReturnValue(job).mockImplementationOnce(_.noop);
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordActivitySoniaService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordActivitySoniaService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordActivitySoniaService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });

    describe(`once the scheduled job is triggered`, (): void => {
      beforeEach((): void => {
        scheduleJobSpy
          .mockImplementation(
            (_rule: string, callback: () => void): Job => {
              callback();

              return job;
            }
          )
          .mockImplementationOnce(_.noop);
      });

      it(`should log the updater job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordActivitySoniaService`,
          message: `text-updater job rule: value-dummy-updater-schedule`,
        } as ILoggerLog);
      });

      it(`should log the job rule`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordActivitySoniaService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log about the triggered job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordActivitySoniaService`,
          message: `text-job triggered`,
        } as ILoggerLog);
      });

      it(`should set a new random presence for Sonia`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(setRandomPresenceSpy).toHaveBeenCalledTimes(1);
        expect(setRandomPresenceSpy).toHaveBeenCalledWith();
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(4, {
          context: `DiscordActivitySoniaService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });
  });

  describe(`setPresence()`, (): void => {
    let presence: Presence;
    let setPresenceMock: jest.Mock;
    let presenceActivity: IDiscordPresenceActivity;
    let client: Client;

    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordActivitySoniaService();
      presence = createMock<Presence>({
        activities: [
          {
            name: DiscordActivityNameEnum.APOLLO,
            type: `PLAYING`,
            url: `dummy-url`,
          },
        ],
      });
      setPresenceMock = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(`setPresence: error`)));
      presenceActivity = {
        name: DiscordActivityNameEnum.APOLLO,
        type: `PLAYING`,
        url: `dummy-url`,
      };
      client = createMock<Client>({
        user: {
          setPresence: setPresenceMock,
        },
      });

      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `getClient`)
        .mockReturnValue(client);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should get the Discord client`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.setPresence(presenceActivity)).rejects.toThrow(
        new Error(`setPresence: error`)
      );

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(2);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord client user is null`, (): void => {
      beforeEach((): void => {
        client.user = null;
      });

      it(`should not set the presence`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.setPresence(presenceActivity)).rejects.toThrow(
          new Error(`Client user is not valid`)
        );

        expect(setPresenceMock).not.toHaveBeenCalled();
      });

      it(`should not log about the update of the presence`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(service.setPresence(presenceActivity)).rejects.toThrow(
          new Error(`Client user is not valid`)
        );

        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Discord client user is valid`, (): void => {
      it(`should set the presence`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.setPresence(presenceActivity)).rejects.toThrow(
          new Error(`setPresence: error`)
        );

        expect(setPresenceMock).toHaveBeenCalledTimes(1);
        expect(setPresenceMock).toHaveBeenCalledWith({
          activity: {
            name: DiscordActivityNameEnum.APOLLO,
            type: `PLAYING`,
            url: `dummy-url`,
          },
          afk: false,
          status: `online`,
        } as PresenceData);
      });

      describe(`when the presence was not successfully set`, (): void => {
        it(`should not log about the update of the presence`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.setPresence(presenceActivity)).rejects.toThrow(
            new Error(`setPresence: error`)
          );

          expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the presence was successfully set`, (): void => {
        beforeEach((): void => {
          setPresenceMock.mockReturnValue(Promise.resolve(presence));
        });

        it(`should log about the update of the presence`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await service.setPresence(presenceActivity);

          expect(result).toStrictEqual(presence);
          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `DiscordActivitySoniaService`,
            message: `text-Sonia presence updated to: value-PLAYING text-x value-Apollo`,
          } as ILoggerLog);
        });
      });
    });
  });

  describe(`setRandomPresence()`, (): void => {
    let sampleSpy: jest.SpyInstance;
    let setPresenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordActivitySoniaService();

      sampleSpy = jest.spyOn(_, `sample`);
      setPresenceSpy = jest.spyOn(service, `setPresence`);
    });

    it(`should get a random Discord presence activity`, (): void => {
      expect.assertions(2);

      service.setRandomPresence();

      expect(sampleSpy).toHaveBeenCalledTimes(1);
      expect(sampleSpy).toHaveBeenCalledWith(DISCORD_PRESENCE_ACTIVITY);
    });

    describe(`when no Discord presence activity was found`, (): void => {
      beforeEach((): void => {
        sampleSpy.mockReturnValue(undefined);
      });

      it(`should not set the Discord presence activity`, (): void => {
        expect.assertions(1);

        service.setRandomPresence();

        expect(setPresenceSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when a Discord presence activity was found`, (): void => {
      beforeEach((): void => {
        sampleSpy.mockReturnValue(DISCORD_PRESENCE_ACTIVITY[0]);
      });

      it(`should set the Discord presence activity`, (): void => {
        expect.assertions(2);

        service.setRandomPresence();

        expect(setPresenceSpy).toHaveBeenCalledTimes(1);
        expect(setPresenceSpy).toHaveBeenCalledWith(
          DISCORD_PRESENCE_ACTIVITY[0]
        );
      });
    });
  });
});
