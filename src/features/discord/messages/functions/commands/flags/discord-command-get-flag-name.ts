import _ from "lodash";

/**
 * @description
 * Extract the flag name from a message flag
 *
 * @example
 * discordCommandGetFlagName('')          => null
 * discordCommandGetFlagName('-f')        => f
 * discordCommandGetFlagName('-f=')       => f
 * discordCommandGetFlagName('-f=dummy')  => f
 * discordCommandGetFlagName('--f')       => f
 * discordCommandGetFlagName('--f=')      => f
 * discordCommandGetFlagName('--f=dummy') => f
 *
 * @param {Readonly<string>} messageFlag A flag as a message
 *
 * @return {string | null} a string when the flag name exists
 */
export function discordCommandGetFlagName(
  messageFlag: Readonly<string>
): string | null {
  const flagName: string | undefined = _.head(
    _.split(_.trimStart(messageFlag, `--`), `=`)
  );

  return _.isNil(flagName) || _.isEmpty(flagName) ? null : flagName;
}
