import { DiscordChannelEnum } from '../enums/discord-channel.enum';

/**
 * @description
 * Return a humanized version of the given channel, pluralized.
 * Useful for the logs or to display them to the users.
 * @param   {DiscordChannelEnum} channel The channel to humanize.
 * @returns {string}                     The humanized channel as plural.
 */
export function getDiscordHumanizedChannelPlural(channel?: DiscordChannelEnum): string {
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

  return `channels`;
}
