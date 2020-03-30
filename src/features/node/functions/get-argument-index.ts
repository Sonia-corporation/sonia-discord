import _ from "lodash";

export function getArgumentIndex(name: Readonly<string>): number {
  return _.findIndex(process.argv, (argument: Readonly<string>): boolean => {
    return _.isEqual(_.toLower(argument), _.toLower(`--${name}`));
  });
}
