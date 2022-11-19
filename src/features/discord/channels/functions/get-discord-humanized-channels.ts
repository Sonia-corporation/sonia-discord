import { getDiscordHumanizedChannel } from './get-discord-humanized-channel';
import { DiscordChannelEnum } from '../enums/discord-channel.enum';

/**
 * @description
 * Return a humanized version of the given channels.
 * Useful for the logs or to display them to the users.
 * @param   {DiscordChannelEnum[]} channels The channels to humanize.
 * @returns {string}                        The humanized channels, comma delimited.
 */
export function getDiscordHumanizedChannels(channels: DiscordChannelEnum[]): string {
  return channels.map((channel: DiscordChannelEnum): string => getDiscordHumanizedChannel(channel)).join(`, `);
}
