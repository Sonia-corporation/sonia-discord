import { IAnyDiscordMessage } from '../types/any-discord-message';
import _ from 'lodash';

/**
 * @description
 * Check if the given message has a valid content
 * Basically, considering or not if the message is a text message or not
 * @param {IAnyDiscordMessage} message The message to check
 * @returns {boolean} Return true if the message is a valid text message
 */
export function isDiscordValidTextMessage(message: IAnyDiscordMessage): boolean {
  return _.isString(message.content) && !_.isEmpty(message.content);
}
