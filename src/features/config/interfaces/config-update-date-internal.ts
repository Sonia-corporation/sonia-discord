import { IConfigUpdateDate } from './config-update-date';
import { MomentInput } from 'moment-timezone';

export interface IConfigUpdateDateInternal<T extends MomentInput> extends IConfigUpdateDate<T> {
  newValue: T;
}
