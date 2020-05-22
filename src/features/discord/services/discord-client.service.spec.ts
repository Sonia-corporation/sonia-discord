import { Client } from "discord.js";
import { Observable } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordClientService } from "./discord-client.service";

describe(`DiscordClientService`, (): void => {
  let service: DiscordClientService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordClient service`, (): void => {
      expect.assertions(1);

      service = DiscordClientService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordClientService));
    });

    it(`should return the created DiscordClient service`, (): void => {
      expect.assertions(1);

      const result = DiscordClientService.getInstance();

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

    it(`should notify the DiscordClient service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordClientService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_CLIENT_SERVICE
      );
    });
  });

  describe(`createClient()`, (): void => {
    beforeEach((): void => {
      service = new DiscordClientService();
    });

    it(`should return a Client`, (): void => {
      expect.assertions(1);

      const result = service.createClient();

      expect(result).toStrictEqual(expect.any(Client));
    });
  });

  describe(`getClient()`, (): void => {
    let client: Client;

    let createClientSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordClientService();
      client = createMock<Client>();
    });

    describe(`when the Client does not exist`, (): void => {
      beforeEach((): void => {
        createClientSpy = jest
          .spyOn(service, `createClient`)
          .mockReturnValue(client);
      });

      it(`should create a Client`, (): void => {
        expect.assertions(2);

        service.getClient();

        expect(createClientSpy).toHaveBeenCalledTimes(1);
        expect(createClientSpy).toHaveBeenCalledWith();
      });

      it(`should return the created Client`, (): void => {
        expect.assertions(1);

        const result = service.getClient();

        expect(result).toStrictEqual(client);
      });
    });

    describe(`when the Client does exist`, (): void => {
      beforeEach((): void => {
        service.createClient();

        createClientSpy = jest.spyOn(service, `createClient`);
      });

      it(`should not create a Client`, (): void => {
        expect.assertions(1);

        service.getClient();

        expect(createClientSpy).not.toHaveBeenCalled();
      });

      it(`should return the old Client`, (): void => {
        expect.assertions(1);

        const result = service.getClient();

        expect(result).toStrictEqual(expect.any(Client));
      });
    });
  });

  describe(`isReady$()`, (): void => {
    beforeEach((): void => {
      service = new DiscordClientService();
    });

    it(`should return an observable`, (): void => {
      expect.assertions(1);

      const result = service.isReady$();

      expect(result).toStrictEqual(expect.any(Observable));
    });

    it(`should be false by default`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.isReady$().subscribe({
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

    describe(`when the is ready event is notified`, (): void => {
      it(`should emit a new value into the stream`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.notifyIsReady();
        service.isReady$().subscribe({
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

  describe(`notifyIsReady()`, (): void => {
    beforeEach((): void => {
      service = new DiscordClientService();
    });

    it(`should notify that the client is ready`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.notifyIsReady();
      service.isReady$().subscribe({
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
