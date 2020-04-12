import { IConfigUpdateValue } from "~app/features/config/interfaces/config-update-value";

export interface IConfigUpdateString<T = string> extends IConfigUpdateValue<T> {
  isValueDisplay?: boolean;
  isValueHidden?: boolean;
}
