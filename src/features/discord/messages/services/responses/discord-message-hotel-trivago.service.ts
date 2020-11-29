import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { getReplyWithEnvPrefix } from '../../../../app/functions/get-reply-with-env-prefix';
import { removeFirstDiscordMention } from '../../../mentions/functions/remove-first-discord-mention';
import { DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES } from '../../constants/discord-message-hotel-trivago-response-messages';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import _ from 'lodash';

export class DiscordMessageHotelTrivagoService extends AbstractService {
  private static _instance: DiscordMessageHotelTrivagoService;

  public static getInstance(): DiscordMessageHotelTrivagoService {
    if (_.isNil(DiscordMessageHotelTrivagoService._instance)) {
      DiscordMessageHotelTrivagoService._instance = new DiscordMessageHotelTrivagoService();
    }

    return DiscordMessageHotelTrivagoService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_HOTEL_TRIVAGO_SERVICE);
  }

  /**
   * @description
   * Check if the hotel Trivago message can be executed
   *
   * Expect at this point that all criteria regarding the possibility of Sonia to respond are validated
   * Like it is really her mentioned and she has the rights to respond, etc
   *
   * @param {Readonly<string>} message The message to check if a response to hotel is possible
   *
   * @returns {boolean} Return true when she can respond to hotel
   */
  public hasCriteria(message: Readonly<string>): boolean {
    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(message);

    return _.isEqual(_.toLower(messageWithoutFirstMention), `hotel`);
  }

  public reply(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    if (!DiscordMessageContentService.getInstance().hasContent(anyDiscordMessage.content)) {
      return Promise.reject(new Error(`No content`));
    }

    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(anyDiscordMessage.content);
    let response = `Trivago`;

    if (_.isEqual(messageWithoutFirstMention, `hotel`)) {
      response = `trivago`;
    } else if (_.isEqual(messageWithoutFirstMention, `HOTEL`)) {
      response = `TRIVAGO`;
    }

    response = DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES.getHumanizedRandomMessage({
      trivago: response,
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
     * We want only to respond on "<@!sonia-id> hotel" and not <@!sonia-id> hotel<@!other-id>"
     */
    return removeFirstDiscordMention(message);
  }
}
