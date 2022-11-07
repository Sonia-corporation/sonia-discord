import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { getReplyWithEnvPrefix } from '../../../../app/functions/get-reply-with-env-prefix';
import { removeFirstDiscordMention } from '../../../mentions/functions/remove-first-discord-mention';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import _ from 'lodash';

export class DiscordMessageSimpleBasicService extends AbstractService {
  private static _instance: DiscordMessageSimpleBasicService;

  public static getInstance(): DiscordMessageSimpleBasicService {
    if (_.isNil(DiscordMessageSimpleBasicService._instance)) {
      DiscordMessageSimpleBasicService._instance = new DiscordMessageSimpleBasicService();
    }

    return DiscordMessageSimpleBasicService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SIMPLE_BASIC_SERVICE);
  }

  /**
   * @description
   * Check if the simple basic message can be executed
   *
   * Expect at this point that all criteria regarding the possibility of Sonia to respond are validated
   * Like it is really her mentioned and she has the rights to respond, etc
   * @param {Readonly<string>} message The message to check if a response to simple or basic is possible
   * @returns {boolean} Return true when she can respond to simple or basic
   */
  public hasCriteria(message: Readonly<string>): boolean {
    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(message);
    const cleanMessage: string = _.toLower(messageWithoutFirstMention);

    return _.includes([`simple`, `basic`], cleanMessage);
  }

  public reply(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    if (!DiscordMessageContentService.getInstance().hasContent(anyDiscordMessage.content)) {
      return Promise.reject(new Error(`No content`));
    }

    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(anyDiscordMessage.content);
    let response = `Basic`;

    if (_.isEqual(messageWithoutFirstMention, `simple`)) {
      response = `basic`;
    } else if (_.isEqual(messageWithoutFirstMention, `SIMPLE`)) {
      response = `BASIC`;
    } else if (_.isEqual(messageWithoutFirstMention, `basic`)) {
      response = `simple`;
    } else if (_.isEqual(messageWithoutFirstMention, `BASIC`)) {
      response = `SIMPLE`;
    } else if (_.isEqual(_.toLower(messageWithoutFirstMention), `basic`)) {
      response = `Simple`;
    }

    const message: IDiscordMessageResponse = {
      options: {
        split: false,
      },
      response: getReplyWithEnvPrefix(response),
    };

    return Promise.resolve(message);
  }

  private _getMessageWithoutFirstMention(message: Readonly<string>): string {
    /**
     * @description
     * This is important to only remove the first one
     * We want only to respond on "<@!sonia-id> any question?" and not <@!sonia-id> any question?<@!other-id>"
     */
    return removeFirstDiscordMention(message);
  }
}
