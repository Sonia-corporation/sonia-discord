import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { FirebaseGuildsBreakingChangeService } from "./firebase-guilds-breaking-change.service";

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsBreakingChangeService`, (): void => {
  let service: FirebaseGuildsBreakingChangeService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsBreakingChange service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsBreakingChangeService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsBreakingChangeService)
      );
    });

    it(`should return the created FirebaseGuildsBreakingChange service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsBreakingChangeService.getInstance();

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

    it(`should notify the FirebaseGuildsBreakingChange service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsBreakingChangeService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_BREAKING_CHANGES_SERVICE
      );
    });
  });

  describe(`hasFinished$()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
    });

    it(`should be false by default`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.hasFinished$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (isTrue: boolean): void => {
          expect(isTrue).toStrictEqual(false);
          doneCallback();
        },
      });
    });

    describe(`when the has finished event is notified`, (): void => {
      it(`should emit a new value into the stream`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.notifyHasFinished();
        service.hasFinished$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (isTrue: boolean): void => {
            expect(isTrue).toStrictEqual(true);
            doneCallback();
          },
        });
      });
    });
  });

  describe(`hasFinished()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
    });

    describe(`when the has finished event is notified`, (): void => {
      beforeEach((): void => {
        service.notifyHasFinished();
      });

      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyHasFinished();

        const hasFinished = await service.hasFinished();

        expect(hasFinished).toStrictEqual(true);
      });
    });
  });

  describe(`notifyHasFinished()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
    });

    it(`should notify that the Firebase guilds breaking changes were handled`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.notifyHasFinished();
      service.hasFinished$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (isTrue: boolean): void => {
          expect(isTrue).toStrictEqual(true);
          doneCallback();
        },
      });
    });
  });
});
