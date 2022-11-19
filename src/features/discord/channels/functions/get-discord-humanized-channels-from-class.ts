import { getDiscordHumanizedChannelFromClass } from './get-discord-humanized-channel-from-class';
import { GuildBasedChannel, TextBasedChannel } from 'discord.js';
import { oxford } from 'humanize-plus';

/**
 * @description
 * Return a humanized version of class instances related to channels.
 * Useful for the logs or to display them to the users.
 * @param   {(GuildBasedChannel | TextBasedChannel)[]} channels The channels to humanize.
 * @returns {string}                                            The humanized channels, comma delimited.
 */
export function getDiscordHumanizedChannelsFromClass(channels: (GuildBasedChannel | TextBasedChannel)[]): string {
  return oxford(
    channels.map((channel: GuildBasedChannel | TextBasedChannel): string =>
      getDiscordHumanizedChannelFromClass(channel)
    )
  );
}
