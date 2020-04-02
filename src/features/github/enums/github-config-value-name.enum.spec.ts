import { GithubConfigValueNameEnum } from "./github-config-value-name.enum";

describe(`GithubConfigValueNameEnum`, (): void => {
  it(`should have a member "BUG_REPORT_URL"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.BUG_REPORT_URL).toStrictEqual(
      `bug report url`
    );
  });

  it(`should have a member "PERSONAL_ACCESS_TOKEN"`, (): void => {
    expect.assertions(1);

    expect(GithubConfigValueNameEnum.PERSONAL_ACCESS_TOKEN).toStrictEqual(
      `personal access token`
    );
  });
});
