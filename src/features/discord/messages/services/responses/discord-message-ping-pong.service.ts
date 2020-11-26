import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { getReplyWithEnvPrefix } from '../../../../app/functions/get-reply-with-env-prefix';
import { removeFirstDiscordMention } from '../../../mentions/functions/remove-first-discord-mention';
import { DISCORD_MESSAGE_PING_PONG_RESPONSE_MESSAGES } from '../../constants/discord-message-ping-pong-response-messages';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import _ from 'lodash';

export class DiscordMessagePingPongService extends AbstractService {
  private static _instance: DiscordMessagePingPongService;

  public static getInstance(): DiscordMessagePingPongService {
    if (_.isNil(DiscordMessagePingPongService._instance)) {
      DiscordMessagePingPongService._instance = new DiscordMessagePingPongService();
    }

    return DiscordMessagePingPongService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_PING_PONG_SERVICE);
  }

  /**
   * @description
   * Check if the ping pong message can be executed
   *
   * Expect at this point that all criteria regarding the possibility of Sonia to respond are validated
   * Like it is really her mentioned and she has the rights to respond, etc
   *
   * @param {Readonly<string>} message The message to check if a response to ping is possible
   *
   * @return {boolean} Return true when she can respond to ping
   */
  public hasCriteria(message: Readonly<string>): boolean {
    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(message);

    return _.isEqual(_.toLower(messageWithoutFirstMention), `ping`);
  }

  public reply(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    if (!DiscordMessageContentService.getInstance().hasContent(anyDiscordMessage.content)) {
      return Promise.reject(new Error(`No content`));
    }

    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(anyDiscordMessage.content);
    let response = `Pong`;

    if (_.isEqual(messageWithoutFirstMention, `ping`)) {
      response = `pong`;
    } else if (_.isEqual(messageWithoutFirstMention, `PING`)) {
      response = `PONG`;
    }

    response = DISCORD_MESSAGE_PING_PONG_RESPONSE_MESSAGES.getHumanizedRandomMessage({
      pong: response,
    });

    return Promise.resolve({
      options: {
        split: false,
      },
      response: getReplyWithEnvPrefix(response),
    });
  }

  private _getMessageWithoutFirstMention(message: Readonly<string>): string {
    /**
     * @description
     * This is important to only remove the first one
     * We want only to respond on "<@!sonia-id> ping" and not <@!sonia-id> ping<@!other-id>"
     */
    return removeFirstDiscordMention(message);
  }
}
