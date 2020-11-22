import { DiscordMessagePingPongService } from './discord-message-ping-pong.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';

describe(`DiscordMessagePingPongService`, (): void => {
  let service: DiscordMessagePingPongService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessagePingPong service`, (): void => {
      expect.assertions(1);

      service = DiscordMessagePingPongService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessagePingPongService));
    });

    it(`should return the created DiscordMessagePingPong service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessagePingPongService.getInstance();

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

    it(`should notify the DiscordMessagePingPong service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessagePingPongService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_PING_PONG_SERVICE
      );
    });
  });

  describe(`hasCriteria()`, (): void => {
    let message: string;

    beforeEach((): void => {
      service = new DiscordMessagePingPongService();
    });

    describe(`when the given message is empty`, (): void => {
      beforeEach((): void => {
        message = ``;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has no mention`, (): void => {
      beforeEach((): void => {
        message = `dummy message`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention`, (): void => {
      beforeEach((): void => {
        message = `<@!123>`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with spaces before and after`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> `;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention without the ping text`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> yolo`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the ping text`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> ping`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the ping text and another mention`, (): void => {
      beforeEach((): void => {
        message = ` <@!123><@!456> ping`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message has only one mention with the ping text and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> ping  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the ping text in uppercase`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> PING`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message has only one mention with the ping text in uppercase and extra spaces after`, (): void => {
      beforeEach((): void => {
        message = ` <@!123> PING  `;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCriteria(message);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`reply()`, (): void => {
    beforeEach((): void => {
      service = new DiscordMessagePingPongService();
    });

    it(`should return a Discord message response not split`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.reply();

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return a Discord message response with pong`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.reply();

      expect(result.response).toStrictEqual(`**[dev]** Pong`);
    });
  });
});
