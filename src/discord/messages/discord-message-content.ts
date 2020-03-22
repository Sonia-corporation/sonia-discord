import _ from 'lodash';

export class DiscordMessageContent {
  private static _instance: DiscordMessageContent;

  public static getInstance(): DiscordMessageContent {
    if (_.isNil(DiscordMessageContent._instance)) {
      DiscordMessageContent._instance = new DiscordMessageContent();
    }

    return DiscordMessageContent._instance;
  }

  public hasContent(message: unknown): message is string {
    return _.isString(message) && !_.isEmpty(message);
  }
}
