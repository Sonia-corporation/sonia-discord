export interface IConfigUpdateValue<T = string> {
  context: string;
  newValue: T | undefined;
  oldValue: T;
  valueName: string;
}
