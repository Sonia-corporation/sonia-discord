import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { AppConfigService } from '../../../../app/services/config/app-config.service';
import _ from 'lodash';

export class DiscordMessageRightsService extends AbstractService {
  private static _instance: DiscordMessageRightsService;

  public static getInstance(): DiscordMessageRightsService {
    if (_.isNil(DiscordMessageRightsService._instance)) {
      DiscordMessageRightsService._instance = new DiscordMessageRightsService();
    }

    return DiscordMessageRightsService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_RIGHTS_SERVICE);
  }

  public isSoniaAuthorizedForThisGuild(): boolean {
    if (AppConfigService.getInstance().isProduction()) {
      return true;
    }

    return false;
  }
}
