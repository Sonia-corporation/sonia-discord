import { IConfigUpdateStringOrArray } from "./config-update-string-or-array";

export interface IConfigUpdateStringOrArrayInternal<T = string>
  extends IConfigUpdateStringOrArray<T> {
  newValue: T;
}
