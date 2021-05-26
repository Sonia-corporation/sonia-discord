import { CoreService } from './features/core/services/core.service';
import { InitService } from './features/init/services/init.service';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Index`, (): void => {
  let coreServiceInitMock: jest.Mock;
  let initServiceInitMock: jest.Mock;

  let coreServiceGetInstanceSy: jest.SpyInstance;
  let initServiceGetInstanceSy: jest.SpyInstance;

  beforeEach((): void => {
    coreServiceInitMock = jest.fn();
    initServiceInitMock = jest.fn();

    coreServiceGetInstanceSy = jest.spyOn(CoreService, `getInstance`).mockReturnValue(
      createHydratedMock<CoreService>({
        init: coreServiceInitMock,
      })
    );
    initServiceGetInstanceSy = jest.spyOn(InitService, `getInstance`).mockReturnValue(
      createHydratedMock<InitService>({
        init: initServiceInitMock,
      })
    );
  });

  it(`should load the environment and create the Core and Init service and init them`, (): void => {
    expect.assertions(8);

    require(`./index`);

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
