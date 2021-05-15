import { AppConfigReleaseTypeEnum } from '../enums/app-config-release-type.enum';

export type IAppReleaseTypeResponsesFactoryPattern<TReturn = string> = {
  [AppConfigReleaseTypeEnum.BUG_FIXES]: () => TReturn;
  [AppConfigReleaseTypeEnum.FEATURES]: () => TReturn;
  [AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS]: () => TReturn;
  [AppConfigReleaseTypeEnum.UNKNOWN]: () => TReturn;
  [AppConfigReleaseTypeEnum.MIXED]: () => TReturn;
};
