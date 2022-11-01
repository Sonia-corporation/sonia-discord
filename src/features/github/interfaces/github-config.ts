import { IPersonalAccessToken } from '../types/personal-access-token';

export interface IGithubConfig {
  readonly bugReportUrl: string;
  readonly personalAccessToken: IPersonalAccessToken;
}
