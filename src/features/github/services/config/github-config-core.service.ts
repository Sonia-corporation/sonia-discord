import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IGithubConfig } from '../../interfaces/github-config';
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
  public personalAccessToken = `unknown`;

  public constructor() {
    super(ServiceNameEnum.GITHUB_CONFIG_CORE_SERVICE);
  }
}
