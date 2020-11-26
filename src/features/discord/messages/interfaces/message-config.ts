import { IObject } from '../../../../types/object';

export interface IMessageConfig<T extends string, TParams extends IObject | undefined = undefined> {
  defaultMessage: T;
  messages: IObject<T>;
  params?: TParams | undefined;
}
