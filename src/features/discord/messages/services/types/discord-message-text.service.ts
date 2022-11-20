import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { AppConfigService } from '../../../../app/services/config/app-config.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { ProfileConfigService } from '../../../../profile/services/config/profile-config.service';
import { addDiscordDevPrefix } from '../../../functions/dev-prefix/add-discord-dev-prefix';
import { DiscordMentionService } from '../../../mentions/services/discord-mention.service';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { ISonia } from '../../../users/types/sonia';
import { isDiscordMessage } from '../../functions/is-discord-message';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { IDiscordMessage } from '../../types/discord-message';
import { DiscordMessageCommandService } from '../command/discord-message-command.service';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { DiscordMessageAnyQuestionPineapplePizzaService } from '../responses/discord-message-any-question-pineapple-pizza.service';
import { DiscordMessageAuthorService } from '../responses/discord-message-author.service';
import { DiscordMessageHotelTrivagoService } from '../responses/discord-message-hotel-trivago.service';
import { DiscordMessagePingPongService } from '../responses/discord-message-ping-pong.service';
import { DiscordMessageSimpleBasicService } from '../responses/discord-message-simple-basic.service';
import _ from 'lodash';

export class DiscordMessageTextService extends AbstractService {
  private static _instance: DiscordMessageTextService;

  public static getInstance(): DiscordMessageTextService {
    if (_.isNil(DiscordMessageTextService._instance)) {
      DiscordMessageTextService._instance = new DiscordMessageTextService();
    }

    return DiscordMessageTextService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_TEXT_SERVICE);
  }

  public getMessage(
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    if (!DiscordAuthorService.getInstance().isValid(anyDiscordMessage.author)) {
      return Promise.reject(new Error(`Invalid author`));
    }

    if (!DiscordMentionService.getInstance().isValid(anyDiscordMessage.mentions)) {
      return Promise.reject(new Error(`Invalid mention`));
    }

    return this.getAnyDiscordMessageResponse(anyDiscordMessage);
  }

  public getDiscordMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    if (DiscordMentionService.getInstance().isForEveryone(discordMessage.mentions)) {
      return this._getEveryoneMentionMessageResponse(discordMessage);
    }

    const sonia: ISonia | null = DiscordSoniaService.getInstance().getSonia();

    if (!DiscordSoniaService.getInstance().isValid(sonia)) {
      return Promise.reject(new Error(`Invalid Sonia`));
    }

    if (!DiscordMentionService.getInstance().isUserMentioned(discordMessage.mentions, sonia)) {
      return Promise.reject(new Error(`Invalid user mention`));
    }

    return this.getSoniaMentionMessageResponse(discordMessage);
  }

  public getAnyDiscordMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message with valid mention`),
    });

    if (!isDiscordMessage(anyDiscordMessage)) {
      return Promise.reject(new Error(`Invalid Discord message`));
    }

    return this.getDiscordMessageResponse(anyDiscordMessage);
  }

  public getSoniaMentionMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `Sonia was mentioned`),
    });

    if (DiscordMessageContentService.getInstance().hasContent(discordMessage.content)) {
      if (DiscordMessageCommandService.getInstance().hasCommand(discordMessage.content)) {
        return this._getCommandMessageResponse(discordMessage);
      }

      if (DiscordMessagePingPongService.getInstance().hasCriteria(discordMessage.content)) {
        return this._getPingPongMessageResponse(discordMessage);
      }

      if (DiscordMessageHotelTrivagoService.getInstance().hasCriteria(discordMessage.content)) {
        return this._getHotelTrivagoMessageResponse(discordMessage);
      }

      if (DiscordMessageAnyQuestionPineapplePizzaService.getInstance().hasCriteria(discordMessage.content)) {
        return this._getAnyQuestionPineapplePizzaMessageResponse(discordMessage);
      }

      if (DiscordMessageSimpleBasicService.getInstance().hasCriteria(discordMessage.content)) {
        return this._getSimpleBasicMessageResponse(discordMessage);
      }
    }

    return DiscordMessageAuthorService.getInstance().reply(discordMessage);
  }

  private _getEveryoneMentionMessageResponse({ id }: IDiscordMessage): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(id, `everyone mention`),
    });

    const message: IDiscordMessageResponse = {
      content: this._getEveryoneMentionMessageResponseWithEnvPrefix(`Il est midi everyone!`),
      options: {},
    };

    return Promise.resolve(message);
  }

  private _getEveryoneMentionMessageResponseWithEnvPrefix(response: string): string {
    if (!AppConfigService.getInstance().isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: ProfileConfigService.getInstance().getDiscordId(),
        message: response,
        nickname: ProfileConfigService.getInstance().getNickname(),
      });
    }

    return response;
  }

  private _getCommandMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message with command`),
    });

    return DiscordMessageCommandService.getInstance().handleCommands(discordMessage);
  }

  private _getPingPongMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message ping pong`),
    });

    return DiscordMessagePingPongService.getInstance().reply(discordMessage);
  }

  private _getHotelTrivagoMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message hotel trivago`),
    });

    return DiscordMessageHotelTrivagoService.getInstance().reply(discordMessage);
  }

  private _getAnyQuestionPineapplePizzaMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessage.id,
        `message any question pineapple pizza`
      ),
    });

    return DiscordMessageAnyQuestionPineapplePizzaService.getInstance().reply(discordMessage);
  }

  private _getSimpleBasicMessageResponse(
    discordMessage: IDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message simple basic`),
    });

    return DiscordMessageSimpleBasicService.getInstance().reply(discordMessage);
  }
}
