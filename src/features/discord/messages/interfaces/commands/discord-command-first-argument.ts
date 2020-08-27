export interface IDiscordCommandFirstArgument<T> {
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
