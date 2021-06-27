import { GithubConfigValueNameEnum } from './github-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`GithubConfigValueNameEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(GithubConfigValueNameEnum)).toStrictEqual(2);
  });

  it(`should have a member "BUG_REPORT_URL"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.BUG_REPORT_URL).toStrictEqual(`bug report url`);
  });

  it(`should have a member "PERSONAL_ACCESS_TOKEN"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.PERSONAL_ACCESS_TOKEN).toStrictEqual(`personal access token`);
  });
});
