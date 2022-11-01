import { GithubConfigCoreService } from './github-config-core.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IGithubConfig } from '../../interfaces/github-config';
import { ISecretPersonalAccessToken } from '../../types/secret-personal-access-token';
import _ from 'lodash';

export class GithubConfigService extends AbstractService {
  private static _instance: GithubConfigService;

  public static getInstance(): GithubConfigService {
    if (_.isNil(GithubConfigService._instance)) {
      GithubConfigService._instance = new GithubConfigService();
    }

    return GithubConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.GITHUB_CONFIG_SERVICE);
  }

  public getConfig(): IGithubConfig {
    return {
      bugReportUrl: this.getBugReportUrl(),
      personalAccessToken: this.getPersonalAccessToken(),
    };
  }

  public getBugReportUrl(): string {
    return GithubConfigCoreService.getInstance().bugReportUrl;
  }

  public getPersonalAccessToken(): ISecretPersonalAccessToken | never {
    const { personalAccessToken } = GithubConfigCoreService.getInstance();

    if (personalAccessToken === `unknown`) {
      throw new Error(`Hard-coded personal access token is still used! Something is wrong with the configuration!`);
    }

    return personalAccessToken;
  }
}
