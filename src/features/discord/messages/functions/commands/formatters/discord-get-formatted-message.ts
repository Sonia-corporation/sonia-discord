import _ from 'lodash';

/**
 * @param message
 */
export function discordGetFormattedMessage(message: string): string {
  return _.toLower(message);
}
