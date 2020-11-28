import _ from 'lodash';

/**
 * @param message
 */
export function discordGetFormattedMessage(message: Readonly<string>): string {
  return _.toLower(message);
}
