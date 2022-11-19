import { isValidPort } from './is-valid-port';
import _ from 'lodash';

const RADIX = 10;

export function getEnvironmentPort(): number | null {
  const port: string | undefined = process.env.PORT;

  if (!isValidPort(port)) {
    return null;
  }

  return _.parseInt(port, RADIX);
}
