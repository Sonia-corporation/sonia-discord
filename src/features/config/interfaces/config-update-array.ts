import { IConfigUpdateValue } from './config-update-value';

export interface IConfigUpdateArray<TValue = string> extends IConfigUpdateValue<TValue[]> {
  isValueDisplay?: boolean;
  isValueHidden?: boolean;
}
