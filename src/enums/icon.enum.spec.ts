import { IconEnum } from './icon.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`IconEnum`, (): void => {
  it(`should have 16 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(IconEnum)).toBe(16);
  });

  it(`should have a member "ALARM"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.ALARM).toStrictEqual(`https://i.ibb.co/S7BxtDh/icons8-alarm-512.png`);
  });

  it(`should have a member "ARTIFICIAL_INTELLIGENCE"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.ARTIFICIAL_INTELLIGENCE).toStrictEqual(
      `https://i.ibb.co/ph17BqP/icons8-artificial-intelligence-512.png`
    );
  });

  it(`should have a member "BUG"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.BUG).toStrictEqual(`https://i.ibb.co/r7PHJS1/icons8-bug-512.png`);
  });

  it(`should have a member "CANCEL"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.CANCEL).toStrictEqual(`https://i.ibb.co/cLM30Xb/icons8-cancel-512.png`);
  });

  it(`should have a member "COOKIES"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.COOKIES).toStrictEqual(`https://i.ibb.co/RTp4YPx/icons8-cookies-512.png`);
  });

  it(`should have a member "DEADBUG"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.DEADBUG).toStrictEqual(`https://i.ibb.co/CmxGZG1/icons8-deadbug-512.png`);
  });

  it(`should have a member "ERROR"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.ERROR).toStrictEqual(`https://i.ibb.co/5jZmzSB/icons8-error-512.png`);
  });

  it(`should have a member "FUTURAMA_PROFESSOR_FARNSWORTH"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.FUTURAMA_PROFESSOR_FARNSWORTH).toStrictEqual(
      `https://i.ibb.co/4SsVxDQ/icons8-futurama-professor-farnsworth-512.png`
    );
  });

  it(`should have a member "GIRL"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.GIRL).toStrictEqual(`https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`);
  });

  it(`should have a member "INFORMATION"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.INFORMATION).toStrictEqual(`https://i.ibb.co/vLSnVk6/icons8-information-512.png`);
  });

  it(`should have a member "MOTIVATION_DAILY_QUOTES"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.MOTIVATION_DAILY_QUOTES).toStrictEqual(
      `https://i.ibb.co/qJDxmc8/icons8-motivation-daily-quotes-512.png`
    );
  });

  it(`should have a member "NEW"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.NEW).toStrictEqual(`https://i.ibb.co/YjzVm0c/icons8-new-512.png`);
  });

  it(`should have a member "NEW_PRODUCT"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.NEW_PRODUCT).toStrictEqual(`https://i.ibb.co/9p3Q17S/icons8-new-product-512.png`);
  });

  it(`should have a member "RESTAURANT"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.RESTAURANT).toStrictEqual(`https://i.ibb.co/vXwNzWD/icons8-restaurant-512.png`);
  });

  it(`should have a member "THE_FLASH_SIGN"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.THE_FLASH_SIGN).toStrictEqual(`https://i.ibb.co/JkmQvS1/icons8-the-flash-sign-512.png`);
  });

  it(`should have a member "WARNING_SHIELD"`, (): void => {
    expect.assertions(1);

    expect(IconEnum.WARNING_SHIELD).toStrictEqual(`https://i.ibb.co/41ccwXn/icons8-warning-shield-512.png`);
  });
});
