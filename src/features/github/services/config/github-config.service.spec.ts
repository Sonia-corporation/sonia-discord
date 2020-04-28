import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core.service";
import { GithubConfigService } from "./github-config.service";

describe(`GithubConfigService`, (): void => {
  let service: GithubConfigService;
  let githubConfigCoreService: GithubConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    githubConfigCoreService = GithubConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a GithubConfig service`, (): void => {
      expect.assertions(1);

      service = GithubConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(GithubConfigService));
    });

    it(`should return the created GithubConfig service`, (): void => {
      expect.assertions(1);

      const result = GithubConfigService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the GithubConfig service creation`, (): void => {
      expect.assertions(2);

      service = new GithubConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.GITHUB_CONFIG_SERVICE
      );
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = GithubConfigService.getInstance();
      githubConfigCoreService.bugReportUrl = `dummy-bug-report-url`;
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;
    });

    it(`should return the Discord message config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        bugReportUrl: `dummy-bug-report-url`,
        personalAccessToken: `dummy-personal-access-token`,
      } as IGithubConfig);
    });
  });

  describe(`getBugReportUrl()`, (): void => {
    beforeEach((): void => {
      service = GithubConfigService.getInstance();
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
      service = GithubConfigService.getInstance();
      githubConfigCoreService.personalAccessToken = `dummy-personal-access-token`;
    });

    it(`should return the GitHub config personal access token`, (): void => {
      expect.assertions(1);

      const result = service.getPersonalAccessToken();

      expect(result).toStrictEqual(`dummy-personal-access-token`);
    });
  });
});
