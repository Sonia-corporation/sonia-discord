export type PartialNested<T> = {
  [P in keyof T]?: PartialNested<T[P]>;
};
