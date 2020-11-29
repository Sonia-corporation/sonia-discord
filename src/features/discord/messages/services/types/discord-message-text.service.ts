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
import { DiscordMessageAuthorService } from '../responses/discord-message-author.service';
import { DiscordMessageHotelTrivagoService } from '../responses/discord-message-hotel-trivago.service';
import { DiscordMessagePingPongService } from '../responses/discord-message-ping-pong.service';
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
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
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
    discordMessage: Readonly<IDiscordMessage>
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
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
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
    discordMessage: Readonly<IDiscordMessage>
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
    }

    return DiscordMessageAuthorService.getInstance().reply(discordMessage);
  }

  private _getEveryoneMentionMessageResponse({ id }: Readonly<IDiscordMessage>): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(id, `everyone mention`),
    });

    return Promise.resolve({
      options: {
        split: false,
      },
      response: this._getEveryoneMentionMessageResponseWithEnvPrefix(`Il est midi everyone!`),
    });
  }

  private _getEveryoneMentionMessageResponseWithEnvPrefix(response: Readonly<string>): string {
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
    discordMessage: Readonly<IDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message with command`),
    });

    return DiscordMessageCommandService.getInstance().handleCommands(discordMessage);
  }

  private _getPingPongMessageResponse(
    discordMessage: Readonly<IDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message ping pong`),
    });

    return DiscordMessagePingPongService.getInstance().reply(discordMessage);
  }

  private _getHotelTrivagoMessageResponse(
    discordMessage: Readonly<IDiscordMessage>
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(discordMessage.id, `message hotel trivago`),
    });

    return DiscordMessageHotelTrivagoService.getInstance().reply(discordMessage);
  }
}
