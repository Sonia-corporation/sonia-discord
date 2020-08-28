import _ from "lodash";

export function discordCommandGetFlagName(
  messageFlag: Readonly<string>
): string | null {
  const flagName: string | undefined = _.head(
    _.split(_.trimStart(messageFlag, `--`), `=`)
  );

  return _.isNil(flagName) || _.isEmpty(flagName) ? null : flagName;
}
