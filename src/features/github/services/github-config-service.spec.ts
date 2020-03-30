import { IConfigUpdateString } from "../../config/interfaces/config-update-string";
import { ConfigService } from "../../config/services/config-service";
import { GITHUB_CONFIG } from "../constants/github-config";
import { IGithubConfig } from "../interfaces/github-config";
import { GithubConfigService } from "./github-config-service";

jest.mock(`../../config/services/config-service`);

describe(`GithubConfigService`, (): void => {
  let service: GithubConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = GithubConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getGithub()`, (): void => {
    beforeEach((): void => {
      GITHUB_CONFIG.bugReportUrl = `dummy-bug-report-url`;
      GITHUB_CONFIG.personalAccessToken = `dummy-personal-access-token`;
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
      GITHUB_CONFIG.bugReportUrl = `dummy-bug-report-url`;
    });

    it(`should return the GitHub config bug report url`, (): void => {
      expect.assertions(1);

      const result = service.getBugReportUrl();

      expect(result).toStrictEqual(`dummy-bug-report-url`);
    });
  });

  describe(`updateBugReportUrl()`, (): void => {
    let bugReportUrl: string;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      bugReportUrl = `bug-report-url`;
      GITHUB_CONFIG.bugReportUrl = `dummy-bug-report-url`;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`bug-report-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateBugReportUrl(bugReportUrl);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `GithubConfigService`,
        newValue: `bug-report-url`,
        oldValue: `dummy-bug-report-url`,
        valueName: `bug report url`,
      } as IConfigUpdateString);
    });

    it(`should update the GitHub config bug report url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateBugReportUrl(bugReportUrl);

      expect(GITHUB_CONFIG.bugReportUrl).toStrictEqual(`bug-report-url`);
    });
  });

  describe(`getPersonalAccessToken()`, (): void => {
    beforeEach((): void => {
      GITHUB_CONFIG.personalAccessToken = `dummy-personal-access-token`;
    });

    it(`should return the GitHub config personal access token`, (): void => {
      expect.assertions(1);

      const result = service.getPersonalAccessToken();

      expect(result).toStrictEqual(`dummy-personal-access-token`);
    });
  });

  describe(`updatePersonalAccessToken()`, (): void => {
    let personalAccessToken: string;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      personalAccessToken = `personal-access-token`;
      GITHUB_CONFIG.personalAccessToken = `dummy-personal-access-token`;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`personal-access-token`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updatePersonalAccessToken(personalAccessToken);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `GithubConfigService`,
        isValueHidden: true,
        newValue: `personal-access-token`,
        oldValue: `dummy-personal-access-token`,
        valueName: `personal access token`,
      } as IConfigUpdateString);
    });

    it(`should update the GitHub config personal access token with the updated string`, (): void => {
      expect.assertions(1);

      service.updatePersonalAccessToken(personalAccessToken);

      expect(GITHUB_CONFIG.personalAccessToken).toStrictEqual(
        `personal-access-token`
      );
    });
  });
});
