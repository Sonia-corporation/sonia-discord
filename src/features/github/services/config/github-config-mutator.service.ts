import { GithubConfigCoreService } from './github-config-core.service';
import { GithubConfigService } from './github-config.service';
import { AbstractConfigService } from '../../../../classes/services/abstract-config.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../types/partial-nested';
import { ConfigService } from '../../../config/services/config.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { GithubConfigValueNameEnum } from '../../enums/github-config-value-name.enum';
import { IGithubConfig } from '../../interfaces/github-config';
import _ from 'lodash';

export class GithubConfigMutatorService extends AbstractConfigService<IGithubConfig> {
  private static _instance: GithubConfigMutatorService;

  public static getInstance(config?: Readonly<IPartialNested<IGithubConfig>>): GithubConfigMutatorService {
    if (_.isNil(GithubConfigMutatorService._instance)) {
      GithubConfigMutatorService._instance = new GithubConfigMutatorService(config);
    }

    return GithubConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IGithubConfig>>) {
    super(ServiceNameEnum.GITHUB_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    GithubConfigCoreService.getInstance();
    GithubConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IGithubConfig>>): void {
    if (!_.isNil(config)) {
      this.updateBugReportUrl(config.bugReportUrl);
      this.updatePersonalAccessToken(config.personalAccessToken);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateBugReportUrl(bugReportUrl?: Readonly<string>): void {
    GithubConfigCoreService.getInstance().bugReportUrl = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: bugReportUrl,
      oldValue: GithubConfigService.getInstance().getBugReportUrl(),
      valueName: GithubConfigValueNameEnum.BUG_REPORT_URL,
    });
  }

  public updatePersonalAccessToken(personalAccessToken?: Readonly<string>): void {
    GithubConfigCoreService.getInstance().personalAccessToken = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      isValueHidden: true,
      newValue: personalAccessToken,
      oldValue: GithubConfigService.getInstance().getPersonalAccessToken(),
      valueName: GithubConfigValueNameEnum.PERSONAL_ACCESS_TOKEN,
    });
  }
}
