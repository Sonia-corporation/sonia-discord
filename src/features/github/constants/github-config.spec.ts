import { GITHUB_CONFIG } from "./github-config";

describe(`GITHUB_CONFIG`, (): void => {
  it(`should have a bug report url for the GitHub Sonia il est midi discord repository with a bug label and a bug report template`, (): void => {
    expect.assertions(1);

    expect(GITHUB_CONFIG.bugReportUrl).toStrictEqual(
      `https://github.com/Sonia-corporation/il-est-midi-discord/issues/new?labels=bug&template=bug_report.md&projects=sonia-corporation/il-est-midi-discord/1`
    );
  });

  it(`should have an unknown personal access token`, (): void => {
    expect.assertions(1);

    expect(GITHUB_CONFIG.personalAccessToken).toStrictEqual(`unknown`);
  });
});
