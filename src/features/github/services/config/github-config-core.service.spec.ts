import { GithubConfigCoreService } from './github-config-core.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';

describe(`GithubConfigCoreService`, (): void => {
  let service: GithubConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a GithubConfigCore service`, (): void => {
      expect.assertions(1);

      service = GithubConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(GithubConfigCoreService));
    });

    it(`should return the created GithubConfigCore service`, (): void => {
      expect.assertions(1);

      const result = GithubConfigCoreService.getInstance();

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

    it(`should notify the GithubConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new GithubConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.GITHUB_CONFIG_CORE_SERVICE);
    });
  });

  it(`should have a bug report url for the GitHub Sonia discord repository with a bug label and a bug report template`, (): void => {
    expect.assertions(1);

    service = GithubConfigCoreService.getInstance();

    expect(service.bugReportUrl).toBe(
      `https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=bug&template=bug_report.md&projects=sonia-corporation/sonia-discord/1&title=[BUG]%20`
    );
  });

  it(`should have an unknown personal access token`, (): void => {
    expect.assertions(1);

    service = GithubConfigCoreService.getInstance();

    expect(service.personalAccessToken).toBe(`unknown`);
  });
});
