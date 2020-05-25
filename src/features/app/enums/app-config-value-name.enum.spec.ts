import { AppConfigValueNameEnum } from "./app-config-value-name.enum";

describe(`AppConfigValueNameEnum`, (): void => {
  it(`should have a member "FIRST_RELEASE_DATE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.FIRST_RELEASE_DATE).toStrictEqual(
      `first release date`
    );
  });

  it(`should have a member "INITIALIZATION_DATE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.INITIALIZATION_DATE).toStrictEqual(
      `initialization date`
    );
  });

  it(`should have a member "IS_PRODUCTION"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.IS_PRODUCTION).toStrictEqual(
      `production state`
    );
  });

  it(`should have a member "RELEASE_DATE"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.RELEASE_DATE).toStrictEqual(`release date`);
  });

  it(`should have a member "RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.RELEASE_NOTES).toStrictEqual(`release notes`);
  });

  it(`should have a member "TOTAL_RELEASE_COUNT"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.TOTAL_RELEASE_COUNT).toStrictEqual(
      `total release count`
    );
  });

  it(`should have a member "VERSION"`, (): void => {
    expect.assertions(1);

    expect(AppConfigValueNameEnum.VERSION).toStrictEqual(`version`);
  });
});
