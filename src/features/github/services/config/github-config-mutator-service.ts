import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config-service";
import { PartialNested } from "../../../../types/partial-nested";
import { GithubConfigValueNameEnum } from "../../enums/github-config-value-name.enum";
import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core-service";
import { GithubConfigService } from "./github-config-service";

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

  protected readonly _className = `GithubConfigMutatorService`;
  private readonly _githubConfigCoreService = GithubConfigCoreService.getInstance();
  private readonly _githubConfigService = GithubConfigService.getInstance();

  protected constructor(config?: Readonly<PartialNested<IGithubConfig>>) {
    super(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IGithubConfig>>): void {
    if (!_.isNil(config)) {
      this.updateBugReportUrl(config.bugReportUrl);
      this.updatePersonalAccessToken(config.personalAccessToken);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateBugReportUrl(bugReportUrl?: Readonly<string>): void {
    this._githubConfigCoreService.bugReportUrl = this._configService.getUpdatedString(
      {
        context: this._className,
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
        context: this._className,
        isValueHidden: true,
        newValue: personalAccessToken,
        oldValue: this._githubConfigService.getPersonalAccessToken(),
        valueName: GithubConfigValueNameEnum.PERSONAL_ACCESS_TOKEN,
      }
    );
  }
}
