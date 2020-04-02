import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core-service";
import { GithubConfigService } from "./github-config-service";

jest.mock(`../../../config/services/config-service`);

describe(`GithubConfigService`, (): void => {
  let service: GithubConfigService;
  let githubConfigCoreService: GithubConfigCoreService;

  beforeEach((): void => {
    service = GithubConfigService.getInstance();
    githubConfigCoreService = GithubConfigCoreService.getInstance();
  });

  describe(`getGithub()`, (): void => {
    beforeEach((): void => {
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;
    });

    it(`should return the Discord message config`, (): void => {
      expect.assertions(1);

      const result = service.getGithub();

      expect(result).toStrictEqual({
        bugReportUrl: `dummy-bug-report-url`,
        personalAccessToken: `dummy-personal-access-token`,
      } as IGithubConfig);
    });
  });

  describe(`getBugReportUrl()`, (): void => {
    beforeEach((): void => {
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;
    });

    it(`should return the GitHub config bug report url`, (): void => {
      expect.assertions(1);

      const result = service.getBugReportUrl();

      expect(result).toStrictEqual(`dummy-bug-report-url`);
    });
  });

  describe(`getPersonalAccessToken()`, (): void => {
    beforeEach((): void => {
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;
    });

    it(`should return the GitHub config personal access token`, (): void => {
      expect.assertions(1);

      const result = service.getPersonalAccessToken();

      expect(result).toStrictEqual(`dummy-personal-access-token`);
    });
  });
});
