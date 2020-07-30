import { MessageEmbed } from "discord.js";
import _ from "lodash";
import { createMock } from "ts-auto-mock";
import { AbstractService } from "../../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { IDiscordMessageResponse } from "../../../../interfaces/discord-message-response";

export class DiscordMessageCommandCookieService extends AbstractService {
  private static _instance: DiscordMessageCommandCookieService;

  public static getInstance(): DiscordMessageCommandCookieService {
    if (_.isNil(DiscordMessageCommandCookieService._instance)) {
      DiscordMessageCommandCookieService._instance = new DiscordMessageCommandCookieService();
    }

    return DiscordMessageCommandCookieService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_COOKIE_SERVICE);
  }

  public handleResponse(): IDiscordMessageResponse {
    return this.getMessageResponse();
  }

  public getMessageResponse(): IDiscordMessageResponse {
    return {
      options: {
        embed: createMock<MessageEmbed>(),
        split: true,
      },
      response: ``,
    };
  }
}
