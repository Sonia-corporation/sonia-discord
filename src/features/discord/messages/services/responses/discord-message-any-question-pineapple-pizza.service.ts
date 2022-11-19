import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { getReplyWithEnvPrefix } from '../../../../app/functions/get-reply-with-env-prefix';
import { removeFirstDiscordMention } from '../../../mentions/functions/remove-first-discord-mention';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import _ from 'lodash';

export class DiscordMessageAnyQuestionPineapplePizzaService extends AbstractService {
  private static _instance: DiscordMessageAnyQuestionPineapplePizzaService;

  public static getInstance(): DiscordMessageAnyQuestionPineapplePizzaService {
    if (_.isNil(DiscordMessageAnyQuestionPineapplePizzaService._instance)) {
      DiscordMessageAnyQuestionPineapplePizzaService._instance = new DiscordMessageAnyQuestionPineapplePizzaService();
    }

    return DiscordMessageAnyQuestionPineapplePizzaService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_ANY_QUESTION_PINEAPPLE_PIZZA_SERVICE);
  }

  /**
   * @description
   * Check if the any question pineapple pizza message can be executed
   *
   * Expect at this point that all criteria regarding the possibility of Sonia to respond are validated
   * Like it is really her mentioned and she has the rights to respond, etc
   * @param {string} message The message to check if a response to any question is possible
   * @returns {boolean} Return true when she can respond to any question
   */
  public hasCriteria(message: string): boolean {
    const messageWithoutFirstMention: string = this._getMessageWithoutFirstMention(message);

    return _.isEqual(
      _.toLower(_.replace(messageWithoutFirstMention, /(any)\s+(question\?)/i, `any question?`)),
      `any question?`
    );
  }

  public reply(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    if (!DiscordMessageContentService.getInstance().hasContent(anyDiscordMessage.content)) {
      return Promise.reject(new Error(`No content`));
    }

    const message: IDiscordMessageResponse = {
      content: getReplyWithEnvPrefix(`Do you like pineapple pizza?`),
      options: {},
    };

    return Promise.resolve(message);
  }

  private _getMessageWithoutFirstMention(message: string): string {
    /**
     * @description
     * This is important to only remove the first one
     * We want only to respond on "<@!sonia-id> any question?" and not <@!sonia-id> any question?<@!other-id>"
     */
    return removeFirstDiscordMention(message);
  }
}
