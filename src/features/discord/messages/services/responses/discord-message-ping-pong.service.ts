import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { getReplyWithEnvPrefix } from '../../../../app/functions/get-reply-with-env-prefix';
import { removeFirstDiscordMention } from '../../../mentions/functions/remove-first-discord-mention';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
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

    return _.isEqual(messageWithoutFirstMention, `ping`);
  }

  public reply(): Promise<IDiscordMessageResponse> {
    const response = `Pong`;

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
    const messageWithoutFirstMention: string = removeFirstDiscordMention(message);

    return _.toLower(messageWithoutFirstMention);
  }
}
