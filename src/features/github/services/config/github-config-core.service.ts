import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IGithubConfig } from '../../interfaces/github-config';
import { IPersonalAccessToken } from '../../types/personal-access-token';
import _ from 'lodash';

export class GithubConfigCoreService extends AbstractService implements IGithubConfig {
  private static _instance: GithubConfigCoreService;

  public static getInstance(): GithubConfigCoreService {
    if (_.isNil(GithubConfigCoreService._instance)) {
      GithubConfigCoreService._instance = new GithubConfigCoreService();
    }

    return GithubConfigCoreService._instance;
  }

  public bugReportUrl = `https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=bug&template=bug_report.md&projects=sonia-corporation/sonia-discord/1&title=[BUG]%20`;
  public featureRequestUrl = `https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+`;
  public personalAccessToken: IPersonalAccessToken = `unknown`;

  public constructor() {
    super(ServiceNameEnum.GITHUB_CONFIG_CORE_SERVICE);
  }
}
