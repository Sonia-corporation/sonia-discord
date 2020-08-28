export interface IDiscordCommandFlag<T = string> {
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
