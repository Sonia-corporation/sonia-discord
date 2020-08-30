export interface IDiscordCommandFlag<T = string> {
  action: () => Promise<unknown>;
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
