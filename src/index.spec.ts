import dotenv from "dotenv";
import { createMock } from "ts-auto-mock";
import { CoreService } from "./features/core/services/core.service";
import { InitService } from "./features/init/services/init.service";

describe(`Index`, (): void => {
  let coreServiceInitMock: jest.Mock;
  let initServiceInitMock: jest.Mock;

  let dotenvConfigSpy: jest.SpyInstance;
  let coreServiceGetInstanceSy: jest.SpyInstance;
  let initServiceGetInstanceSy: jest.SpyInstance;

  beforeEach((): void => {
    coreServiceInitMock = jest.fn();
    initServiceInitMock = jest.fn();

    dotenvConfigSpy = jest.spyOn(dotenv, `config`).mockReturnValue({});
    coreServiceGetInstanceSy = jest
      .spyOn(CoreService, `getInstance`)
      .mockReturnValue(
        createMock<CoreService>({
          init: coreServiceInitMock,
        })
      );
    initServiceGetInstanceSy = jest
      .spyOn(InitService, `getInstance`)
      .mockReturnValue(
        createMock<InitService>({
          init: initServiceInitMock,
        })
      );
  });

  it(`should load the environment and create the Core and Init service and init them`, (): void => {
    expect.assertions(10);

    require(`./index`);

    expect(dotenvConfigSpy).toHaveBeenCalledTimes(1);
    expect(dotenvConfigSpy).toHaveBeenCalledWith();
    expect(coreServiceGetInstanceSy).toHaveBeenCalledTimes(1);
    expect(coreServiceGetInstanceSy).toHaveBeenCalledWith();
    expect(coreServiceInitMock).toHaveBeenCalledTimes(1);
    expect(coreServiceInitMock).toHaveBeenCalledWith();
    expect(initServiceGetInstanceSy).toHaveBeenCalledTimes(1);
    expect(initServiceGetInstanceSy).toHaveBeenCalledWith();
    expect(initServiceInitMock).toHaveBeenCalledTimes(1);
    expect(initServiceInitMock).toHaveBeenCalledWith();
  });
});
