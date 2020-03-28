import { IConfigUpdateValue } from './config-update-value';

export interface IConfigUpdateString extends IConfigUpdateValue<string> {
  isValueHidden?: boolean;
}
