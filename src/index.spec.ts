import { CoreService } from './features/core/services/core.service';
import { InitService } from './features/init/services/init.service';
import { createMock } from 'ts-auto-mock';

describe(`Index`, (): void => {
  let coreServiceInitMock: jest.Mock;
  let initServiceInitMock: jest.Mock;

  let coreServiceGetInstanceSy: jest.SpyInstance;
  let initServiceGetInstanceSy: jest.SpyInstance;

  beforeEach((): void => {
    coreServiceInitMock = jest.fn();
    initServiceInitMock = jest.fn();

    coreServiceGetInstanceSy = jest.spyOn(CoreService, `getInstance`).mockReturnValue(
      createMock<CoreService>({
        init: coreServiceInitMock,
      })
    );
    initServiceGetInstanceSy = jest.spyOn(InitService, `getInstance`).mockReturnValue(
      createMock<InitService>({
        init: initServiceInitMock,
      })
    );
  });

  it(`should load the environment and create the Core and Init service and init them`, (): void => {
    expect.assertions(8);

    require(`./index`);

    expect(coreServiceGetInstanceSy).toHaveBeenCalledOnce();
    expect(coreServiceGetInstanceSy).toHaveBeenCalledWith();
    expect(coreServiceInitMock).toHaveBeenCalledOnce();
    expect(coreServiceInitMock).toHaveBeenCalledWith();
    expect(initServiceGetInstanceSy).toHaveBeenCalledOnce();
    expect(initServiceGetInstanceSy).toHaveBeenCalledWith();
    expect(initServiceInitMock).toHaveBeenCalledOnce();
    expect(initServiceInitMock).toHaveBeenCalledWith();
  });
});
