import { DiscordChannelService } from './discord-channel.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import * as IsDiscordDmChannelModule from '../functions/is-discord-dm-channel';
import * as IsDiscordTextChannelModule from '../functions/is-discord-text-channel';
import { DMChannel, NewsChannel, TextChannel } from 'discord.js';

describe(`DiscordChannelService`, (): void => {
  let service: DiscordChannelService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordChannel service`, (): void => {
      expect.assertions(1);

      service = DiscordChannelService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordChannelService));
    });

    it(`should return the created DiscordChannel service`, (): void => {
      expect.assertions(1);

      const result = DiscordChannelService.getInstance();

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

    it(`should notify the DiscordChannel service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordChannelService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_CHANNEL_SERVICE);
    });
  });

  describe(`isValid()`, (): void => {
    let channel: TextChannel | DMChannel | NewsChannel | null | undefined;

    let isTextSpy: jest.SpyInstance;
    let isDmSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordChannelService();
      channel = undefined;

      isTextSpy = jest.spyOn(service, `isText`).mockReturnValue(false);
      isDmSpy = jest.spyOn(service, `isDm`).mockReturnValue(false);
    });

    describe(`when the given channel is not a text channel`, (): void => {
      beforeEach((): void => {
        isTextSpy.mockReturnValue(false);
      });

      describe(`when the given channel is not a dm channel`, (): void => {
        beforeEach((): void => {
          isDmSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isValid(channel);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given channel is a dm channel`, (): void => {
        beforeEach((): void => {
          isDmSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isValid(channel);

          expect(result).toStrictEqual(true);
        });
      });
    });

    describe(`when the given channel is a text channel`, (): void => {
      beforeEach((): void => {
        isTextSpy.mockReturnValue(true);
      });

      describe(`when the given channel is not a dm channel`, (): void => {
        beforeEach((): void => {
          isDmSpy.mockReturnValue(false);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isValid(channel);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given channel is a dm channel`, (): void => {
        beforeEach((): void => {
          isDmSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isValid(channel);

          expect(result).toStrictEqual(true);
        });
      });
    });
  });

  describe(`isText()`, (): void => {
    let channel: TextChannel | DMChannel | NewsChannel | null | undefined;

    let isDiscordTextChannelSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordChannelService();

      isDiscordTextChannelSpy = jest.spyOn(IsDiscordTextChannelModule, `isDiscordTextChannel`).mockReturnValue(false);
    });

    describe(`when the given channel is not a text channel`, (): void => {
      beforeEach((): void => {
        isDiscordTextChannelSpy.mockReturnValue(false);
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isText(channel);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given channel is a text channel`, (): void => {
      beforeEach((): void => {
        isDiscordTextChannelSpy.mockReturnValue(true);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isText(channel);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isDm()`, (): void => {
    let channel: TextChannel | DMChannel | NewsChannel | null | undefined;

    let isDiscordDmChannelSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordChannelService();

      isDiscordDmChannelSpy = jest.spyOn(IsDiscordDmChannelModule, `isDiscordDmChannel`).mockReturnValue(false);
    });

    describe(`when the given channel is not a dm channel`, (): void => {
      beforeEach((): void => {
        isDiscordDmChannelSpy.mockReturnValue(false);
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isDm(channel);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given channel is a dm channel`, (): void => {
      beforeEach((): void => {
        isDiscordDmChannelSpy.mockReturnValue(true);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isDm(channel);

        expect(result).toStrictEqual(true);
      });
    });
  });
});
