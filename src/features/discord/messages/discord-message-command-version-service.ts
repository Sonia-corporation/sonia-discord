import _ from 'lodash';
import { AppConfigService } from '../../app/app-config-service';

export class DiscordMessageCommandVersionService {
  private static _instance: DiscordMessageCommandVersionService;

  public static getInstance(): DiscordMessageCommandVersionService {
    if (_.isNil(DiscordMessageCommandVersionService._instance)) {
      DiscordMessageCommandVersionService._instance = new DiscordMessageCommandVersionService();
    }

    return DiscordMessageCommandVersionService._instance;
  }

  private readonly _appConfigService = AppConfigService.getInstance();

  public handle(): string {
    return this._appConfigService.getVersion();
  }
}
