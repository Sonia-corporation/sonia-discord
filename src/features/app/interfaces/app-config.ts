import { AppConfigReleaseTypeEnum } from '../enums/app-config-release-type.enum';

export interface IAppConfig {
  firstReleaseDate: string;
  initializationDate: string;
  isProduction: boolean;
  releaseDate: string;
  releaseNotes: string;
  releaseType: AppConfigReleaseTypeEnum;
  totalReleaseCount: number;
  version: string;
}
