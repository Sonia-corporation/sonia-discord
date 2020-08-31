import _ from "lodash";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { DiscordCommandFlagErrorTitleEnum } from "../../../enums/commands/flags/discord-command-flag-error-title.enum";
import { discordCommandGetFlagName } from "../../../functions/commands/flags/discord-command-get-flag-name";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { IDiscordCommandFlagError } from "../../../interfaces/commands/flags/discord-command-flag-error";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
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
   * @param {Readonly<IDiscordMessageFlag>} messageFlag A flag as a message
   *
   * @return {boolean} true if the flag value is valid
   */
  public isValid(messageFlag: Readonly<IDiscordMessageFlag>): boolean {
    const splittedFlag: string[] = _.split(messageFlag, `=`);
    const splittedFlagSize: number = _.size(splittedFlag);

    if (_.lt(splittedFlagSize, 2)) {
      return false;
    }

    const value: string | undefined = _.last(splittedFlag);

    return _.includes([`true`, `false`], value);
  }

  public getInvalidFlagError(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandFlagError | null {
    const splittedFlag: string[] = _.split(messageFlag, `=`);
    const splittedFlagSize: number = _.size(splittedFlag);

    if (_.lt(splittedFlagSize, 2)) {
      return {
        description: `The flag \`${_.toString(
          discordCommandGetFlagName(messageFlag)
        )}\` does not have a value. Specify either \`true\` or \`false\`.`,
        isUnknown: false,
        name: DiscordCommandFlagErrorTitleEnum.INVALID_BOOLEAN_FLAG,
      };
    }

    const value: string = _.toLower(_.last(splittedFlag));
    const isValid: boolean = _.includes([`true`, `false`], value);

    if (_.isEqual(isValid, false)) {
      return {
        description: `The flag \`${_.toString(
          discordCommandGetFlagName(messageFlag)
        )}\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
        isUnknown: false,
        name: DiscordCommandFlagErrorTitleEnum.INVALID_BOOLEAN_FLAG,
      };
    }

    return null;
  }
}
