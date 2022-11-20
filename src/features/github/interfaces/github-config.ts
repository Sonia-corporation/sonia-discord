import { IPersonalAccessToken } from '../types/personal-access-token';

export interface IGithubConfig {
  readonly bugReportUrl: string;
  readonly featureRequestUrl: string;
  readonly personalAccessToken: IPersonalAccessToken;
}
