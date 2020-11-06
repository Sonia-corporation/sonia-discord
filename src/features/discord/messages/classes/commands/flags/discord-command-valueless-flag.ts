import _ from "lodash";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { DiscordCommandFlagErrorTitleEnum } from "../../../enums/commands/flags/discord-command-flag-error-title.enum";
import { discordCommandGetFlagName } from "../../../functions/commands/flags/discord-command-get-flag-name";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { IDiscordCommandFlagError } from "../../../interfaces/commands/flags/discord-command-flag-error";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { DiscordCommandFlag } from "./discord-command-flag";
import { DiscordCommandFlagActionValueless } from "./discord-command-flag-action-valueless";

const ONE_WORD = 1;

export class DiscordCommandValuelessFlag<
  T extends string
> extends DiscordCommandFlag<T, DiscordCommandFlagActionValueless<T>> {
  protected _type: DiscordCommandFlagTypeEnum.VALUELESS =
    DiscordCommandFlagTypeEnum.VALUELESS;

  /**
   * @param {Readonly<IDiscordCommandFlag>} discordCommandFlag Default values
   */
  public constructor(
    discordCommandFlag: Readonly<
      IDiscordCommandFlag<T, DiscordCommandFlagActionValueless<T>>
    >
  ) {
    super(discordCommandFlag);
  }

  /**
   * @description
   * Check if the flag is valueless
   *
   * @example
   * isValid('help')       => true
   * isValid('help=')      => false
   * isValid('help=dummy') => false
   * isValid('help=true')  => false
   * isValid('help=false') => false
   *
   * @param {Readonly<IDiscordMessageFlag>} messageFlag A flag as a message
   *
   * @return {boolean} true if the flag value is valid
   */
  public isValid(messageFlag: Readonly<IDiscordMessageFlag>): boolean {
    const splittedFlag: string[] = _.split(messageFlag, `=`);
    const splittedFlagSize: number = _.size(splittedFlag);

    return (
      !_.gt(splittedFlagSize, ONE_WORD) && !_.isEmpty(_.head(splittedFlag))
    );
  }

  public getInvalidFlagError(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandFlagError | null {
    const splittedFlag: string[] = _.split(messageFlag, `=`);
    const splittedFlagSize: number = _.size(splittedFlag);

    if (_.isEmpty(_.head(splittedFlag))) {
      return {
        description: `The flag is empty.`,
        isUnknown: false,
        name: DiscordCommandFlagErrorTitleEnum.INVALID_VALUELESS_FLAG,
      };
    } else if (_.gt(splittedFlagSize, ONE_WORD)) {
      return {
        description: `The flag \`${_.toString(
          discordCommandGetFlagName(messageFlag)
        )}\` has a value. Remove it since the flag should be valueless.`,
        isUnknown: false,
        name: DiscordCommandFlagErrorTitleEnum.INVALID_VALUELESS_FLAG,
      };
    }

    return null;
  }
}
