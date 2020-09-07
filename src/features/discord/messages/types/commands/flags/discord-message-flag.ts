import { IDiscordMessageNormalFlag } from "./discord-message-normal-flag";
import { IDiscordMessageShortcutFlag } from "./discord-message-shortcut-flag";

/**
 * @description
 * Is a text message containing only the flags part
 * Useful for some functions to parse and extract information from it
 * Without handling a long text message (good performances and cleaning enhancement)
 *
 * @example
 * -e
 * --enabled=true
 */
export type IDiscordMessageFlag =
  | IDiscordMessageNormalFlag
  | IDiscordMessageShortcutFlag;
