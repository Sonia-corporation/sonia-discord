import { StoreNameEnum } from './store-name.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`StoreNameEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(StoreNameEnum)).toBe(1);
  });

  it(`should have a member "GUILDS"`, (): void => {
    expect.assertions(1);

    expect(StoreNameEnum.GUILDS).toStrictEqual(`guilds`);
  });
});
