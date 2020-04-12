import { IConfigUpdateString } from "@app/features/config/interfaces/config-update-string";

export interface IConfigUpdateStringInternal<T = string>
  extends IConfigUpdateString<T> {
  newValue: T;
}
