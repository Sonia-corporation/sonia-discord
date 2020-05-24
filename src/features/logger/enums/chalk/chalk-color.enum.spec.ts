import { ChalkColorEnum } from "./chalk-color.enum";

describe(`ChalkColorEnum`, (): void => {
  it(`should have a member "AURORA_GREEN"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.AURORA_GREEN).toStrictEqual(`#78E08F`);
  });

  it(`should have a member "BLUE_CARACAO"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.BLUE_CARACAO).toStrictEqual(`#3DC1D3`);
  });

  it(`should have a member "DEEP_ROSE"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.DEEP_ROSE).toStrictEqual(`#C44569`);
  });

  it(`should have a member "ROSY_HIGHLIGHT"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.ROSY_HIGHLIGHT).toStrictEqual(`#F7D794`);
  });

  it(`should have a member "WHITE"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.WHITE).toStrictEqual(`#FFFFFF`);
  });

  it(`should have a member "SOFT_BLUE"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.SOFT_BLUE).toStrictEqual(`#778BEB`);
  });

  it(`should have a member "PURPLE_MOUNTAIN_MAJESTY"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.PURPLE_MOUNTAIN_MAJESTY).toStrictEqual(`#786FA6`);
  });

  it(`should have a member "SAWTOOTH_AAK"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.SAWTOOTH_AAK).toStrictEqual(`#F19066`);
  });

  it(`should have a member "OLD_GERANIUM"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.OLD_GERANIUM).toStrictEqual(`#CF6A87`);
  });
});
