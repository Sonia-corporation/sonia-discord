import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { GithubConfigCoreService } from "./github-config-core-service";
import { GithubConfigMutatorService } from "./github-config-mutator-service";

jest.mock(`../../../config/services/config-service`);

describe(`GithubConfigMutatorService`, (): void => {
  let service: GithubConfigMutatorService;
  let configService: ConfigService;
  let githubConfigCoreService: GithubConfigCoreService;

  beforeEach((): void => {
    service = GithubConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    githubConfigCoreService = GithubConfigCoreService.getInstance();
  });

  describe(`updateBugReportUrl()`, (): void => {
    let bugReportUrl: string;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      bugReportUrl = `bug-report-url`;
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`bug-report-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateBugReportUrl(bugReportUrl);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `GithubConfigMutatorService`,
        newValue: `bug-report-url`,
        oldValue: `dummy-bug-report-url`,
        valueName: `bug report url`,
      } as IConfigUpdateString);
    });

    it(`should update the GitHub config bug report url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateBugReportUrl(bugReportUrl);

      expect(githubConfigCoreService.bugReportUrl).toStrictEqual(
        `bug-report-url`
      );
    });
  });

  describe(`updatePersonalAccessToken()`, (): void => {
    let personalAccessToken: string;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      personalAccessToken = `personal-access-token`;
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`personal-access-token`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updatePersonalAccessToken(personalAccessToken);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `GithubConfigMutatorService`,
        isValueHidden: true,
        newValue: `personal-access-token`,
        oldValue: `dummy-personal-access-token`,
        valueName: `personal access token`,
      } as IConfigUpdateString);
    });

    it(`should update the GitHub config personal access token with the updated string`, (): void => {
      expect.assertions(1);

      service.updatePersonalAccessToken(personalAccessToken);

      expect(githubConfigCoreService.personalAccessToken).toStrictEqual(
        `personal-access-token`
      );
    });
  });
});
