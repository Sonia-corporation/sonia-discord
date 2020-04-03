import _ from "lodash";
import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core-service";

export class GithubConfigService {
  private static _instance: GithubConfigService;

  public static getInstance(): GithubConfigService {
    if (_.isNil(GithubConfigService._instance)) {
      GithubConfigService._instance = new GithubConfigService();
    }

    return GithubConfigService._instance;
  }

  private readonly _githubConfigCoreService = GithubConfigCoreService.getInstance();

  public getConfig(): IGithubConfig {
    return {
      bugReportUrl: this.getBugReportUrl(),
      personalAccessToken: this.getPersonalAccessToken(),
    };
  }

  public getBugReportUrl(): string {
    return this._githubConfigCoreService.bugReportUrl;
  }

  public getPersonalAccessToken(): string {
    return this._githubConfigCoreService.personalAccessToken;
  }
}
