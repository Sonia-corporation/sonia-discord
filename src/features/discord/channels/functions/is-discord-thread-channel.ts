import { AnyThreadChannel, ChannelType, GuildBasedChannel, TextBasedChannel } from 'discord.js';
import _ from 'lodash';

/**
 * @description
 * Check if the given channel is a thread.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a thread.
 */
export function isDiscordThreadChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is AnyThreadChannel {
  return _.includes(
    [
      ChannelType.PublicThread,
      ChannelType.PrivateThread,
      ChannelType.AnnouncementThread,
      ChannelType.GuildNewsThread,
      ChannelType.GuildPublicThread,
      ChannelType.GuildPrivateThread,
    ],
    channel?.type
  );
}
