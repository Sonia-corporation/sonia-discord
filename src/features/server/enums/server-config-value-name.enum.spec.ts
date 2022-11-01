import { ServerConfigValueNameEnum } from './server-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`ServerConfigValueNameEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ServerConfigValueNameEnum)).toBe(1);
  });

  it(`should have a member "PORT"`, (): void => {
    expect.assertions(1);

    expect(ServerConfigValueNameEnum.PORT).toBe(`port`);
  });
});
