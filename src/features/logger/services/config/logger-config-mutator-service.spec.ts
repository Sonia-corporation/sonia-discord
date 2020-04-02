import { IConfigUpdateBoolean } from "../../../config/interfaces/config-update-boolean";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { LoggerConfigCoreService } from "./logger-config-core-service";
import { LoggerConfigMutatorService } from "./logger-config-mutator-service";

jest.mock(`../../../config/services/config-service`);

describe(`LoggerConfigMutatorService`, (): void => {
  let service: LoggerConfigMutatorService;
  let configService: ConfigService;
  let loggerConfigCoreService: LoggerConfigCoreService;

  beforeEach((): void => {
    service = LoggerConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
  });

  describe(`updateEnabledState()`, (): void => {
    let isEnabled: boolean;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      isEnabled = true;
      loggerConfigCoreService.isEnabled = false;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateEnabledState(isEnabled);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `LoggerConfigMutatorService`,
        newValue: true,
        oldValue: false,
        valueName: `enable state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the logger config enable state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateEnabledState(isEnabled);

      expect(loggerConfigCoreService.isEnabled).toStrictEqual(true);
    });
  });

  describe(`updateLevel()`, (): void => {
    let level: LoggerConfigLevelEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      level = LoggerConfigLevelEnum.DEBUG;
      loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(LoggerConfigLevelEnum.DEBUG);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateLevel(level);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `LoggerConfigMutatorService`,
        newValue: LoggerConfigLevelEnum.DEBUG,
        oldValue: LoggerConfigLevelEnum.SUCCESS,
        valueName: `level`,
      } as IConfigUpdateString<LoggerConfigLevelEnum>);
    });

    it(`should update the logger config enable state with the updated string`, (): void => {
      expect.assertions(1);

      service.updateLevel(level);

      expect(loggerConfigCoreService.level).toStrictEqual(
        LoggerConfigLevelEnum.DEBUG
      );
    });
  });
});
