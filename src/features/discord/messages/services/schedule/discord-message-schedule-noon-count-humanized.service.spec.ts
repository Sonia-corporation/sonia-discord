import { DiscordMessageScheduleNoonCountHumanizedService } from './discord-message-schedule-noon-count-humanized.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordSoniaConfigService } from '../../../users/services/config/discord-sonia-config.service';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageScheduleNoonCountHumanizedService`, (): void => {
  let service: DiscordMessageScheduleNoonCountHumanizedService;
  let coreEventService: CoreEventService;
  let discordSoniaConfigService: DiscordSoniaConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageScheduleNoonCountHumanized service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageScheduleNoonCountHumanizedService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageScheduleNoonCountHumanizedService));
    });

    it(`should return the created DiscordMessageScheduleNoonCountHumanized service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageScheduleNoonCountHumanizedService.getInstance();

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

    it(`should notify the DiscordMessageScheduleNoonCountHumanized service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageScheduleNoonCountHumanizedService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_HUMANIZED_SERVICE
      );
    });
  });

  describe(`getHumanizedCount()`, (): void => {
    let totalGuildCount: number;
    let guildCount: number;
    let channelCount: number;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonCountHumanizedService();

      jest.spyOn(discordSoniaConfigService, `getId`).mockReturnValue(`1234`);
    });

    describe(`when the total guild count is 0`, (): void => {
      beforeEach((): void => {
        totalGuildCount = 0;
      });

      describe(`when the guild count is 0`, (): void => {
        beforeEach((): void => {
          guildCount = 0;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });
      });

      describe(`when the guild count is 1`, (): void => {
        beforeEach((): void => {
          guildCount = 1;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });
      });

      describe(`when the guild count is 2`, (): void => {
        beforeEach((): void => {
          guildCount = 2;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today.`);
          });
        });
      });
    });

    describe(`when the total guild count is 1`, (): void => {
      beforeEach((): void => {
        totalGuildCount = 1;
      });

      describe(`when the guild count is 0`, (): void => {
        beforeEach((): void => {
          guildCount = 0;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today for the **1** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**1** noon message was sent over **0** of **1** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**2** noon messages were sent over **0** of **1** guild using <@!1234>.`);
          });
        });
      });

      describe(`when the guild count is 1`, (): void => {
        beforeEach((): void => {
          guildCount = 1;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today for the **1** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**1** noon message was sent over **1** of **1** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**2** noon messages were sent over **1** of **1** guild using <@!1234>.`);
          });
        });
      });

      describe(`when the guild count is 2`, (): void => {
        beforeEach((): void => {
          guildCount = 2;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today for the **1** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**1** noon message was sent over **2** of **1** guilds using <@!1234>.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**2** noon messages were sent over **2** of **1** guilds using <@!1234>.`);
          });
        });
      });
    });

    describe(`when the total guild count is 2`, (): void => {
      beforeEach((): void => {
        totalGuildCount = 2;
      });

      describe(`when the guild count is 0`, (): void => {
        beforeEach((): void => {
          guildCount = 0;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today for the **2** guilds using <@!1234>.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**1** noon message was sent over **0** of **2** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**2** noon messages were sent over **0** of **2** guild using <@!1234>.`);
          });
        });
      });

      describe(`when the guild count is 1`, (): void => {
        beforeEach((): void => {
          guildCount = 1;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today for the **2** guilds using <@!1234>.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**1** noon message was sent over **1** of **2** guild using <@!1234>.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**2** noon messages were sent over **1** of **2** guild using <@!1234>.`);
          });
        });
      });

      describe(`when the guild count is 2`, (): void => {
        beforeEach((): void => {
          guildCount = 2;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`No noon messages were sent today for the **2** guilds using <@!1234>.`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**1** noon message was sent over **2** of **2** guilds using <@!1234>.`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCount(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`**2** noon messages were sent over **2** of **2** guilds using <@!1234>.`);
          });
        });
      });
    });
  });

  describe(`getHumanizedCountForLogs()`, (): void => {
    let totalGuildCount: number;
    let guildCount: number;
    let channelCount: number;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonCountHumanizedService();
    });

    describe(`when the total guild count is 0`, (): void => {
      beforeEach((): void => {
        totalGuildCount = 0;
      });

      describe(`when the guild count is 0`, (): void => {
        beforeEach((): void => {
          guildCount = 0;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });
      });

      describe(`when the guild count is 1`, (): void => {
        beforeEach((): void => {
          guildCount = 1;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });
      });

      describe(`when the guild count is 2`, (): void => {
        beforeEach((): void => {
          guildCount = 2;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent`);
          });
        });
      });
    });

    describe(`when the total guild count is 1`, (): void => {
      beforeEach((): void => {
        totalGuildCount = 1;
      });

      describe(`when the guild count is 0`, (): void => {
        beforeEach((): void => {
          guildCount = 0;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent for the value-1 guild`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-1 noon message sent over value-0 guild of value-1`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-2 noon messages sent over value-0 guild of value-1`);
          });
        });
      });

      describe(`when the guild count is 1`, (): void => {
        beforeEach((): void => {
          guildCount = 1;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent for the value-1 guild`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-1 noon message sent over value-1 guild of value-1`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-2 noon messages sent over value-1 guild of value-1`);
          });
        });
      });

      describe(`when the guild count is 2`, (): void => {
        beforeEach((): void => {
          guildCount = 2;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent for the value-1 guild`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-1 noon message sent over value-2 guilds of value-1`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-2 noon messages sent over value-2 guilds of value-1`);
          });
        });
      });
    });

    describe(`when the total guild count is 2`, (): void => {
      beforeEach((): void => {
        totalGuildCount = 2;
      });

      describe(`when the guild count is 0`, (): void => {
        beforeEach((): void => {
          guildCount = 0;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent for the value-2 guilds`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-1 noon message sent over value-0 guild of value-2`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-2 noon messages sent over value-0 guild of value-2`);
          });
        });
      });

      describe(`when the guild count is 1`, (): void => {
        beforeEach((): void => {
          guildCount = 1;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent for the value-2 guilds`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-1 noon message sent over value-1 guild of value-2`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-2 noon messages sent over value-1 guild of value-2`);
          });
        });
      });

      describe(`when the guild count is 2`, (): void => {
        beforeEach((): void => {
          guildCount = 2;
        });

        describe(`when the channel count is 0`, (): void => {
          beforeEach((): void => {
            channelCount = 0;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`no noon message sent for the value-2 guilds`);
          });
        });

        describe(`when the channel count is 1`, (): void => {
          beforeEach((): void => {
            channelCount = 1;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-1 noon message sent over value-2 guilds of value-2`);
          });
        });

        describe(`when the channel count is 2`, (): void => {
          beforeEach((): void => {
            channelCount = 2;
          });

          it(`should return that no noon message was sent`, (): void => {
            expect.assertions(1);

            const result = service.getHumanizedCountForLogs(totalGuildCount, guildCount, channelCount);

            expect(result).toBe(`value-2 noon messages sent over value-2 guilds of value-2`);
          });
        });
      });
    });
  });
});
