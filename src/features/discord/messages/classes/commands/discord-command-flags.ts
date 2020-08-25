import { DiscordCommandFlag } from "./discord-command-flag";

export class DiscordCommandFlags<T> {
  private _flags: DiscordCommandFlag<T>[] = [];

  /**
   * @param {Readonly<DiscordCommandFlag>} discordCommandFlags Default values
   */
  public constructor(discordCommandFlags: DiscordCommandFlag<T>[]) {
    this._flags = discordCommandFlags;
  }

  public getFlags(): DiscordCommandFlag<T>[] {
    return this._flags;
  }

  public setFlags(flags: DiscordCommandFlag<T>[]): void {
    this._flags = flags;
  }
}
