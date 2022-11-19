import { getDiscordHumanizedChannel } from './get-discord-humanized-channel';
import { isDiscordDmChannel } from './is-discord-dm-channel';
import { isDiscordNewsChannel } from './is-discord-news-channel';
import { isDiscordTextChannel } from './is-discord-text-channel';
import { isDiscordThreadChannel } from './is-discord-thread-channel';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';
import { GuildBasedChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Return a humanized version of class instances related to channels.
 * Useful for the logs or to display them to the users.
 * @param   {GuildBasedChannel | TextBasedChannel} channel The channel to humanize.
 * @returns {string}                                       The humanized channel.
 */
export function getDiscordHumanizedChannelFromClass(channel: GuildBasedChannel | TextBasedChannel): string {
  if (isDiscordTextChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.TEXT);
  }

  if (isDiscordDmChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.DM);
  }

  if (isDiscordNewsChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.NEWS);
  }

  if (isDiscordThreadChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.THREAD);
  }

  return getDiscordHumanizedChannel();
}
