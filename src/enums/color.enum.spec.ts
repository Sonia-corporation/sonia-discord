import { ColorEnum } from "./color.enum";

describe(`ColorEnum`, (): void => {
  it(`should have a member "CANDY"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.CANDY).toStrictEqual(15562905);
  });

  it(`should have a member "DESERT"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.DESERT).toStrictEqual(15718590);
  });

  it(`should have a member "MINT"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.MINT).toStrictEqual(7522991);
  });

  it(`should have a member "SILK"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.SILK).toStrictEqual(14082034);
  });

  it(`should have a member "SKY"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.SKY).toStrictEqual(11912416);
  });

  it(`should have a member "SUN"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.SUN).toStrictEqual(16376750);
  });
});
