import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import _ from "lodash";

export function isDiscordTextChannel(
  channel: Readonly<TextChannel | DMChannel | NewsChannel | null | undefined>
): channel is TextChannel {
  return _.isObject(channel) && channel.type === `text`;
}
