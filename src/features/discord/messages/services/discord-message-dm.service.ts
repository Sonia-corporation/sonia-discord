import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessageCommandService } from "./command/discord-message-command.service";
import { DiscordMessageAuthorService } from "./discord-message-author.service";
import { DiscordMessageContentService } from "./discord-message-content.service";

export class DiscordMessageDmService extends AbstractService {
  private static _instance: DiscordMessageDmService;

  public static getInstance(): DiscordMessageDmService {
    if (_.isNil(DiscordMessageDmService._instance)) {
      DiscordMessageDmService._instance = new DiscordMessageDmService();
    }

    return DiscordMessageDmService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordAuthorService: DiscordAuthorService = DiscordAuthorService.getInstance();
  private readonly _discordMessageAuthorService: DiscordMessageAuthorService = DiscordMessageAuthorService.getInstance();
  private readonly _discordMessageContentService: DiscordMessageContentService = DiscordMessageContentService.getInstance();
  private readonly _discordMessageCommandService: DiscordMessageCommandService = DiscordMessageCommandService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_DM_SERVICE);
  }

  public getMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse | null {
    if (this._discordAuthorService.isValid(anyDiscordMessage.author)) {
      return this._getMessageResponse(anyDiscordMessage);
    }

    return null;
  }

  private _getMessageResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse | null {
    if (
      this._discordMessageContentService.hasContent(anyDiscordMessage.content)
    ) {
      if (
        this._discordMessageCommandService.hasCommand(anyDiscordMessage.content)
      ) {
        return this._getCommandMessageResponse(anyDiscordMessage);
      }
    }

    return this._discordMessageAuthorService.reply(anyDiscordMessage);
  }

  private _getCommandMessageResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse | null {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `message with command`
      ),
    });

    return this._discordMessageCommandService.handleCommands(anyDiscordMessage);
  }
}
