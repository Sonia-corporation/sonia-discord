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
}
