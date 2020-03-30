import { IConfigUpdateString } from "./config-update-string";

export interface IConfigUpdateStringInternal<T = string>
  extends IConfigUpdateString<T> {
  newValue: T;
}
