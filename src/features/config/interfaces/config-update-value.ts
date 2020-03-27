export interface IConfigUpdateValue<T> {
  context: string;
  newValue: T | undefined;
  oldValue: T;
  valueName: string;
}
