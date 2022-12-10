import { FirebaseDmsNewVersionCountHumanizedService } from './firebase-dms-new-version-count-humanized.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordSoniaConfigService } from '../../../discord/users/services/config/discord-sonia-config.service';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsNewVersionCountHumanizedService`, (): void => {
  let service: FirebaseDmsNewVersionCountHumanizedService;
  let coreEventService: CoreEventService;
  let discordSoniaConfigService: DiscordSoniaConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsNewVersionCountHumanizedService service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsNewVersionCountHumanizedService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsNewVersionCountHumanizedService));
    });

    it(`should return the created FirebaseDmsNewVersionCountHumanizedService service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsNewVersionCountHumanizedService.getInstance();

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

    it(`should notify the FirebaseDmsNewVersionCountHumanizedService service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsNewVersionCountHumanizedService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_COUNT_HUMANIZED_SERVICE
      );
    });
  });

  describe(`getHumanizedCount()`, (): void => {
    let totalUserCount: number;
    let dmCount: number;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionCountHumanizedService();

      jest.spyOn(discordSoniaConfigService, `getId`).mockReturnValue(`1234`);
    });

    describe(`when the total user count is 0`, (): void => {
      beforeEach((): void => {
        totalUserCount = 0;
      });

      describe(`when the DM count is 0`, (): void => {
        beforeEach((): void => {
          dmCount = 0;
        });

        it(`should return that no release note message was sent`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`No release note messages were sent today.`);
        });
      });

      describe(`when the DM count is 1`, (): void => {
        beforeEach((): void => {
          dmCount = 1;
        });

        it(`should return that no release note message was sent`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`No release note messages were sent today.`);
        });
      });

      describe(`when the DM count is 2`, (): void => {
        beforeEach((): void => {
          dmCount = 2;
        });

        it(`should return that no release note message was sent`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`No release note messages were sent today.`);
        });
      });
    });

    describe(`when the total user count is 1`, (): void => {
      beforeEach((): void => {
        totalUserCount = 1;
      });

      describe(`when the DM count is 0`, (): void => {
        beforeEach((): void => {
          dmCount = 0;
        });

        it(`should return that no release note message was sent to the one user`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`No release note messages were sent today for the **1** user using <@!1234>.`);
        });
      });

      describe(`when the DM count is 1`, (): void => {
        beforeEach((): void => {
          dmCount = 1;
        });

        it(`should return that one release note message was sent to one user`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`**1** release note message was sent over **1** user using <@!1234>.`);
        });
      });

      describe(`when the DM count is 2`, (): void => {
        beforeEach((): void => {
          dmCount = 2;
        });

        it(`should return that two release note messages were sent to one user`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`**2** release note messages were sent over **1** user using <@!1234>.`);
        });
      });
    });

    describe(`when the total user count is 2`, (): void => {
      beforeEach((): void => {
        totalUserCount = 2;
      });

      describe(`when the DM count is 0`, (): void => {
        beforeEach((): void => {
          dmCount = 0;
        });

        it(`should return that no release note message was sent to two users`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`No release note messages were sent today for the **2** users using <@!1234>.`);
        });
      });

      describe(`when the DM count is 1`, (): void => {
        beforeEach((): void => {
          dmCount = 1;
        });

        it(`should return that one release note message were sent to two users`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`**1** release note message was sent over **2** users using <@!1234>.`);
        });
      });

      describe(`when the DM count is 2`, (): void => {
        beforeEach((): void => {
          dmCount = 2;
        });

        it(`should return that two release note messages were sent to two users`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCount(totalUserCount, dmCount);

          expect(result).toBe(`**2** release note messages were sent over **2** users using <@!1234>.`);
        });
      });
    });
  });

  describe(`getHumanizedCountForLogs()`, (): void => {
    let totalUserCount: number;
    let dmCount: number;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionCountHumanizedService();
    });

    describe(`when the total user count is 0`, (): void => {
      beforeEach((): void => {
        totalUserCount = 0;
      });

      describe(`when the DM count is 0`, (): void => {
        beforeEach((): void => {
          dmCount = 0;
        });

        it(`should return that no release note message was sent`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`no release note message sent`);
        });
      });

      describe(`when the DM count is 1`, (): void => {
        beforeEach((): void => {
          dmCount = 1;
        });

        it(`should return that no release note message was sent`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`no release note message sent`);
        });
      });

      describe(`when the DM count is 2`, (): void => {
        beforeEach((): void => {
          dmCount = 2;
        });

        it(`should return that no release note message was sent`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`no release note message sent`);
        });
      });
    });

    describe(`when the total user count is 1`, (): void => {
      beforeEach((): void => {
        totalUserCount = 1;
      });

      describe(`when the DM count is 0`, (): void => {
        beforeEach((): void => {
          dmCount = 0;
        });

        it(`should return that no release note message was sent to one user`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`no release note message sent for the value-1 user`);
        });
      });

      describe(`when the DM count is 1`, (): void => {
        beforeEach((): void => {
          dmCount = 1;
        });

        it(`should return that one release note message was sent to one user`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`value-1 release note message sent over value-1 user`);
        });
      });

      describe(`when the DM count is 2`, (): void => {
        beforeEach((): void => {
          dmCount = 2;
        });

        it(`should return that two release note messages were sent to one user`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`value-2 release note messages sent over value-1 user`);
        });
      });
    });

    describe(`when the total user count is 2`, (): void => {
      beforeEach((): void => {
        totalUserCount = 2;
      });

      describe(`when the DM count is 0`, (): void => {
        beforeEach((): void => {
          dmCount = 0;
        });

        it(`should return that no release note message was sent to two users`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`no release note message sent for the value-2 users`);
        });
      });

      describe(`when the DM count is 1`, (): void => {
        beforeEach((): void => {
          dmCount = 1;
        });

        it(`should return that one release note message was sent to two users`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`value-1 release note message sent over value-2 users`);
        });
      });

      describe(`when the DM count is 2`, (): void => {
        beforeEach((): void => {
          dmCount = 2;
        });

        it(`should return that two release note messages were sent to two users`, (): void => {
          expect.assertions(1);

          const result = service.getHumanizedCountForLogs(totalUserCount, dmCount);

          expect(result).toBe(`value-2 release note messages sent over value-2 users`);
        });
      });
    });
  });
});
