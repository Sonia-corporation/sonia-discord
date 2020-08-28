import _ from "lodash";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { addDiscordDevPrefix } from "../../functions/dev-prefix/add-discord-dev-prefix";
import { DiscordMentionService } from "../../mentions/services/discord-mention.service";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { DiscordSoniaService } from "../../users/services/discord-sonia.service";
import { ISonia } from "../../users/types/sonia";
import { isDiscordMessage } from "../functions/is-discord-message";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../types/any-discord-message";
import { IDiscordMessage } from "../types/discord-message";
import { DiscordMessageCommandService } from "./command/discord-message-command.service";
import { DiscordMessageAuthorService } from "./discord-message-author.service";
import { DiscordMessageContentService } from "./discord-message-content.service";

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
  ): Promise<IDiscordMessageResponse> {
    if (DiscordAuthorService.getInstance().isValid(anyDiscordMessage.author)) {
      if (
        DiscordMentionService.getInstance().isValid(anyDiscordMessage.mentions)
      ) {
        return this._getAnyDiscordMessageResponse(anyDiscordMessage);
      }

      return Promise.reject(new Error(`Invalid mention`));
    }

    return Promise.reject(new Error(`Invalid author`));
  }

  private _getAnyDiscordMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `message with valid mention`
      ),
    });

    if (isDiscordMessage(anyDiscordMessage)) {
      return this._getDiscordMessageResponse(anyDiscordMessage);
    }

    return Promise.reject(new Error(`Invalid Discord message`));
  }

  private _getDiscordMessageResponse(
    discordMessage: Readonly<IDiscordMessage>
  ): Promise<IDiscordMessageResponse> {
    if (
      DiscordMentionService.getInstance().isForEveryone(discordMessage.mentions)
    ) {
      return this._getEveryoneMentionMessageResponse(discordMessage);
    }

    const sonia: ISonia | null = DiscordSoniaService.getInstance().getSonia();

    if (DiscordSoniaService.getInstance().isValid(sonia)) {
      if (
        DiscordMentionService.getInstance().isUserMentioned(
          discordMessage.mentions,
          sonia
        )
      ) {
        return this._getSoniaMentionMessageResponse(discordMessage);
      }

      return Promise.reject(new Error(`Invalid user mention`));
    }

    return Promise.reject(new Error(`Invalid Sonia`));
  }

  private _getEveryoneMentionMessageResponse({
    id,
  }: Readonly<IDiscordMessage>): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `everyone mention`
      ),
    });

    return Promise.resolve({
      response: this._getEveryoneMentionMessageResponseWithEnvPrefix(
        `Il est midi everyone!`
      ),
    });
  }

  private _getEveryoneMentionMessageResponseWithEnvPrefix(
    response: Readonly<string>
  ): string {
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

  private _getSoniaMentionMessageResponse(
    discordMessage: Readonly<IDiscordMessage>
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessage.id,
        `Sonia was mentioned`
      ),
    });

    if (
      DiscordMessageContentService.getInstance().hasContent(
        discordMessage.content
      )
    ) {
      if (
        DiscordMessageCommandService.getInstance().hasCommand(
          discordMessage.content
        )
      ) {
        return DiscordMessageCommandService.getInstance().handleCommands(
          discordMessage
        );
      }
    }

    return DiscordMessageAuthorService.getInstance().reply(discordMessage);
  }
}
