import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { IGithubConfig } from "../../interfaces/github-config";
import { GithubConfigCoreService } from "./github-config-core.service";

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

  public getPersonalAccessToken(): string {
    return GithubConfigCoreService.getInstance().personalAccessToken;
  }
}
