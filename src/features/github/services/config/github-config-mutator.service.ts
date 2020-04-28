import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { LoggerService } from "../../../logger/services/logger.service";
import { GithubConfigValueNameEnum } from "../../enums/github-config-value-name.enum";
import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core.service";
import { GithubConfigService } from "./github-config.service";

export class GithubConfigMutatorService extends AbstractConfigService<
  IGithubConfig
> {
  private static _instance: GithubConfigMutatorService;

  public static getInstance(
    config?: Readonly<PartialNested<IGithubConfig>>
  ): GithubConfigMutatorService {
    if (_.isNil(GithubConfigMutatorService._instance)) {
      GithubConfigMutatorService._instance = new GithubConfigMutatorService(
        config
      );
    }

    return GithubConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _githubConfigCoreService: GithubConfigCoreService = GithubConfigCoreService.getInstance();
  private _githubConfigService: GithubConfigService = GithubConfigService.getInstance();

  public constructor(config?: Readonly<PartialNested<IGithubConfig>>) {
    super(ServiceNameEnum.GITHUB_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._githubConfigCoreService = GithubConfigCoreService.getInstance();
    this._githubConfigService = GithubConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<PartialNested<IGithubConfig>>): void {
    if (!_.isNil(config)) {
      this.updateBugReportUrl(config.bugReportUrl);
      this.updatePersonalAccessToken(config.personalAccessToken);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateBugReportUrl(bugReportUrl?: Readonly<string>): void {
    this._githubConfigCoreService.bugReportUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: bugReportUrl,
        oldValue: this._githubConfigService.getBugReportUrl(),
        valueName: GithubConfigValueNameEnum.BUG_REPORT_URL,
      }
    );
  }

  public updatePersonalAccessToken(
    personalAccessToken?: Readonly<string>
  ): void {
    this._githubConfigCoreService.personalAccessToken = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        isValueHidden: true,
        newValue: personalAccessToken,
        oldValue: this._githubConfigService.getPersonalAccessToken(),
        valueName: GithubConfigValueNameEnum.PERSONAL_ACCESS_TOKEN,
      }
    );
  }
}
