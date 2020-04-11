import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { IGithubConfig } from "../../interfaces/github-config";
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

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IGithubConfig> | undefined;

    beforeEach((): void => {
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(githubConfigCoreService.bugReportUrl).toStrictEqual(
          `dummy-bug-report-url`
        );
        expect(githubConfigCoreService.personalAccessToken).toStrictEqual(
          `dummy-personal-access-token`
        );
      });
    });

    describe(`when the given config contains a bug report url`, (): void => {
      beforeEach((): void => {
        config = {
          bugReportUrl: `bug-report-url`,
        };
      });

      it(`should update the config bug report url`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(githubConfigCoreService.bugReportUrl).toStrictEqual(
          `bug-report-url`
        );
      });
    });

    describe(`when the given config contains a personal access token`, (): void => {
      beforeEach((): void => {
        config = {
          personalAccessToken: `personal-access-token`,
        };
      });

      it(`should update the config personal access token`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(githubConfigCoreService.personalAccessToken).toStrictEqual(
          `personal-access-token`
        );
      });
    });
  });

  describe(`updateBugReportUrl()`, (): void => {
    let bugReportUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      bugReportUrl = `bug-report-url`;
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`bug-report-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateBugReportUrl(bugReportUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
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

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      personalAccessToken = `personal-access-token`;
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`personal-access-token`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updatePersonalAccessToken(personalAccessToken);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
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
