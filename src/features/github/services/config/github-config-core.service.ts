import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { IGithubConfig } from "../../interfaces/github-config";

export class GithubConfigCoreService extends AbstractService
  implements IGithubConfig {
  private static _instance: GithubConfigCoreService;

  public static getInstance(): GithubConfigCoreService {
    if (_.isNil(GithubConfigCoreService._instance)) {
      GithubConfigCoreService._instance = new GithubConfigCoreService();
    }

    return GithubConfigCoreService._instance;
  }

  public bugReportUrl = `https://github.com/Sonia-corporation/il-est-midi-discord/issues/new?labels=bug&template=bug_report.md&projects=sonia-corporation/il-est-midi-discord/1&title=[BUG]%20`;
  public personalAccessToken = `unknown`;

  public constructor() {
    super(ServiceNameEnum.GITHUB_CONFIG_CORE_SERVICE);
  }
}
