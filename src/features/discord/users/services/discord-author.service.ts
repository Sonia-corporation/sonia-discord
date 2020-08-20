import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { isDiscordUser } from "../functions/is-discord-user";
import { IAnyDiscordAuthor } from "../types/any-discord-author";

export class DiscordAuthorService extends AbstractService {
  private static _instance: DiscordAuthorService;

  public static getInstance(): DiscordAuthorService {
    if (_.isNil(DiscordAuthorService._instance)) {
      DiscordAuthorService._instance = new DiscordAuthorService();
    }

    return DiscordAuthorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_AUTHOR_SERVICE);
  }

  public isValid(author: unknown): author is IAnyDiscordAuthor {
    return isDiscordUser(author);
  }

  public hasValidUsername({ username }: Readonly<IAnyDiscordAuthor>): boolean {
    return _.isString(username) && !_.isEmpty(username);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public isBot({ bot }: Readonly<IAnyDiscordAuthor>): boolean {
    return _.isEqual(bot, true);
  }
}
