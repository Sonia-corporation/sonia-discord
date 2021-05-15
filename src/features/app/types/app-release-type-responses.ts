import { AppConfigReleaseTypeEnum } from '../enums/app-config-release-type.enum';

export type IAppReleaseTypeResponses = {
  [AppConfigReleaseTypeEnum.BUG_FIXES]: () => string;
  [AppConfigReleaseTypeEnum.FEATURES]: () => string;
  [AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS]: () => string;
  [AppConfigReleaseTypeEnum.UNKNOWN]: () => string;
  [AppConfigReleaseTypeEnum.MIXED]: () => string;
};
