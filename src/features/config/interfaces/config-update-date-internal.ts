import { IConfigUpdateDate } from "./config-update-date";

export interface IConfigUpdateDateInternal<T = string>
  extends IConfigUpdateDate<T> {
  newValue: T;
}
