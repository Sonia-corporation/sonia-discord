import { ServiceNameEnum } from "./service-name.enum";

describe(`ServiceNameEnum`, (): void => {
  it(`should have a member "APP_CONFIG_QUERY_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.APP_CONFIG_QUERY_SERVICE).toStrictEqual(
      `AppConfigQueryService`
    );
  });
});
