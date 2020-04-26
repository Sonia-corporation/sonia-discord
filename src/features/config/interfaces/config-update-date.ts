import { IConfigUpdateValue } from "./config-update-value";

export interface IConfigUpdateDate<T = string> extends IConfigUpdateValue<T> {
  isValueDisplay?: boolean;
  isValueHidden?: boolean;
}
