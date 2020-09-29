import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../core/services/core-event.service";
import { FirebaseGuildsCommandsFeatureNoonEnabledService } from "./firebase-guilds-commands-feature-noon-enabled.service";

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsCommandsFeatureNoonEnabledService`, (): void => {
  let service: FirebaseGuildsCommandsFeatureNoonEnabledService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsCommandsFeatureNoonEnabled service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsCommandsFeatureNoonEnabledService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsCommandsFeatureNoonEnabledService)
      );
    });

    it(`should return the created FirebaseGuildsCommandsFeatureNoonEnabled service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsCommandsFeatureNoonEnabledService.getInstance();

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

    it(`should notify the FirebaseGuildsCommandsFeatureNoonEnabled service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsCommandsFeatureNoonEnabledService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_COMMANDS_FEATURE_NOON_ENABLED_SERVICE
      );
    });
  });
});
