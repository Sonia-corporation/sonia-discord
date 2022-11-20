import { getDiscordHumanizedChannelPlural } from './get-discord-humanized-channel-plural';
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
 * Return a humanized version of class instances related to channels, pluralized.
 * Useful for the logs or to display them to the users.
 * @param   {GuildBasedChannel | TextBasedChannel} channel The channel to humanize.
 * @returns {string}                                       The humanized channel as plural.
 */
export function getDiscordHumanizedChannelPluralFromClass(channel: GuildBasedChannel | TextBasedChannel): string {
  if (isDiscordTextChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.TEXT);
  }

  if (isDiscordDmChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.DM);
  }

  if (isDiscordNewsChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.NEWS);
  }

  if (isDiscordThreadChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.THREAD);
  }

  if (isDiscordCategoryChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.CATEGORY);
  }

  if (isDiscordStageChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.STAGE);
  }

  if (isDiscordVoiceChannel(channel)) {
    return getDiscordHumanizedChannelPlural(DiscordChannelEnum.VOICE);
  }

  return getDiscordHumanizedChannelPlural();
}
