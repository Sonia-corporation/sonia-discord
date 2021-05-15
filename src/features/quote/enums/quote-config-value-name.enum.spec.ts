import { QuoteConfigValueNameEnum } from './quote-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`QuoteConfigValueNameEnum`, (): void => {
  it(`should have a 3 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(QuoteConfigValueNameEnum)).toStrictEqual(3);
  });

  it(`should have a member "API_KEY"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.API_KEY).toStrictEqual(`api key`);
  });

  it(`should have a member "IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.IMAGE_COLOR).toStrictEqual(`image color`);
  });

  it(`should have a member "IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.IMAGE_URL).toStrictEqual(`image url`);
  });
});
