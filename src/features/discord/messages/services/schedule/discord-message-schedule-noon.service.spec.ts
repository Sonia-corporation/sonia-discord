import { DiscordMessageScheduleNoonCountService } from './discord-message-schedule-noon-count.service';
import { DiscordMessageScheduleNoonService } from './discord-message-schedule-noon.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import * as GetEveryHourScheduleRuleModule from '../../../../../functions/schedule/get-every-hour-schedule-rule';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../../../firebase/enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../firebase/enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../../../firebase/enums/guilds/channels/firebase-guild-channel-version.enum';
import { FirebaseGuildVersionEnum } from '../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV3 } from '../../../../firebase/interfaces/guilds/firebase-guild-v3';
import { FirebaseGuildsChannelsFeaturesNoonEnabledStateService } from '../../../../firebase/services/guilds/channels/features/noon/firebase-guilds-channels-features-noon-enabled-state.service';
import { FirebaseGuildsService } from '../../../../firebase/services/guilds/firebase-guilds.service';
import { IFirebaseGuildChannelVFinal } from '../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuildChannel } from '../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildVFinal } from '../../../../firebase/types/guilds/firebase-guild-v-final';
import { IFirebaseGuild } from '../../../../firebase/types/guilds/firebase-guild';
import { ILoggerLog } from '../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../logger/services/logger.service';
import * as GetNextJobDateHumanizedModule from '../../../../schedules/functions/get-next-job-date-humanized';
import * as GetNextJobDateModule from '../../../../schedules/functions/get-next-job-date';
import { IDiscordGuildSoniaSendMessageToChannel } from '../../../guilds/interfaces/discord-guild-sonia-send-message-to-channel';
import { DiscordGuildConfigService } from '../../../guilds/services/config/discord-guild-config.service';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { DiscordLoggerErrorService } from '../../../logger/services/discord-logger-error.service';
import { DiscordClientService } from '../../../services/discord-client.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { Client, Collection, Guild, GuildChannel, Message, TextChannel } from 'discord.js';
import moment from 'moment-timezone';
import * as NodeScheduleModule from 'node-schedule';
import { noop } from 'rxjs';
import { createHydratedMock } from 'ts-auto-mock';

let time: number = new Date(`2020-01-02T02:00:00Z`).getTime();

jest.mock(`../../../../logger/services/chalk/chalk.service`);
jest.mock(`node-schedule`);
jest.mock(`moment-timezone`, (): any => (): any => {
  const moment = jest.requireActual(`moment-timezone`);

  moment.tz.setDefault(`Europe/Paris`);
  moment.toDate = (): Date => new Date();
  moment.format = (): string => `dummy-formatted-date`;
  moment.toISOString = (): string => `dummy-iso-string-date`;
  moment.fromNow = (): string => `dummy-from-now-date`;
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
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordLoggerErrorService: DiscordLoggerErrorService;
  let firebaseGuildsChannelsFeaturesNoonEnabledStateService: FirebaseGuildsChannelsFeaturesNoonEnabledStateService;
  let discordMessageScheduleNoonCountService: DiscordMessageScheduleNoonCountService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    discordGuildConfigService = DiscordGuildConfigService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
    firebaseGuildsChannelsFeaturesNoonEnabledStateService = FirebaseGuildsChannelsFeaturesNoonEnabledStateService.getInstance();
    discordMessageScheduleNoonCountService = DiscordMessageScheduleNoonCountService.getInstance();
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

      expect(service).toStrictEqual(expect.any(DiscordMessageScheduleNoonService));
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

      startScheduleSpy = jest.spyOn(service, `startSchedule`).mockImplementation();
    });

    it(`should start the schedule`, (): void => {
      expect.assertions(2);

      service.init();

      expect(startScheduleSpy).toHaveBeenCalledTimes(1);
      expect(startScheduleSpy).toHaveBeenCalledWith();
    });
  });

  describe(`startSchedule()`, (): void => {
    let job: NodeScheduleModule.Job;

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
      job = createHydratedMock<NodeScheduleModule.Job>({
        reschedule: jobRescheduleMock,
      });

      scheduleJobSpy = jest.spyOn(NodeScheduleModule, `scheduleJob`).mockReturnValue(job);
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      jest
        .spyOn(GetNextJobDateHumanizedModule, `getNextJobDateHumanized`)
        .mockReturnValue(`dummy-next-job-date-humanized`);
      jest.spyOn(GetNextJobDateModule, `getNextJobDate`).mockReturnValue(`dummy-next-job-date`);
      handleMessagesSpy = jest.spyOn(service, `handleMessages`).mockRejectedValue(new Error(`handleMessages error`));
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
      expect(scheduleJobSpy).toHaveBeenCalledWith(`dummy-schedule`, expect.any(Function));
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
          (_rule: string, callback: () => void): NodeScheduleModule.Job => {
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
      guild = createHydratedMock<Guild>({
        id: `dummy-guild-id`,
      });

      firebaseGuildsServiceGetGuildSpy = jest
        .spyOn(firebaseGuildsService, `getGuild`)
        .mockRejectedValue(new Error(`getGuild error`));
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      sendMessageByChannelSpy = jest
        .spyOn(service, `sendMessageByChannel`)
        .mockRejectedValue(new Error(`sendMessageByChannel error`));
    });

    it(`should log about fetching the Firebase guild`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`getGuild error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageScheduleNoonService`,
        message: `text-fetching Firebase guild value-dummy-guild-id`,
      } as ILoggerLog);
    });

    it(`should get the Firebase guild`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`getGuild error`));

      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledWith(`dummy-guild-id`);
    });

    describe(`when the Firebase guild was not successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceGetGuildSpy.mockRejectedValue(new Error(`getGuild error`));
      });

      it(`should not send a message`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`getGuild error`));

        expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase guild was successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseGuild = undefined;

        firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
      });

      it(`should log about the Firebase guild fetch`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

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

        it(`should log about the invalid Firebase guild`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild data is null`, (): void => {
        beforeEach((): void => {
          firebaseGuild = null;

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild data is a Firebase guild but not up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createHydratedMock<IFirebaseGuildV3>({
            version: FirebaseGuildVersionEnum.V3,
          });

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the invalid Firebase guild`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-Firebase guild value-dummy-guild-id is invalid`,
          } as ILoggerLog);
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(new Error(`Invalid guild`));

          expect(sendMessageByChannelSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guild data is a Firebase guild up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
            channels: {},
            version: FirebaseGuildVersionEnum.V5,
          });

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        it(`should log about the valid Firebase guild`, async (): Promise<void> => {
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
            firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {},
              version: FirebaseGuildVersionEnum.V5,
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
            channel = createHydratedMock<IFirebaseGuildChannelVFinal>({
              id: `one`,
            });
            firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {
                one: channel,
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          it(`should send a message for this channel`, async (): Promise<void> => {
            expect.assertions(2);

            await service.sendMessage(guild);

            expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(1);
            expect(sendMessageByChannelSpy).toHaveBeenCalledWith(channel, firebaseGuild, guild);
          });
        });

        describe(`when the Firebase guild has two channels`, (): void => {
          let channel1: IFirebaseGuildChannelVFinal;
          let channel2: IFirebaseGuildChannelVFinal;

          beforeEach((): void => {
            channel1 = createHydratedMock<IFirebaseGuildChannelVFinal>({
              id: `one`,
            });
            channel2 = createHydratedMock<IFirebaseGuildChannelVFinal>({
              id: `two`,
            });
            firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {
                one: channel1,
                two: channel2,
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          describe(`when the messages failed to be sent to the channels`, (): void => {
            beforeEach((): void => {
              sendMessageByChannelSpy.mockRejectedValue(new Error(`sendMessageByChannel error`));
            });

            it(`should send a message for the two channels`, async (): Promise<void> => {
              expect.assertions(3);

              await service.sendMessage(guild);

              expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(2);
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(1, channel1, firebaseGuild, guild);
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(2, channel2, firebaseGuild, guild);
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
              message = createHydratedMock<Message>();

              sendMessageByChannelSpy.mockResolvedValue(message);
            });

            it(`should send a message for the two channels`, async (): Promise<void> => {
              expect.assertions(3);

              await service.sendMessage(guild);

              expect(sendMessageByChannelSpy).toHaveBeenCalledTimes(2);
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(1, channel1, firebaseGuild, guild);
              expect(sendMessageByChannelSpy).toHaveBeenNthCalledWith(2, channel2, firebaseGuild, guild);
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

  describe(`sendMessageByChannel()`, (): void => {
    let channel: IFirebaseGuildChannel;
    let firebaseGuild: IFirebaseGuildVFinal;
    let guild: Guild;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let sendMessageResponseSpy: jest.SpyInstance;
    let firebaseGuildsChannelsFeaturesNoonEnabledStateServiceIsEnabledSpy: jest.SpyInstance;
    let guildChannelsGetMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonService();
      channel = createHydratedMock<IFirebaseGuildChannel>();
      firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>();
      guildChannelsGetMock = jest.fn().mockImplementation();
      guild = createHydratedMock<Guild>({
        channels: {
          cache: {
            get: guildChannelsGetMock,
          } as any,
        },
        id: `dummy-guild-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      sendMessageResponseSpy = jest
        .spyOn(service, `sendMessageResponse`)
        .mockRejectedValue(new Error(`sendMessageResponse error`));
      firebaseGuildsChannelsFeaturesNoonEnabledStateServiceIsEnabledSpy = jest
        .spyOn(firebaseGuildsChannelsFeaturesNoonEnabledStateService, `isEnabled`)
        .mockImplementation();
    });

    describe(`when the given Firebase guild channel id is undefined`, (): void => {
      beforeEach((): void => {
        channel = createHydratedMock<IFirebaseGuildChannel>({
          id: undefined,
        });
      });

      it(`should log about the Firebase guild channel having a disabled noon feature`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
          new Error(`Noon state disabled`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonService`,
          message: `text-Firebase guild value-dummy-guild-id channel value-unknown noon feature is disabled`,
        } as ILoggerLog);
      });
    });

    describe(`when the given Firebase guild channel id is valid`, (): void => {
      beforeEach((): void => {
        channel = createHydratedMock<IFirebaseGuildChannel>({
          id: `dummy-channel-id`,
        });
      });

      describe(`when the given Firebase guild has a valid noon feature`, (): void => {
        describe(`when the given Firebase guild has a valid noon feature disabled`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': {
                  features: {
                    noon: {
                      isEnabled: false,
                      version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
                    },
                    version: FirebaseGuildChannelFeatureVersionEnum.V2,
                  },
                  version: FirebaseGuildChannelVersionEnum.V2,
                },
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsChannelsFeaturesNoonEnabledStateServiceIsEnabledSpy.mockReturnValue(false);
          });

          it(`should log about the Firebase guild channel having a disabled noon feature`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
              new Error(`Noon state disabled`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordMessageScheduleNoonService`,
              message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id noon feature is disabled`,
            } as ILoggerLog);
          });
        });

        describe(`when the given Firebase guild has a valid noon feature enabled`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': {
                  features: {
                    noon: {
                      isEnabled: true,
                      version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
                    },
                    version: FirebaseGuildChannelFeatureVersionEnum.V2,
                  },
                  version: FirebaseGuildChannelVersionEnum.V2,
                },
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsChannelsFeaturesNoonEnabledStateServiceIsEnabledSpy.mockReturnValue(true);
          });

          it(`should log about the Firebase guild channel having an enabled noon feature`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
              new Error(`Guild channel not found`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
              context: `DiscordMessageScheduleNoonService`,
              message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id noon feature is enabled`,
            } as ILoggerLog);
          });

          it(`should get the Discord guild channel`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
              new Error(`Guild channel not found`)
            );

            expect(guildChannelsGetMock).toHaveBeenCalledTimes(1);
            expect(guildChannelsGetMock).toHaveBeenCalledWith(`dummy-channel-id`);
          });

          describe(`when the Discord guild channel is undefined`, (): void => {
            beforeEach((): void => {
              guildChannelsGetMock.mockReturnValue(undefined);
            });

            it(`should log about the Discord guild channel not found`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                new Error(`Guild channel not found`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordMessageScheduleNoonService`,
                message: `text-Discord guild value-dummy-guild-id channel value-dummy-channel-id is invalid`,
              } as ILoggerLog);
            });
          });

          describe(`when the Discord guild channel is valid`, (): void => {
            let guildChannel: GuildChannel;

            beforeEach((): void => {
              guildChannel = createHydratedMock<GuildChannel>({
                id: `dummy-guild-channel-id`,
              });

              guildChannelsGetMock.mockReturnValue(guildChannel);
            });

            it(`should log about the Discord guild channel being valid`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                new Error(`sendMessageResponse error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordMessageScheduleNoonService`,
                message: `text-Discord guild value-dummy-guild-id channel value-dummy-channel-id is valid`,
              } as ILoggerLog);
            });

            it(`should send a message response`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                new Error(`sendMessageResponse error`)
              );

              expect(sendMessageResponseSpy).toHaveBeenCalledTimes(1);
              expect(sendMessageResponseSpy).toHaveBeenCalledWith(guildChannel);
            });

            describe(`when the message response is invalid`, (): void => {
              beforeEach((): void => {
                sendMessageResponseSpy.mockRejectedValue(new Error(`sendMessageResponse error`));
              });

              it(`should throw an error`, async (): Promise<void> => {
                expect.assertions(1);

                await expect(service.sendMessageByChannel(channel, firebaseGuild, guild)).rejects.toThrow(
                  new Error(`sendMessageResponse error`)
                );
              });
            });

            describe(`when the message response is valid`, (): void => {
              let message: Message;

              beforeEach((): void => {
                message = createHydratedMock<Message>();

                sendMessageResponseSpy.mockResolvedValue(message);
              });

              it(`should return a message`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.sendMessageByChannel(channel, firebaseGuild, guild);

                expect(result).toStrictEqual(message);
              });
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

      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
        createHydratedMock<Client>({
          guilds: {
            cache: ({
              forEach: noop,
            } as unknown) as Collection<string, Guild>,
          },
        })
      );
      discordGuildConfigServiceShouldSendNoonMessageSpy = jest
        .spyOn(discordGuildConfigService, `shouldSendNoonMessage`)
        .mockImplementation();
      sendMessageSpy = jest.spyOn(service, `sendMessage`).mockRejectedValue(new Error(`sendMessage error`));
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    describe(`when the noon message is disabled`, (): void => {
      beforeEach((): void => {
        discordGuildConfigServiceShouldSendNoonMessageSpy.mockReturnValue(false);
      });

      it(`should log about the noon message being disabled`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.handleMessages()).rejects.toThrow(new Error(`Can not send message`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonService`,
          message: `text-noon message sending disabled`,
        } as ILoggerLog);
      });

      it(`should not get the Discord client`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.handleMessages()).rejects.toThrow(new Error(`Can not send message`));

        expect(discordClientServiceGetClientSpy).not.toHaveBeenCalled();
      });

      it(`should not send a message`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.handleMessages()).rejects.toThrow(new Error(`Can not send message`));

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

        it(`should log about not being noon in Paris`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.handleMessages()).rejects.toThrow(new Error(`Can not send message`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `DiscordMessageScheduleNoonService`,
            message: `text-not noon in Paris`,
          } as ILoggerLog);
        });

        it(`should not get the Discord client`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.handleMessages()).rejects.toThrow(new Error(`Can not send message`));

          expect(discordClientServiceGetClientSpy).not.toHaveBeenCalled();
        });

        it(`should not send a message`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.handleMessages()).rejects.toThrow(new Error(`Can not send message`));

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

        it(`should get the Discord client`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.handleMessages();

          expect(result).toStrictEqual([]);
          expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
          expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
        });

        describe(`when there is no guild`, (): void => {
          beforeEach((): void => {
            discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
              createHydratedMock<Client>({
                guilds: {
                  cache: ({
                    forEach: noop,
                  } as unknown) as Collection<string, Guild>,
                },
              })
            );
          });

          it(`should not send a message`, async (): Promise<void> => {
            expect.assertions(2);

            const result = await service.handleMessages();

            expect(result).toStrictEqual([]);

            expect(sendMessageSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when there is one guild`, (): void => {
          let guild: Guild;

          beforeEach((): void => {
            guild = createHydratedMock<Guild>({
              id: `dummy-guild-id`,
            });

            discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
              createHydratedMock<Client>({
                guilds: {
                  cache: {
                    forEach: (callback): void => callback(guild, `key`, new Map()),
                  } as Collection<string, Guild>,
                },
              })
            );
          });

          it(`should send a message for the guild`, async (): Promise<void> => {
            expect.assertions(3);

            const result = await service.handleMessages();

            expect(result).toStrictEqual([undefined]);

            expect(sendMessageSpy).toHaveBeenCalledTimes(1);
            expect(sendMessageSpy).toHaveBeenCalledWith(guild);
          });

          describe(`when the message sending failed`, (): void => {
            beforeEach((): void => {
              sendMessageSpy.mockRejectedValue(new Error(`sendMessage error`));
            });

            it(`should log about the sending message failing`, async (): Promise<void> => {
              expect.assertions(3);

              const result = await service.handleMessages();

              expect(result).toStrictEqual([undefined]);

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                context: `DiscordMessageScheduleNoonService`,
                message: `text-no message sent for Firebase guild value-dummy-guild-id`,
              } as ILoggerLog);
            });
          });

          describe(`when the message sending was successful`, (): void => {
            let messages: Message[];

            beforeEach((): void => {
              messages = [createHydratedMock<Message>(), createHydratedMock<Message>()];

              sendMessageSpy.mockResolvedValue(messages);
            });

            it(`should not log about the sending message failing`, async (): Promise<void> => {
              expect.assertions(2);

              const result = await service.handleMessages();

              expect(result).toStrictEqual([messages]);
              expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
            });
          });
        });

        describe(`when there is two guilds`, (): void => {
          let guild1: Guild;
          let guild2: Guild;

          beforeEach((): void => {
            guild1 = createHydratedMock<Guild>({
              id: `dummy-guild-id-1`,
            });
            guild2 = createHydratedMock<Guild>({
              id: `dummy-guild-id-2`,
            });

            discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
              createHydratedMock<Client>({
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

          it(`should send a message for the guild`, async (): Promise<void> => {
            expect.assertions(4);

            const result = await service.handleMessages();

            expect(result).toStrictEqual([undefined, undefined]);

            expect(sendMessageSpy).toHaveBeenCalledTimes(2);
            expect(sendMessageSpy).toHaveBeenNthCalledWith(1, guild1);
            expect(sendMessageSpy).toHaveBeenNthCalledWith(2, guild2);
          });

          describe(`when the message sending failed`, (): void => {
            beforeEach((): void => {
              sendMessageSpy.mockRejectedValue(new Error(`sendMessage error`));
            });

            it(`should log about the sending message failing`, async (): Promise<void> => {
              expect.assertions(4);

              const result = await service.handleMessages();

              expect(result).toStrictEqual([undefined, undefined]);

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
                context: `DiscordMessageScheduleNoonService`,
                message: `text-no message sent for Firebase guild value-dummy-guild-id-1`,
              } as ILoggerLog);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordMessageScheduleNoonService`,
                message: `text-no message sent for Firebase guild value-dummy-guild-id-2`,
              } as ILoggerLog);
            });
          });

          describe(`when the message sending was successful`, (): void => {
            let messages: Message[];

            beforeEach((): void => {
              messages = [createHydratedMock<Message>(), createHydratedMock<Message>()];

              sendMessageSpy.mockResolvedValue(messages);
            });

            it(`should not log about the sending message failing`, async (): Promise<void> => {
              expect.assertions(2);

              const result = await service.handleMessages();

              expect(result).toStrictEqual([messages, messages]);
              expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
  });

  describe(`sendMessageResponse()`, (): void => {
    let guildChannel: GuildChannel;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordLoggerErrorServiceGetErrorMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonService();
      guildChannel = createHydratedMock<GuildChannel>({
        id: `dummy-guild-channel-id`,
      });
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      discordLoggerErrorServiceGetErrorMessageResponseSpy = jest
        .spyOn(discordLoggerErrorService, `getErrorMessageResponse`)
        .mockReturnValue(discordMessageResponse);
    });

    describe(`when the given guild channel is not writable`, (): void => {
      beforeEach((): void => {
        guildChannel = createHydratedMock<GuildChannel>({
          id: `dummy-guild-channel-id`,
          isText(): false {
            return false;
          },
        });
      });

      it(`should log about the guild channel being not writable`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(
          new Error(`Guild channel not writable`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonService`,
          message: `text-the guild channel value-dummy-guild-channel-id is not writable`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild channel is writable`, (): void => {
      let sendMock: jest.Mock;

      beforeEach((): void => {
        sendMock = jest.fn().mockRejectedValue(new Error(`send error`));
        guildChannel = createHydratedMock<TextChannel>({
          id: `dummy-guild-channel-id`,
          isText(): true {
            return true;
          },
          send: sendMock,
        });
      });

      it(`should log about sending a noon message`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonService`,
          message: `text-sending message for noon for guild channel value-dummy-guild-channel-id...`,
        } as ILoggerLog);
      });

      it(`should send the noon message`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

        expect(sendMock).toHaveBeenCalledTimes(1);
        expect(sendMock).toHaveBeenCalledWith(`Il est midi!`, {
          split: false,
        });
      });

      describe(`when the sending of the message failed`, (): void => {
        beforeEach((): void => {
          sendMock.mockRejectedValue(new Error(`send error`));
        });

        it(`should log about failing to send the message`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-noon message sending failed for guild channel value-dummy-guild-channel-id`,
          } as ILoggerLog);
        });

        it(`should log the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordMessageScheduleNoonService`,
            message: `error-Error: send error`,
          } as ILoggerLog);
        });

        it(`should get an humanized error message response`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).toHaveBeenCalledWith(new Error(`send error`));
        });

        it(`should send the error to the Sonia discord errors channel`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.sendMessageResponse(guildChannel)).rejects.toThrow(new Error(`send error`));

          expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
          expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
            channelName: `errors`,
            messageResponse: discordMessageResponse,
          } as IDiscordGuildSoniaSendMessageToChannel);
        });
      });

      describe(`when the sending of the message was successful`, (): void => {
        let message: Message;

        beforeEach((): void => {
          message = createHydratedMock<Message>();

          sendMock.mockResolvedValue(message);
        });

        it(`should log about the success of the noon message sending`, async (): Promise<void> => {
          expect.assertions(2);

          await service.sendMessageResponse(guildChannel);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordMessageScheduleNoonService`,
            message: `text-noon message sent for guild channel value-dummy-guild-channel-id`,
          } as ILoggerLog);
        });

        it(`should return the message`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.sendMessageResponse(guildChannel);

          expect(result).toStrictEqual(message);
        });

        it(`should not get an humanized error message response`, async (): Promise<void> => {
          expect.assertions(1);

          await service.sendMessageResponse(guildChannel);

          expect(discordLoggerErrorServiceGetErrorMessageResponseSpy).not.toHaveBeenCalled();
        });

        it(`should not send the error to the Sonia discord errors channel`, async (): Promise<void> => {
          expect.assertions(1);

          await service.sendMessageResponse(guildChannel);

          expect(discordGuildSoniaServiceSendMessageToChannelSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe(`executeJob()`, (): void => {
    let loggerServiceDebugSpy: jest.SpyInstance;
    let handleMessagesSpy: jest.SpyInstance;
    let discordMessageScheduleNoonCountServiceCountChannelsAndGuildsSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonService();
      (service as any)._job = createHydratedMock<NodeScheduleModule.Job>({
        nextInvocation(): Date {
          return moment().toDate();
        },
        reschedule: jest.fn(),
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      handleMessagesSpy = jest.spyOn(service, `handleMessages`).mockRejectedValue(new Error(`handleMessages error`));
      discordMessageScheduleNoonCountServiceCountChannelsAndGuildsSpy = jest
        .spyOn(discordMessageScheduleNoonCountService, `countChannelsAndGuilds`)
        .mockImplementation();
    });

    it(`should log about the triggered job`, async (): Promise<void> => {
      expect.assertions(2);

      await service.executeJob();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `DiscordMessageScheduleNoonService`,
        message: `text-job triggered`,
      } as ILoggerLog);
    });

    it(`should log the next job date`, async (): Promise<void> => {
      expect.assertions(2);

      await service.executeJob();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `DiscordMessageScheduleNoonService`,
        message: `text-next job: value-dummy-from-now-date hint-(dummy-formatted-date)`,
      } as ILoggerLog);
    });

    it(`should handle the messages`, async (): Promise<void> => {
      expect.assertions(2);

      await service.executeJob();

      expect(handleMessagesSpy).toHaveBeenCalledTimes(1);
      expect(handleMessagesSpy).toHaveBeenCalledWith();
    });

    describe(`when the handle of the messages failed`, (): void => {
      beforeEach((): void => {
        handleMessagesSpy.mockRejectedValue(new Error(`handleMessages error`));
      });

      it(`should log that the messages could not have been handled`, async (): Promise<void> => {
        expect.assertions(2);

        await service.executeJob();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
          context: `DiscordMessageScheduleNoonService`,
          message: `text-could not handle the messages`,
        } as ILoggerLog);
      });

      it(`should not count the channels and guilds`, async (): Promise<void> => {
        expect.assertions(1);

        await service.executeJob();

        expect(discordMessageScheduleNoonCountServiceCountChannelsAndGuildsSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the handle of the messages was successful`, (): void => {
      beforeEach((): void => {
        handleMessagesSpy.mockResolvedValue([]);
      });

      it(`should count the channels and guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await service.executeJob();

        expect(discordMessageScheduleNoonCountServiceCountChannelsAndGuildsSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageScheduleNoonCountServiceCountChannelsAndGuildsSpy).toHaveBeenCalledWith([]);
      });

      it(`should not log that the messages could not have been handled`, async (): Promise<void> => {
        expect.assertions(1);

        await service.executeJob();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
