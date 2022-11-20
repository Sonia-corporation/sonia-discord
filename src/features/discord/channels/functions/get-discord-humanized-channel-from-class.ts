import { getDiscordHumanizedChannel } from './get-discord-humanized-channel';
import { isDiscordCategoryChannel } from './is-discord-category-channel';
import { isDiscordDmChannel } from './is-discord-dm-channel';
import { isDiscordNewsChannel } from './is-discord-news-channel';
import { isDiscordStageChannel } from './is-discord-stage-channel';
import { isDiscordTextChannel } from './is-discord-text-channel';
import { isDiscordThreadChannel } from './is-discord-thread-channel';
import { isDiscordVoiceChannel } from './is-discord-voice-channel';
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

  if (isDiscordCategoryChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.CATEGORY);
  }

  if (isDiscordStageChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.STAGE);
  }

  if (isDiscordVoiceChannel(channel)) {
    return getDiscordHumanizedChannel(DiscordChannelEnum.VOICE);
  }

  return getDiscordHumanizedChannel();
}
