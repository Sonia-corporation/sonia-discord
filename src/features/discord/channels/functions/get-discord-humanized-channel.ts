import { DiscordChannelEnum } from '../enums/discord-channel.enum';

/**
 * @description
 * Return a humanized version of the given channel.
 * Useful for the logs or to display them to the users.
 * @param   {DiscordChannelEnum} channel The channel to humanize.
 * @returns {string}                     The humanized channel.
 */
export function getDiscordHumanizedChannel(channel?: DiscordChannelEnum): string {
  if (channel === DiscordChannelEnum.TEXT) {
    return `text channel`;
  }

  if (channel === DiscordChannelEnum.DM) {
    return `private message`;
  }

  if (channel === DiscordChannelEnum.NEWS) {
    return `news channel`;
  }

  if (channel === DiscordChannelEnum.THREAD) {
    return `thread`;
  }

  if (channel === DiscordChannelEnum.CATEGORY) {
    return `category channel`;
  }

  if (channel === DiscordChannelEnum.STAGE) {
    return `stage channel`;
  }

  if (channel === DiscordChannelEnum.VOICE) {
    return `voice channel`;
  }

  return `channel`;
}
