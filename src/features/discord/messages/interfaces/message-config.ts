import { IAnyObject } from "../../../../types/any-object";

export interface IMessageConfig<T extends string> {
  defaultMessage: T;
  messages: IAnyObject<T>;
  params?: IAnyObject | undefined;
}
