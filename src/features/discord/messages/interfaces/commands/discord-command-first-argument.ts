export interface IDiscordCommandFirstArgument<T = string> {
  description: string;
  name: T;
  shortcuts?: T[] | undefined;
}
