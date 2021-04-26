import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { IDiscordMessageResponse } from '../../../messages/interfaces/discord-message-response';
import { MessageEmbed } from 'discord.js';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

export class DiscordLoggerErrorService extends AbstractService {
  private static _instance: DiscordLoggerErrorService;

  public static getInstance(): DiscordLoggerErrorService {
    if (_.isNil(DiscordLoggerErrorService._instance)) {
      DiscordLoggerErrorService._instance = new DiscordLoggerErrorService();
    }

    return DiscordLoggerErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public handleError(): void {}

  public getErrorMessageResponse(): IDiscordMessageResponse {
    return {
      options: {
        embed: createHydratedMock<MessageEmbed>(),
        split: false,
      },
      response: ``,
    };
  }
}
