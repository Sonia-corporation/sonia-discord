import _ from "lodash";
import { isValidPort } from "./is-valid-port";

export function getEnvironmentPort(): number | null {
  const port: string | undefined = process.env.PORT;

  if (isValidPort(port)) {
    if (_.isString(port)) {
      return _.parseInt(port, 10);
    }

    return port;
  }

  return null;
}
