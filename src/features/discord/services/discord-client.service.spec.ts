import { DiscordClientService } from './discord-client.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { Client } from 'discord.js';
import { take } from 'rxjs/operators';
import { createHydratedMock } from 'ts-auto-mock';

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
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_CLIENT_SERVICE);
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
      client = createHydratedMock<Client>();
    });

    describe(`when the Client does not exist`, (): void => {
      beforeEach((): void => {
        createClientSpy = jest.spyOn(service, `createClient`).mockReturnValue(client);
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

    it(`should be false by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.isReady$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(false);
    });

    describe(`when the is ready event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsReady();

        const result = await service.isReady$().pipe(take(1)).toPromise();

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isReady()`, (): void => {
    beforeEach((): void => {
      service = new DiscordClientService();
    });

    describe(`when the is ready event is notified`, (): void => {
      beforeEach((): void => {
        service.notifyIsReady();
      });

      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsReady();

        const result = await service.isReady();

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`notifyIsReady()`, (): void => {
    beforeEach((): void => {
      service = new DiscordClientService();
    });

    it(`should notify that the client is ready`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyIsReady();

      const result = await service.isReady$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(true);
    });
  });
});
