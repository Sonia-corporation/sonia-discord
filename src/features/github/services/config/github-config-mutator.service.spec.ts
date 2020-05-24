import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config.service";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core.service";
import { GithubConfigMutatorService } from "./github-config-mutator.service";
import { GithubConfigService } from "./github-config.service";

jest.mock(`../../../time/services/time.service`);
jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`GithubConfigMutatorService`, (): void => {
  let service: GithubConfigMutatorService;
  let configService: ConfigService;
  let githubConfigCoreService: GithubConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    githubConfigCoreService = GithubConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IGithubConfig> | undefined;

    beforeEach((): void => {
      config = {
        bugReportUrl: `dummy-bug-report-url`,
        personalAccessToken: `dummy-personal-access-token`,
      };
    });

    it(`should create a GithubConfigMutator service`, (): void => {
      expect.assertions(1);

      service = GithubConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(GithubConfigMutatorService));
    });

    it(`should return the created GithubConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = GithubConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IGithubConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the GithubConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new GithubConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.GITHUB_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current bug report url`, (): void => {
        expect.assertions(1);
        githubConfigCoreService.bugReportUrl = `bugReportUrl`;

        service = new GithubConfigMutatorService(config);

        expect(githubConfigCoreService.bugReportUrl).toStrictEqual(
          `bugReportUrl`
        );
      });

      it(`should not update the current personal access token`, (): void => {
        expect.assertions(1);
        githubConfigCoreService.personalAccessToken = `personalAccessToken`;

        service = new GithubConfigMutatorService(config);

        expect(githubConfigCoreService.personalAccessToken).toStrictEqual(
          `personalAccessToken`
        );
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          bugReportUrl: `dummy-bug-report-url`,
          personalAccessToken: `dummy-personal-access-token`,
        };
      });

      it(`should override the bug report url`, (): void => {
        expect.assertions(1);
        githubConfigCoreService.bugReportUrl = `bugReportUrl`;

        service = new GithubConfigMutatorService(config);

        expect(githubConfigCoreService.bugReportUrl).toStrictEqual(
          `dummy-bug-report-url`
        );
      });

      it(`should override the personal access token`, (): void => {
        expect.assertions(1);
        githubConfigCoreService.personalAccessToken = `personalAccessToken`;

        service = new GithubConfigMutatorService(config);

        expect(githubConfigCoreService.personalAccessToken).toStrictEqual(
          `dummy-personal-access-token`
        );
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let githubConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let githubConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = GithubConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      githubConfigCoreServiceGetInstanceSpy = jest.spyOn(
        GithubConfigCoreService,
        `getInstance`
      );
      githubConfigServiceGetInstanceSpy = jest.spyOn(
        GithubConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the GithubConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(githubConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(githubConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the GithubConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(githubConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(githubConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IGithubConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = GithubConfigMutatorService.getInstance();
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(2);

      service.updateConfig();

      expect(githubConfigCoreService.bugReportUrl).toStrictEqual(
        `dummy-bug-report-url`
      );
      expect(githubConfigCoreService.personalAccessToken).toStrictEqual(
        `dummy-personal-access-token`
      );
    });

    it(`should not log about the config update`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(loggerLogSpy).not.toHaveBeenCalled();
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

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
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

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[GithubConfigMutatorService][now-format] text-configuration updated`
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

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[GithubConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateBugReportUrl()`, (): void => {
    let bugReportUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = GithubConfigMutatorService.getInstance();
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
      service = GithubConfigMutatorService.getInstance();
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
