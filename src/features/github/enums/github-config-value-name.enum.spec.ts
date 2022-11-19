import { GithubConfigValueNameEnum } from './github-config-value-name.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`GithubConfigValueNameEnum`, (): void => {
  it(`should have 3 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(GithubConfigValueNameEnum)).toBe(3);
  });

  it(`should have a member "BUG_REPORT_URL"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.BUG_REPORT_URL).toBe(`bug report url`);
  });

  it(`should have a member "FEATURE_REQUEST_URL"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.FEATURE_REQUEST_URL).toBe(`feature request url`);
  });

  it(`should have a member "PERSONAL_ACCESS_TOKEN"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.PERSONAL_ACCESS_TOKEN).toBe(`personal access token`);
  });
});
