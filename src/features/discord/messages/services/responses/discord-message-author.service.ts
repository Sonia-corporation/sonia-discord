import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { getReplyWithEnvPrefix } from '../../../../app/functions/get-reply-with-env-prefix';
import { wrapUserIdIntoMention } from '../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import _ from 'lodash';

export class DiscordMessageAuthorService extends AbstractService {
  private static _instance: DiscordMessageAuthorService;

  public static getInstance(): DiscordMessageAuthorService {
    if (_.isNil(DiscordMessageAuthorService._instance)) {
      DiscordMessageAuthorService._instance = new DiscordMessageAuthorService();
    }

    return DiscordMessageAuthorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_AUTHOR_SERVICE);
  }

  public reply({ author }: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    let response = `Il est midi!`;

    if (DiscordAuthorService.getInstance().isValid(author)) {
      if (DiscordAuthorService.getInstance().hasValidUsername(author)) {
        response = `Il est midi ${wrapUserIdIntoMention(author.id)}!`;
      }
    }

    const message: IDiscordMessageResponse = {
      content: getReplyWithEnvPrefix(response),
      options: {},
    };

    return Promise.resolve(message);
  }
}
