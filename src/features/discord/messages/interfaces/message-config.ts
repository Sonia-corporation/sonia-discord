import { IObject } from "../../../../types/object";

export interface IMessageConfig<T extends string> {
  defaultMessage: T;
  messages: IObject<T>;
  params?: IObject | undefined;
}
