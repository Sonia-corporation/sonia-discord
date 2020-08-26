import _ from "lodash";
import { getRandomBoolean } from "../../../../../functions/randoms/get-random-boolean";
import { DiscordCommandFlagTypeEnum } from "../../enums/commands/discord-command-flag-type.enum";
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

  public getRandomFlag(): DiscordCommandFlag<T> | undefined {
    return _.sample(this.getFlags());
  }

  public getRandomFlagUsageExample(): string | undefined {
    const randomFlag: DiscordCommandFlag<T> | undefined = this.getRandomFlag();

    if (!_.isNil(randomFlag)) {
      const flagName: string = randomFlag.getLowerCaseName();
      const flagType: DiscordCommandFlagTypeEnum = randomFlag.getType();
      let usageExample = `--${flagName}`;

      if (flagType === DiscordCommandFlagTypeEnum.BOOLEAN) {
        usageExample += `=${getRandomBoolean()}`;
      }

      return usageExample;
    }

    return undefined;
  }

  public getAllFlagsNameExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getAllFlagsLowerCaseName(),
        (value: Readonly<string>, flagName: Readonly<string>): string =>
          `${value}\`${flagName}\`, `,
        ``
      ),
      `, `
    );
  }

  public getAllFlagsLowerCaseName(): string[] {
    return _.map(
      this.getFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): string => flag.getLowerCaseName()
    );
  }
}
