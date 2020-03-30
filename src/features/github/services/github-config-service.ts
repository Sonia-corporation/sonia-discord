import _ from "lodash";
import { AbstractConfigService } from "../../../classes/abstract-config-service";
import { PartialNested } from "../../../types/partial-nested";
import { GITHUB_CONFIG } from "../constants/github-config";
import { IGithubConfig } from "../interfaces/github-config";

export class GithubConfigService extends AbstractConfigService<IGithubConfig> {
  private static _instance: GithubConfigService;

  public static getInstance(
    config?: Readonly<PartialNested<IGithubConfig>>
  ): GithubConfigService {
    if (_.isNil(GithubConfigService._instance)) {
      GithubConfigService._instance = new GithubConfigService(config);
    }

    return GithubConfigService._instance;
  }

  protected readonly _className = `GithubConfigService`;

  protected constructor(config?: Readonly<PartialNested<IGithubConfig>>) {
    super(config);
  }

  // @todo add coverage
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

  public getGithub(): IGithubConfig {
    return GITHUB_CONFIG;
  }

  public getBugReportUrl(): string {
    return GITHUB_CONFIG.bugReportUrl;
  }

  public updateBugReportUrl(bugReportUrl?: Readonly<string>): void {
    GITHUB_CONFIG.bugReportUrl = this._configService.getUpdatedString({
      context: this._className,
      newValue: bugReportUrl,
      oldValue: GITHUB_CONFIG.bugReportUrl,
      valueName: `bug report url`,
    });
  }

  public getPersonalAccessToken(): string {
    return GITHUB_CONFIG.personalAccessToken;
  }

  public updatePersonalAccessToken(
    personalAccessToken?: Readonly<string>
  ): void {
    GITHUB_CONFIG.personalAccessToken = this._configService.getUpdatedString({
      context: this._className,
      isValueHidden: true,
      newValue: personalAccessToken,
      oldValue: GITHUB_CONFIG.personalAccessToken,
      valueName: `personal access token`,
    });
  }
}
