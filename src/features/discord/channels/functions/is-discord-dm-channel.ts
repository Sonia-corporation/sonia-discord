import { DMChannel, NewsChannel, TextChannel } from 'discord.js';
import _ from 'lodash';

/**
 * @param channel
 */
export function isDiscordDmChannel(
  channel: Readonly<TextChannel | DMChannel | NewsChannel | null | undefined>
): channel is DMChannel {
  return _.isObject(channel) && channel.type === `dm`;
}
