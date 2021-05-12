import { IAppConfig } from '../interfaces/app-config';

export type IAppUpdatableConfig = Exclude<IAppConfig, 'releaseType'>;
