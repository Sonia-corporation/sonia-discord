import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";

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
