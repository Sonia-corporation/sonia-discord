import { ColorEnum } from './color.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`ColorEnum`, (): void => {
  it(`should have 14 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ColorEnum)).toBe(14);
  });

  it(`should have a member "CANDY"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.CANDY).toBe(15562905);
  });

  it(`should have a member "DEAD"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.DEAD).toBe(9146008);
  });

  it(`should have a member "DESERT"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.DESERT).toBe(15718590);
  });

  it(`should have a member "MINT"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.MINT).toBe(7522991);
  });

  it(`should have a member "SILK"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.SILK).toBe(14082034);
  });

  it(`should have a member "SKY"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.SKY).toBe(11912416);
  });

  it(`should have a member "SUN"`, (): void => {
    expect.assertions(1);

    expect(ColorEnum.SUN).toBe(16376750);
  });
});
