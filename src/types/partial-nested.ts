import { AnyRecord } from 'dns';

export type IPartialNested<T = AnyRecord> = {
  [P in keyof T]?: IPartialNested<T[P]>;
};
