import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordGuildSoniaChannelNameEnum } from "../enums/discord-guild-sonia-channel-name.enum";

export interface IDiscordGuildSoniaSendMessageToChannel {
  channelName: DiscordGuildSoniaChannelNameEnum;
  messageResponse: IDiscordMessageResponse;
}
