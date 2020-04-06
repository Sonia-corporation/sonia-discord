import _ from "lodash";

export function hasCommandLineArguments(): boolean {
  return !_.isNil(process) && _.isArray(process.argv);
}
