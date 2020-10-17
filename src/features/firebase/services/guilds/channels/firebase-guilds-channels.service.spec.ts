import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { FirebaseGuildChannelVersionEnum } from "../../../enums/guilds/channels/firebase-guild-channel-version.enum";
import { ICreateFirebaseGuildChannel } from "../../../interfaces/guilds/channels/create-firebase-guild-channel";
import { IFirebaseGuildChannelV1 } from "../../../interfaces/guilds/channels/firebase-guild-channel-v1";
import { IFirebaseGuildChannel } from "../../../types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuildChannelVFinal } from "../../../types/guilds/channels/firebase-guild-channel-v-final";
import { FirebaseGuildsChannelsService } from "./firebase-guilds-channels.service";

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsService`, (): void => {
  let service: FirebaseGuildsChannelsService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannels service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsService));
    });

    it(`should return the created FirebaseGuildsChannels service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsService.getInstance();

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

    it(`should notify the FirebaseGuildsChannels service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let channel: IFirebaseGuildChannel | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsService();
    });

    describe(`when the given channel is undefined`, (): void => {
      beforeEach((): void => {
        channel = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(channel);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given channel is a v1 channel`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannelV1>({
          version: FirebaseGuildChannelVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(channel);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let channel: IFirebaseGuildChannel;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsService();
    });

    describe(`when the given channel is a v1 channel`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannelV1>({
          version: FirebaseGuildChannelVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(channel);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let channel: IFirebaseGuildChannel | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsService();
    });

    describe(`when the given channel is undefined`, (): void => {
      beforeEach((): void => {
        channel = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(channel);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given channel is a channel`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannelVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(channel);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`create()`, (): void => {
    let channel: ICreateFirebaseGuildChannel;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsService();
      channel = createMock<ICreateFirebaseGuildChannel>({
        id: `dummy-id`,
      });
    });

    it(`should return a channel without features`, (): void => {
      expect.assertions(1);

      const result = service.create(channel);

      expect(result.features).toBeUndefined();
    });

    it(`should return a channel with the given id`, (): void => {
      expect.assertions(1);

      const result = service.create(channel);

      expect(result.id).toStrictEqual(`dummy-id`);
    });

    it(`should return a channel on v1`, (): void => {
      expect.assertions(1);

      const result = service.create(channel);

      expect(result.version).toStrictEqual(1);
    });
  });

  describe(`upgrade()`, (): void => {
    let channel: IFirebaseGuildChannel;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsService();
    });

    describe(`when the given channel is a v1`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannel>({
          version: FirebaseGuildChannelVersionEnum.V1,
        });
      });

      it(`should return the given channel`, (): void => {
        expect.assertions(1);

        const result = service.upgrade(channel);

        expect(result).toStrictEqual(channel);
      });
    });
  });

  describe(`getUpToDate()`, (): void => {
    let channel: IFirebaseGuildChannel | undefined;
    let createChannel: ICreateFirebaseGuildChannel;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsService();
      createChannel = createMock<ICreateFirebaseGuildChannel>({
        id: `dummy-id`,
      });
    });

    describe(`when the given channel is undefined`, (): void => {
      beforeEach((): void => {
        channel = undefined;
      });

      it(`should return a newly created channel`, (): void => {
        expect.assertions(3);

        const result = service.getUpToDate(channel, createChannel);

        expect(result.id).toStrictEqual(`dummy-id`);
        expect(result.version).toStrictEqual(1);
        expect(result.features).toBeUndefined();
      });
    });

    describe(`when the given channel is a v1 channel`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannel>({
          version: FirebaseGuildChannelVersionEnum.V1,
        });
      });

      it(`should return the given channel`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(channel, createChannel);

        expect(result).toStrictEqual(channel);
      });
    });
  });
});
