import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { LoggerConfigCoreService } from "./logger-config-core-service";

jest.mock(`../../../config/services/config-service`);

describe(`LoggerConfigCoreService`, (): void => {
  let service: LoggerConfigCoreService;

  beforeEach((): void => {
    service = LoggerConfigCoreService.getInstance();
  });

  it(`should be disabled`, (): void => {
    expect.assertions(1);

    expect(service.isEnabled).toStrictEqual(false);
  });

  it(`should have a debug level`, (): void => {
    expect.assertions(1);

    expect(service.level).toStrictEqual(LoggerConfigLevelEnum.DEBUG);
  });
});
