import { getDiscordHumanizedChannelPlural } from './get-discord-humanized-channel-plural';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

/**
 * @description
 * Return a humanized version of the given channels, pluralized.
 * Useful for the logs or to display them to the users.
 * @param   {DiscordChannelEnum[]} channels The channels to humanize.
 * @returns {string}                        The humanized channels as plural, comma delimited.
 */
export function getDiscordHumanizedChannelsPlural(channels: DiscordChannelEnum[]): string {
  return channels.map((channel: DiscordChannelEnum): string => getDiscordHumanizedChannelPlural(channel)).join(`, `);
}
