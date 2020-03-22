import _ from 'lodash';

export class DiscordMessageContentService {
  private static _instance: DiscordMessageContentService;

  public static getInstance(): DiscordMessageContentService {
    if (_.isNil(DiscordMessageContentService._instance)) {
      DiscordMessageContentService._instance = new DiscordMessageContentService();
    }

    return DiscordMessageContentService._instance;
  }

  public hasContent(message: unknown): message is string {
    return _.isString(message) && !_.isEmpty(message);
  }
}
