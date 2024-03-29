import { DiscordChannelEnum } from '../enums/discord-channel.enum';
import { IDiscordHumanizedChannels } from '../types/discord-humanized-channel-plural';

/**
 * @description
 * Return a humanized version of the given channel, pluralized.
 * Useful for the logs or to display them to the users.
 * @param   {DiscordChannelEnum}        channel The channel to humanize.
 * @returns {IDiscordHumanizedChannels}         The humanized channel as plural.
 */
export function getDiscordHumanizedChannelPlural(channel?: DiscordChannelEnum): IDiscordHumanizedChannels {
  if (channel === DiscordChannelEnum.TEXT) {
    return `text channels`;
  }

  if (channel === DiscordChannelEnum.DM) {
    return `private messages`;
  }

  if (channel === DiscordChannelEnum.NEWS) {
    return `news channels`;
  }

  if (channel === DiscordChannelEnum.THREAD) {
    return `threads`;
  }

  if (channel === DiscordChannelEnum.CATEGORY) {
    return `category channels`;
  }

  if (channel === DiscordChannelEnum.STAGE) {
    return `stage channels`;
  }

  if (channel === DiscordChannelEnum.VOICE) {
    return `voice channels`;
  }

  return `channels`;
}
