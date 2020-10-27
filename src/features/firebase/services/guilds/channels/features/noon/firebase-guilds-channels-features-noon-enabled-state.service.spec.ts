import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../core/services/core-event.service";
import { ILoggerLog } from "../../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../../logger/services/logger.service";
import { IFirebaseGuildChannel } from "../../../../../types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuildVFinal } from "../../../../../types/guilds/firebase-guild-v-final";
import { FirebaseGuildsChannelsFeaturesNoonEnabledStateService } from "./firebase-guilds-channels-features-noon-enabled-state.service";

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesNoonEnabledStateService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesNoonEnabledStateService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesNoonEnabledState service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesNoonEnabledStateService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsChannelsFeaturesNoonEnabledStateService)
      );
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesNoonEnabledState service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesNoonEnabledStateService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeaturesNoonEnabledState service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesNoonEnabledStateService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_SERVICE
      );
    });
  });

  describe(`isEnabled()`, (): void => {
    let channel: IFirebaseGuildChannel;
    let firebaseGuild: IFirebaseGuildVFinal;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      channel = createMock<IFirebaseGuildChannel>();
      firebaseGuild = createMock<IFirebaseGuildVFinal>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    describe(`when the given Firebase guild channel id is undefined`, (): void => {
      beforeEach((): void => {
        channel = createMock<IFirebaseGuildChannel>({
          id: undefined,
        });
      });

      it(`should log about the channel id being invalid`, (): void => {
        expect.assertions(2);

        service.isEnabled(channel, firebaseGuild);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
          message: `text-Firebase guild value-dummy-guild-id channel value-unknown noon feature is disabled`,
        } as ILoggerLog);
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isEnabled(channel, firebaseGuild);

        expect(result).toStrictEqual(false);
      });
    });
  });
});
