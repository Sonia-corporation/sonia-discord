import { AppConfigCoreService } from "./app-config-core-service";

jest.mock(`../../../config/services/config-service`);

describe(`AppConfigCoreService`, (): void => {
  let service: AppConfigCoreService;

  beforeEach((): void => {
    service = AppConfigCoreService.getInstance();
  });

  it(`should have a unknown initialization date`, (): void => {
    expect.assertions(1);

    expect(service.initializationDate).toStrictEqual(`unknown`);
  });

  it(`should not be in a production state`, (): void => {
    expect.assertions(1);

    expect(service.isProduction).toStrictEqual(false);
  });

  it(`should have a unknown release date`, (): void => {
    expect.assertions(1);

    expect(service.releaseDate).toStrictEqual(`unknown`);
  });

  it(`should not have some release notes`, (): void => {
    expect.assertions(1);

    expect(service.releaseNotes).toStrictEqual(``);
  });

  it(`should have a total of release count to 0`, (): void => {
    expect.assertions(1);

    expect(service.totalReleaseCount).toStrictEqual(0);
  });

  it(`should have an unknown version`, (): void => {
    expect.assertions(1);

    expect(service.version).toStrictEqual(`unknown`);
  });
});
