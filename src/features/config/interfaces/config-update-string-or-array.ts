import { IConfigUpdateValue } from "./config-update-value";

export interface IConfigUpdateStringOrArray<T = string | string[]>
  extends IConfigUpdateValue<T> {
  isValueDisplay?: boolean;
  isValueHidden?: boolean;
}
