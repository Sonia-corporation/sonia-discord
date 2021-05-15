import { QuoteConfigValueNameEnum } from './quote-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`QuoteConfigValueNameEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(QuoteConfigValueNameEnum)).toStrictEqual(1);
  });

  it(`should have a member "API_KEY"`, (): void => {
    expect.assertions(1);

    expect(QuoteConfigValueNameEnum.API_KEY).toStrictEqual(`api key`);
  });
});
