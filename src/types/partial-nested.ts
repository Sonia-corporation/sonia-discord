export type IPartialNested<T> = {
  [P in keyof T]?: IPartialNested<T[P]>;
};
