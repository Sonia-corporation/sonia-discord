import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import _ from 'lodash';

export class DiscordMessageContentService extends AbstractService {
  private static _instance: DiscordMessageContentService;

  public static getInstance(): DiscordMessageContentService {
    if (_.isNil(DiscordMessageContentService._instance)) {
      DiscordMessageContentService._instance = new DiscordMessageContentService();
    }

    return DiscordMessageContentService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_CONTENT_SERVICE);
  }

  public hasContent(message: unknown): message is string {
    return _.isString(message) && !_.isEmpty(message);
  }
}
