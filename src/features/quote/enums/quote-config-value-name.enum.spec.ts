import { QuoteConfigValueNameEnum } from './quote-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`QuoteConfigValueNameEnum`, (): void => {
  it(`should have 4 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(QuoteConfigValueNameEnum)).toBe(4);
  });

  it(`should have a member "API_KEY"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.API_KEY).toBe(`api key`);
  });

  it(`should have a member "AUTHOR_ICON_URL"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.AUTHOR_ICON_URL).toBe(`author icon url`);
  });

  it(`should have a member "IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.IMAGE_COLOR).toBe(`image color`);
  });

  it(`should have a member "IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.IMAGE_URL).toBe(`image url`);
  });
});
