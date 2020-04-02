import { ServerConfigValueNameEnum } from "./server-config-value-name.enum";

describe(`ServerConfigValueNameEnum`, (): void => {
  it(`should have a member "PORT"`, (): void => {
    expect.assertions(1);

    expect(ServerConfigValueNameEnum.PORT).toStrictEqual(`port`);
  });
});
