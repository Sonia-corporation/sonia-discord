import { DMChannel, NewsChannel, TextChannel } from 'discord.js';
import _ from 'lodash';

export function isDiscordDmChannel(
  channel: Readonly<TextChannel | DMChannel | NewsChannel | null | undefined>
): channel is DMChannel {
  return _.isObject(channel) && channel.type === `dm`;
}
