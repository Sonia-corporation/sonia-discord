import { StoreNameEnum } from "./store-name.enum";

describe(`StoreNameEnum`, (): void => {
  it(`should have a member "GUILDS"`, (): void => {
    expect.assertions(1);

    expect(StoreNameEnum.GUILDS).toStrictEqual(`guilds`);
  });
});
