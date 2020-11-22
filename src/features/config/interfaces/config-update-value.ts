export interface IConfigUpdateValue<TValue = string> {
  context: string;
  newValue: TValue | undefined;
  oldValue: TValue;
  valueName: string;
}
