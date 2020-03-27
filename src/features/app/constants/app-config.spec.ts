import { APP_CONFIG } from './app-config';

describe(`APP_CONFIG`, (): void => {
  it(`should have a unknown initialization date`, (): void => {
    expect.assertions(1);

    expect(APP_CONFIG.initializationDate).toStrictEqual(`unknown`);
  });

  it(`should not be in a production state`, (): void => {
    expect.assertions(1);

    expect(APP_CONFIG.isProduction).toStrictEqual(false);
  });

  it(`should have a unknown release date`, (): void => {
    expect.assertions(1);

    expect(APP_CONFIG.releaseDate).toStrictEqual(`unknown`);
  });

  it(`should not have some release notes`, (): void => {
    expect.assertions(1);

    expect(APP_CONFIG.releaseNotes).toStrictEqual(``);
  });

  it(`should have a total of release count to 0`, (): void => {
    expect.assertions(1);

    expect(APP_CONFIG.totalReleaseCount).toStrictEqual(0);
  });

  it(`should have an unknown version`, (): void => {
    expect.assertions(1);

    expect(APP_CONFIG.version).toStrictEqual(`unknown`);
  });
});
