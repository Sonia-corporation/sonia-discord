import _ from 'lodash';

export function discordGetFormattedMessage(message: string): string {
  return _.toLower(message);
}
