import { GithubConfigCoreService } from "./github-config-core.service";

jest.mock(`../../../config/services/config.service`);

describe(`GithubConfigCoreService`, (): void => {
  let service: GithubConfigCoreService;

  beforeEach((): void => {
    service = GithubConfigCoreService.getInstance();
  });

  it(`should have a bug report url for the GitHub Sonia il est midi discord repository with a bug label and a bug report template`, (): void => {
    expect.assertions(1);

    expect(service.bugReportUrl).toStrictEqual(
      `https://github.com/Sonia-corporation/il-est-midi-discord/issues/new?labels=bug&template=bug_report.md&projects=sonia-corporation/il-est-midi-discord/1`
    );
  });

  it(`should have an unknown personal access token`, (): void => {
    expect.assertions(1);

    expect(service.personalAccessToken).toStrictEqual(`unknown`);
  });
});
