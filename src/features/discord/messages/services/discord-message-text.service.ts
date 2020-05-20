import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { addDiscordDevPrefix } from "../../functions/dev-prefix/add-discord-dev-prefix";
import { DiscordMentionService } from "../../mentions/services/discord-mention.service";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { DiscordSoniaService } from "../../users/services/discord-sonia.service";
import { Sonia } from "../../users/types/sonia";
import { isDiscordMessage } from "../functions/is-discord-message";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessage } from "../types/discord-message";
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

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordAuthorService: DiscordAuthorService = DiscordAuthorService.getInstance();
  private readonly _discordMentionService: DiscordMentionService = DiscordMentionService.getInstance();
  private readonly _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();
  private readonly _discordMessageAuthorService: DiscordMessageAuthorService = DiscordMessageAuthorService.getInstance();
  private readonly _discordMessageCommandService: DiscordMessageCommandService = DiscordMessageCommandService.getInstance();
  private readonly _discordMessageContentService: DiscordMessageContentService = DiscordMessageContentService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_TEXT_SERVICE);
  }

  public getMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse | null {
    if (this._discordAuthorService.isValid(anyDiscordMessage.author)) {
      if (this._discordMentionService.isValid(anyDiscordMessage.mentions)) {
        return this._getAnyDiscordMessageResponse(anyDiscordMessage);
      }
    }

    return null;
  }

  private _getAnyDiscordMessageResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse | null {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `message with valid mention`
      ),
    });

    if (isDiscordMessage(anyDiscordMessage)) {
      return this._getDiscordMessageResponse(anyDiscordMessage);
    }

    return null;
  }

  private _getDiscordMessageResponse(
    discordMessage: Readonly<DiscordMessage>
  ): IDiscordMessageResponse | null {
    if (this._discordMentionService.isForEveryone(discordMessage.mentions)) {
      return this._getEveryoneMentionMessageResponse(discordMessage);
    }

    const sonia: Sonia | null = this._discordSoniaService.getSonia();

    if (this._discordSoniaService.isValid(sonia)) {
      if (
        this._discordMentionService.isUserMentioned(
          discordMessage.mentions,
          sonia
        )
      ) {
        return this._getSoniaMentionMessageResponse(discordMessage);
      }
    }

    return null;
  }

  private _getEveryoneMentionMessageResponse(
    discordMessage: Readonly<DiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        discordMessage.id,
        `everyone mention`
      ),
    });

    return {
      response: this._getEveryoneMentionMessageResponseWithEnvPrefix(
        `Il est midi everyone!`
      ),
    };
  }

  private _getEveryoneMentionMessageResponseWithEnvPrefix(
    response: Readonly<string>
  ): string {
    if (!this._appConfigService.isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: this._profileConfigService.getDiscordId(),
        message: response,
        nickname: this._profileConfigService.getNickname(),
      });
    }

    return response;
  }

  private _getSoniaMentionMessageResponse(
    discordMessage: Readonly<DiscordMessage>
  ): IDiscordMessageResponse | null {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        discordMessage.id,
        `Sonia was mentioned`
      ),
    });

    if (this._discordMessageContentService.hasContent(discordMessage.content)) {
      if (
        this._discordMessageCommandService.hasCommand(discordMessage.content)
      ) {
        return this._discordMessageCommandService.handleCommands(
          discordMessage
        );
      }
    }

    return this._discordMessageAuthorService.reply(discordMessage);
  }
}
