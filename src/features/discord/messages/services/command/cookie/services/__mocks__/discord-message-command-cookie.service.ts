import { AbstractService } from '../../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { IDiscordMessageResponse } from '../../../../../interfaces/discord-message-response';
import { MessageEmbed } from 'discord.js';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

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
        embed: createHydratedMock<MessageEmbed>(),
        split: false,
      },
      response: ``,
    };
  }
}
