import _ from "lodash";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { DiscordCommandFlag } from "./discord-command-flag";

export class DiscordCommandBooleanFlag<
  T extends string
> extends DiscordCommandFlag<T> {
  protected _type: DiscordCommandFlagTypeEnum.BOOLEAN =
    DiscordCommandFlagTypeEnum.BOOLEAN;

  /**
   * @param {Readonly<IDiscordCommandFlag>} discordCommandFlag Default values
   */
  public constructor(discordCommandFlag: Readonly<IDiscordCommandFlag<T>>) {
    super(discordCommandFlag);
  }

  /**
   * @description
   * Check if the flag value is a boolean
   *
   * @example
   * isValid('enabled')       => false
   * isValid('enabled=')      => false
   * isValid('enabled=dummy') => false
   * isValid('enabled=true')  => true
   * isValid('enabled=false') => true
   *
   * @param {Readonly<string>} messageFlag A flag as a message
   *
   * @return {boolean} true if the flag value is valid
   */
  public isValid(messageFlag: Readonly<string>): boolean {
    const splittedFlag: string[] = _.split(messageFlag, `=`);
    const splittedFlagSize: number = _.size(splittedFlag);

    if (_.lt(splittedFlagSize, 2)) {
      return false;
    }

    const value: string | undefined = _.last(splittedFlag);

    return _.includes([`true`, `false`], value);
  }
}
