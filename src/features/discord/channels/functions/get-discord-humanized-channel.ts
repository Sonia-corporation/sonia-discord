import { isDiscordDmChannel } from './is-discord-dm-channel';
import { isDiscordNewsChannel } from './is-discord-news-channel';
import { isDiscordTextChannel } from './is-discord-text-channel';
import { isDiscordThreadChannel } from './is-discord-thread-channel';
import { GuildBasedChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Return a humanized version of class instances related to channels
 * Useful for the logs
 * @param {GuildBasedChannel | TextBasedChannel} channel The channel to humanize
 * @returns {string} The humanized channel
 */
export function getDiscordHumanizedChannel(channel: Readonly<GuildBasedChannel | TextBasedChannel>): string {
  if (isDiscordTextChannel(channel)) {
    return `text channel`;
  }

  if (isDiscordDmChannel(channel)) {
    return `private message`;
  }

  if (isDiscordNewsChannel(channel)) {
    return `news channel`;
  }

  if (isDiscordThreadChannel(channel)) {
    return `thread`;
  }

  return `channel`;
}
