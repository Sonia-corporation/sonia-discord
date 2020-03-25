import _ from 'lodash';
import { wrapInQuotes } from '../../../functions/wrap-in-quotes';
import { PartialNested } from '../../../types/partial-nested';
import { ChalkService } from '../../logger/services/chalk-service';
import { LoggerService } from '../../logger/services/logger-service';
import { GITHUB_CONFIG } from '../constants/github-config';
import { IGithubConfig } from '../interfaces/github-config';

export class GithubConfigService {
  private static _instance: GithubConfigService;

  public static getInstance(config?: Readonly<PartialNested<IGithubConfig>>): GithubConfigService {
    if (_.isNil(GithubConfigService._instance)) {
      GithubConfigService._instance = new GithubConfigService(config);
    }

    return GithubConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `GithubConfigService`;

  public constructor(config?: Readonly<PartialNested<IGithubConfig>>) {
    this.updateConfig(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IGithubConfig>>): void {
    if (!_.isNil(config)) {
      this.updatePersonalAccessToken(config.personalAccessToken);

      this._loggerService.debug(this._className, this._chalkService.text(`configuration updated`));
    }
  }

  public getPersonalAccessToken(): string {
    return GITHUB_CONFIG.personalAccessToken;
  }

  public updatePersonalAccessToken(token?: Readonly<string>): void {
    if (_.isString(token)) {
      GITHUB_CONFIG.personalAccessToken = token;

      this._loggerService.log(this._className, this._loggerService.getHiddenValueUpdate(`personal access token updated to:`, true));
    }
  }

  public getBugReportUrl(): string {
    return GITHUB_CONFIG.bugReportUrl;
  }

  public updateBugReportUrl(bugReportUrl?: Readonly<string>): void {
    if (_.isString(bugReportUrl)) {
      GITHUB_CONFIG.bugReportUrl = bugReportUrl;

      this._loggerService.log(this._className, this._chalkService.text(`bug report url updated to: ${this._chalkService.value(wrapInQuotes(GITHUB_CONFIG.bugReportUrl))}`));
    }
  }
}
