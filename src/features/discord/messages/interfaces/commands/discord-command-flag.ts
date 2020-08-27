export interface IDiscordCommandFlag<T> {
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
