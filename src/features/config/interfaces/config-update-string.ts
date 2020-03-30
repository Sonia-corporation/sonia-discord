import { IConfigUpdateValue } from "./config-update-value";

export interface IConfigUpdateString<T = string> extends IConfigUpdateValue<T> {
  isValueDisplay?: boolean;
  isValueHidden?: boolean;
}
