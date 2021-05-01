import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordAuthorService } from '../../../users/services/discord-author.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageCommandService } from '../command/discord-message-command.service';
import { DiscordMessageContentService } from '../helpers/discord-message-content.service';
import { DiscordMessageAnyQuestionPineapplePizzaService } from '../responses/discord-message-any-question-pineapple-pizza.service';
import { DiscordMessageAuthorService } from '../responses/discord-message-author.service';
import { DiscordMessageHotelTrivagoService } from '../responses/discord-message-hotel-trivago.service';
import { DiscordMessagePingPongService } from '../responses/discord-message-ping-pong.service';
import { DiscordMessageSimpleBasicService } from '../responses/discord-message-simple-basic.service';
import _ from 'lodash';

export class DiscordMessageDmService extends AbstractService {
  private static _instance: DiscordMessageDmService;

  public static getInstance(): DiscordMessageDmService {
    if (_.isNil(DiscordMessageDmService._instance)) {
      DiscordMessageDmService._instance = new DiscordMessageDmService();
    }

    return DiscordMessageDmService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_DM_SERVICE);
  }

  public getMessage(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    if (!DiscordAuthorService.getInstance().isValid(anyDiscordMessage.author)) {
      return Promise.reject(new Error(`Invalid author`));
    }

    return this.getDiscordMessageResponse(anyDiscordMessage);
  }

  public getDiscordMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    if (DiscordMessageContentService.getInstance().hasContent(anyDiscordMessage.content)) {
      if (DiscordMessageCommandService.getInstance().hasCommand(anyDiscordMessage.content)) {
        return this._getCommandMessageResponse(anyDiscordMessage);
      }

      if (DiscordMessagePingPongService.getInstance().hasCriteria(anyDiscordMessage.content)) {
        return this._getPingPongMessageResponse(anyDiscordMessage);
      }

      if (DiscordMessageHotelTrivagoService.getInstance().hasCriteria(anyDiscordMessage.content)) {
        return this._getHotelTrivagoMessageResponse(anyDiscordMessage);
      }

      if (DiscordMessageAnyQuestionPineapplePizzaService.getInstance().hasCriteria(anyDiscordMessage.content)) {
        return this._getAnyQuestionPineapplePizzaMessageResponse(anyDiscordMessage);
      }

      if (DiscordMessageSimpleBasicService.getInstance().hasCriteria(anyDiscordMessage.content)) {
        return this._getSimpleBasicMessageResponse(anyDiscordMessage);
      }
    }

    return DiscordMessageAuthorService.getInstance().reply(anyDiscordMessage);
  }

  private _getCommandMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message with command`),
    });

    return DiscordMessageCommandService.getInstance().handleCommands(anyDiscordMessage);
  }

  private _getPingPongMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message ping pong`),
    });

    return DiscordMessagePingPongService.getInstance().reply(anyDiscordMessage);
  }

  private _getHotelTrivagoMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message hotel trivago`),
    });

    return DiscordMessageHotelTrivagoService.getInstance().reply(anyDiscordMessage);
  }

  private _getAnyQuestionPineapplePizzaMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `message any question pineapple pizza`
      ),
    });

    return DiscordMessageAnyQuestionPineapplePizzaService.getInstance().reply(anyDiscordMessage);
  }

  private _getSimpleBasicMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message simple basic`),
    });

    return DiscordMessageSimpleBasicService.getInstance().reply(anyDiscordMessage);
  }
}
