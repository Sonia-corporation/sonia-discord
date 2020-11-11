import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { Client } from 'discord.js';
import _ from 'lodash';

export class DiscordClientService extends AbstractService {
  private static _instance: DiscordClientService;

  public static getInstance(): DiscordClientService {
    if (_.isNil(DiscordClientService._instance)) {
      DiscordClientService._instance = new DiscordClientService();
    }

    return DiscordClientService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_CLIENT_SERVICE);
  }

  public getClient(): Client {
    return {
      on: _.noop,
      user: {
        username: `dummy-username`,
      },
    } as Client;
  }
}
