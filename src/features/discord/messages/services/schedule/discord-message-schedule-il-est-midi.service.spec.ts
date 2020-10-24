import { Client, Collection, Guild, Message } from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import * as NodeScheduleModule from "node-schedule";
import { Job } from "node-schedule";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import * as GetEveryHourScheduleRuleModule from "../../../../../functions/schedule/get-every-hour-schedule-rule";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { FirebaseGuildVersionEnum } from "../../../../firebase/enums/guilds/firebase-guild-version.enum";
import { IFirebaseGuildV3 } from "../../../../firebase/interfaces/guilds/firebase-guild-v3";
import { FirebaseGuildsService } from "../../../../firebase/services/guilds/firebase-guilds.service";
import { IFirebaseGuildChannelVFinal } from "../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final";
import { IFirebaseGuild } from "../../../../firebase/types/guilds/firebase-guild";
import { IFirebaseGuildVFinal } from "../../../../firebase/types/guilds/firebase-guild-v-final";
import { ILoggerLog } from "../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../logger/services/logger.service";
import * as GetNextJobDateModule from "../../../../schedules/functions/get-next-job-date";
import * as GetNextJobDateHumanizedModule from "../../../../schedules/functions/get-next-job-date-humanized";
import { DiscordGuildConfigService } from "../../../guilds/services/config/discord-guild-config.service";
import { DiscordClientService } from "../../../services/discord-client.service";
import { DiscordMessageScheduleNoonService } from "./discord-message-schedule-noon.service";

let time: number = new Date(`2020-01-02T02:00:00Z`).getTime();

jest.mock(`../../../../logger/services/chalk/chalk.service`);
jest.mock(`node-schedule`);
jest.mock(`moment-timezone`, (): any => (): any => {
  const moment = jest.requireActual(`moment-timezone`);

  moment.tz.setDefault(`Europe/Paris`);
  Date.now = (): number => time;

  return moment;
});

describe(`DiscordMessageScheduleNoonService`, (): void => {
  let service: DiscordMessageScheduleNoonService;
  let coreEventService: CoreEventService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;
  let discordClientService: DiscordClientService;
  let discordGuildConfigService: DiscordGuildConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    discordGuildConfigService = DiscordGuildConfigService.getInstance();
  });

  describe(`moment-timezone mock`, (): void => {
    it(`moment().tz() should return an object`, (): void => {
      expect.assertions(1);

      expect(moment().tz()).toBeObject();
    });

    it(`moment().tz().get() should return 3`, (): void => {
      expect.assertions(1);

      // @ts-ignore
      expect(moment().tz(`Europe/Paris`)?.get(`hour`)).toStrictEqual(3);
    });
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageScheduleNoon service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageScheduleNoonService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageScheduleNoonService)
      );
    });

    it(`should return the created DiscordMessageScheduleNoon service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageScheduleNoonService.getInstance();

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

    it(`should notify the DiscordMessageScheduleNoon service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageScheduleNoonService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let startScheduleSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonService();

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
      service = new DiscordMessageScheduleNoonService();
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
          context: `DiscordMessageScheduleNoonService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log the next job date`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordMessageScheduleNoonService`,
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
          context: `DiscordMessageScheduleNoonService`,
          message: `text-job rule: value-dummy-schedule`,
        } as ILoggerLog);
      });

      it(`should log about the triggered job`, (): void => {
        expect.assertions(2);

        service.startSchedule();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordMessageScheduleNoonService`,
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
          context: `DiscordMessageScheduleNoonService`,
          message: `text-next job: value-dummy-next-job-date-humanized hint-(dummy-next-job-date)`,
        } as ILoggerLog);
      });
    });
  });

  describe(`sendMessage()`, (): void => {
    let guild: Guild;
    let firebaseGuild: IFirebaseGuild | null | undefined;

    let firebaseGuildsServiceGetGuildSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let sendMessageByChannelSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonService();
      guild = createMock<Guild>({
        id: `dummy-guild-id`,
      });

      firebaseGuildsServiceGetGuildSpy = jest
        .spyOn(firebaseGuildsService, `getGuild`)
        .mockRejectedValue(new Error(`getGuild error`));
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      sendMessageByChannelSpy = jest
        .spyOn(service, `sendMessageByChannel`)
        .mockRejectedValue(new Error(`sendMessageByChannel error`));
    });

    it(`should log about fetching the Firebase guild`, async (): Promise<
      void
    > => {
      expect.assertions(3);

      await expect(service.sendMessage(guild)).rejects.toThrow(
        new Error(`getGuild error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageScheduleNoonService`,
        message: `text-fetching Firebase guild value-dummy-guild-id`,
      } as ILoggerLog);
    });

    it(`should get the Firebase guild`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendMessage(guild)).rejects.toThrow(
        new Error(`getGuild error`)
      );

      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledWith(
        `dummy-guild-id`
      );
    });

    describe(`when the Firebase guild was not successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceGetGuildSpy.mockRejectedValue(
          new Error(`getGuild error`)
        );
      });

      it(`should not send a message`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`getGuild error`)
        );

        expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase guild was successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseGuild = undefined;

        firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
      });

      it(`should log about the Firebase guild fetch`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`Invalid guild`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordMessageScheduleNoonService`,
          message: `text-Firebase guild value-dummy-guild-id fetched`,
        } as ILoggerLog);
      });

      describe(`when the Firebase guild data is undefined`, (): void => {
        beforeEach((): void => {
          firebaseGuild = undefined;

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`Invalid guild`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`Invalid guild`)
          );

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild data is null`, (): void => {
        beforeEach((): void => {
          firebaseGuild = null;

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`Invalid guild`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`Invalid guild`)
          );

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild data is a Firebase guild but not up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createMock<IFirebaseGuildV3>({
            version: FirebaseGuildVersionEnum.V3,
          });

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`Invalid guild`)
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`Invalid guild`)
          );

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild data is a Firebase guild up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createMock<IFirebaseGuildVFinal>({
            channels: {},
            version: FirebaseGuildVersionEnum.V4,
          });

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the valid Firebase guild`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await service.sendMessage(guild);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is valid`,
          } as ILoggerLog);
        });

        describe(`when the Firebase guild has no channel`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {},
              version: FirebaseGuildVersionEnum.V4,
            });

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          it(`should not send a message`, async (): Promise<void> => {
            expect.assertions(1);

            await service.sendMessage(guild);

            expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the Firebase guild has one channel`, (): void => {
          let channel: IFirebaseGuildChannelVFinal;

          beforeEach((): void => {
            channel = createMock<IFirebaseGuildChannelVFinal>({
              id: `one`,
            });
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {
                one: channel,
              },
              version: FirebaseGuildVersionEnum.V4,
            });

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          it(`should send a message for this channel`, async (): Promise<
            void
          > => {
            expect.assertions(2);

            await service.sendMessage(guild);

            expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(1);
            expect(sendMessageByChannelSpy).toHaveBeenCalledWith(
              channel,
              firebaseGuild,
              guild
            );
          });
        });

        describe(`when the Firebase guild has two channels`, (): void => {
          let channel1: IFirebaseGuildChannelVFinal;
          let channel2: IFirebaseGuildChannelVFinal;

          beforeEach((): void => {
            channel1 = createMock<IFirebaseGuildChannelVFinal>({
              id: `one`,
            });
            channel2 = createMock<IFirebaseGuildChannelVFinal>({
              id: `two`,
            });
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {
                one: channel1,
                two: channel2,
              },
              version: FirebaseGuildVersionEnum.V4,
            });

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          describe(`when the messages failed to be sent to the channels`, (): void => {
            beforeEach((): void => {
              sendMessageByChannelSpy.mockRejectedValue(
                new Error(`sendMessageByChannel error`)
              );
            });

            it(`should send a message for the two channels`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await service.sendMessage(guild);

              expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(2);
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(
                1,
                channel1,
                firebaseGuild,
                guild
              );
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(
                2,
                channel2,
                firebaseGuild,
                guild
              );
            });

            it(`should not throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.sendMessage(guild);

              expect(result).toStrictEqual([undefined, undefined]);
            });
          });

          describe(`when the messages were successfully sent to the channels`, (): void => {
            let message: Message;

            beforeEach((): void => {
              message = createMock<Message>();

              sendMessageByChannelSpy.mockResolvedValue(message);
            });

            it(`should send a message for the two channels`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await service.sendMessage(guild);

              expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(2);
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(
                1,
                channel1,
                firebaseGuild,
                guild
              );
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(
                2,
                channel2,
                firebaseGuild,
                guild
              );
            });

            it(`should not throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.sendMessage(guild);

              expect(result).toStrictEqual([message, message]);
            });
          });
        });
      });
    });
  });

  describe(`handleMessages()`, (): void => {
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let discordGuildConfigServiceShouldSendNoonMessageSpy: jest.SpyInstance;
    let sendMessageSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonService();

      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `getClient`)
        .mockReturnValue(
          createMock<Client>({
            guilds: {
              cache: {
                forEach: _.noop,
              } as Collection<string, Guild>,
            },
          })
        );
      discordGuildConfigServiceShouldSendNoonMessageSpy = jest
        .spyOn(discordGuildConfigService, `shouldSendNoonMessage`)
        .mockImplementation();
      sendMessageSpy = jest.spyOn(service, `sendMessage`).mockImplementation();
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    describe(`when the noon message is disabled`, (): void => {
      beforeEach((): void => {
        discordGuildConfigServiceShouldSendNoonMessageSpy.mockReturnValue(
          false
        );
      });

      it(`should log about the noon message being disabled`, (): void => {
        expect.assertions(2);

        service.handleMessages();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonService`,
          message: `text-noon message sending disabled`,
        } as ILoggerLog);
      });

      it(`should not get the Discord client`, (): void => {
        expect.assertions(1);

        service.handleMessages();

        expect(discordClientServiceGetClientSpy).not.toHaveBeenCalled();
      });

      it(`should not send a message`, (): void => {
        expect.assertions(1);

        service.handleMessages();

        expect(sendMessageSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the noon message is enabled`, (): void => {
      beforeEach((): void => {
        discordGuildConfigServiceShouldSendNoonMessageSpy.mockReturnValue(true);
      });

      describe(`when it is not noon in Paris timezone`, (): void => {
        beforeEach((): void => {
          time = new Date(`2020-01-02T07:00:00Z`).getTime();
        });

        it(`moment().tz().get() should return 8`, (): void => {
          expect.assertions(1);

          // @ts-ignore
          expect(moment().tz(`Europe/Paris`)?.get(`hour`)).toStrictEqual(8);
        });

        it(`should log about not being noon in Paris`, (): void => {
          expect.assertions(2);

          service.handleMessages();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `DiscordMessageScheduleNoonService`,
            message: `text-not noon in Paris`,
          } as ILoggerLog);
        });

        it(`should not get the Discord client`, (): void => {
          expect.assertions(1);

          service.handleMessages();

          expect(discordClientServiceGetClientSpy).not.toHaveBeenCalled();
        });

        it(`should not send a message`, (): void => {
          expect.assertions(1);

          service.handleMessages();

          expect(sendMessageSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when it is noon in Paris timezone`, (): void => {
        beforeEach((): void => {
          time = new Date(`2020-01-02T11:00:00Z`).getTime();
        });

        it(`moment().tz().get() should return 12`, (): void => {
          expect.assertions(1);

          // @ts-ignore
          expect(moment().tz(`Europe/Paris`)?.get(`hour`)).toStrictEqual(12);
        });

        it(`should get the Discord client`, (): void => {
          expect.assertions(2);

          service.handleMessages();

          expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
          expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
        });

        describe(`when there is no guild`, (): void => {
          beforeEach((): void => {
            discordClientServiceGetClientSpy = jest
              .spyOn(discordClientService, `getClient`)
              .mockReturnValue(
                createMock<Client>({
                  guilds: {
                    cache: {
                      forEach: _.noop,
                    } as Collection<string, Guild>,
                  },
                })
              );
          });

          it(`should not send a message`, (): void => {
            expect.assertions(1);

            service.handleMessages();

            expect(sendMessageSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when there is one guild`, (): void => {
          let guild: Guild;

          beforeEach((): void => {
            guild = createMock<Guild>();

            discordClientServiceGetClientSpy = jest
              .spyOn(discordClientService, `getClient`)
              .mockReturnValue(
                createMock<Client>({
                  guilds: {
                    cache: {
                      forEach: (callback): void =>
                        callback(guild, `key`, new Map()),
                    } as Collection<string, Guild>,
                  },
                })
              );
          });

          it(`should send a message for the guild`, (): void => {
            expect.assertions(2);

            service.handleMessages();

            expect(sendMessageSpy).toHaveBeenCalledTimes(1);
            expect(sendMessageSpy).toHaveBeenCalledWith(guild);
          });
        });

        describe(`when there is two guilds`, (): void => {
          let guild1: Guild;
          let guild2: Guild;

          beforeEach((): void => {
            guild1 = createMock<Guild>();
            guild2 = createMock<Guild>();

            discordClientServiceGetClientSpy = jest
              .spyOn(discordClientService, `getClient`)
              .mockReturnValue(
                createMock<Client>({
                  guilds: {
                    cache: {
                      forEach(callback): void {
                        callback(guild1, `key`, new Map());
                        callback(guild2, `key`, new Map());
                      },
                    } as Collection<string, Guild>,
                  },
                })
              );
          });

          it(`should send a message for the guild`, (): void => {
            expect.assertions(3);

            service.handleMessages();

            expect(sendMessageSpy).toHaveBeenCalledTimes(2);
            expect(sendMessageSpy).toHaveBeenNthCalledWith(1, guild1);
            expect(sendMessageSpy).toHaveBeenNthCalledWith(2, guild2);
          });
        });
      });
    });
  });
});
