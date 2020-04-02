import _ from "lodash";
import { IGithubConfig } from "../../interfaces/github-config";

export class GithubConfigCoreService implements IGithubConfig {
  private static _instance: GithubConfigCoreService;

  public static getInstance(): GithubConfigCoreService {
    if (_.isNil(GithubConfigCoreService._instance)) {
      GithubConfigCoreService._instance = new GithubConfigCoreService();
    }

    return GithubConfigCoreService._instance;
  }

  public bugReportUrl = `https://github.com/Sonia-corporation/il-est-midi-discord/issues/new?labels=bug&template=bug_report.md&projects=sonia-corporation/il-est-midi-discord/1`;
  public personalAccessToken = `unknown`;
}
