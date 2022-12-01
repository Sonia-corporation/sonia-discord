import { StoreNameEnum } from './store-name.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`StoreNameEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(StoreNameEnum)).toBe(2);
  });

  it(`should have a member "DMS"`, (): void => {
    expect.assertions(1);

    expect(StoreNameEnum.DMS).toBe(`dms`);
  });

  it(`should have a member "GUILDS"`, (): void => {
    expect.assertions(1);

    expect(StoreNameEnum.GUILDS).toBe(`guilds`);
  });
});
