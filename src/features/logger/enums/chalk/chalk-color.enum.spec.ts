import { ChalkColorEnum } from './chalk-color.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`ChalkColorEnum`, (): void => {
  it(`should have 9 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ChalkColorEnum)).toBe(9);
  });

  it(`should have a member "AURORA_GREEN"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.AURORA_GREEN).toBe(`#78E08F`);
  });

  it(`should have a member "BLUE_CARACAO"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.BLUE_CARACAO).toBe(`#3DC1D3`);
  });

  it(`should have a member "DEEP_ROSE"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.DEEP_ROSE).toBe(`#C44569`);
  });

  it(`should have a member "ROSY_HIGHLIGHT"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.ROSY_HIGHLIGHT).toBe(`#F7D794`);
  });

  it(`should have a member "WHITE"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.WHITE).toBe(`#FFFFFF`);
  });

  it(`should have a member "SOFT_BLUE"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.SOFT_BLUE).toBe(`#778BEB`);
  });

  it(`should have a member "PURPLE_MOUNTAIN_MAJESTY"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.PURPLE_MOUNTAIN_MAJESTY).toBe(`#786FA6`);
  });

  it(`should have a member "SAWTOOTH_AAK"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.SAWTOOTH_AAK).toBe(`#F19066`);
  });

  it(`should have a member "OLD_GERANIUM"`, (): void => {
    expect.assertions(1);

    expect(ChalkColorEnum.OLD_GERANIUM).toBe(`#CF6A87`);
  });
});
