import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordChannelService } from "../../channels/services/discord-channel.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessageDmService } from "./discord-message-dm.service";
import { DiscordMessageErrorService } from "./discord-message-error.service";
import { DiscordMessageTextService } from "./discord-message-text.service";

export class DiscordMessageService extends AbstractService {
  private static _instance: DiscordMessageService;

  public static getInstance(): DiscordMessageService {
    if (_.isNil(DiscordMessageService._instance)) {
      DiscordMessageService._instance = new DiscordMessageService();
    }

    return DiscordMessageService._instance;
  }

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordChannelService: DiscordChannelService = DiscordChannelService.getInstance();
  private readonly _discordMessageDmService: DiscordMessageDmService = DiscordMessageDmService.getInstance();
  private readonly _discordMessageTextService: DiscordMessageTextService = DiscordMessageTextService.getInstance();
  private readonly _discordMessageErrorService: DiscordMessageErrorService = DiscordMessageErrorService.getInstance();
  private readonly _discordAuthorService: DiscordAuthorService = DiscordAuthorService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): Promise<void> {
    if (
      _.isString(anyDiscordMessage.content) &&
      !_.isEmpty(anyDiscordMessage.content)
    ) {
      this._loggerService.log({
        context: this._serviceName,
        extendedContext: true,
        message: this._loggerService.getSnowflakeContext(
          anyDiscordMessage.id,
          anyDiscordMessage.content
        ),
      });

      if (this._discordAuthorService.isValid(anyDiscordMessage.author)) {
        if (this._discordAuthorService.isBot(anyDiscordMessage.author)) {
          return Promise.reject(new Error(`Discord message author is a Bot`));
        }
      }

      if (this._discordChannelService.isValid(anyDiscordMessage.channel)) {
        return this.handleChannelMessage(anyDiscordMessage);
      }

      return Promise.reject(new Error(`Discord message channel is not valid`));
    }

    return Promise.reject(
      new Error(`Discord message content is invalid or empty`)
    );
  }

  public handleChannelMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): Promise<void> {
    if (this._discordChannelService.isDm(anyDiscordMessage.channel)) {
      return this._dmMessage(anyDiscordMessage);
    } else if (this._discordChannelService.isText(anyDiscordMessage.channel)) {
      return this._textMessage(anyDiscordMessage);
    }

    return Promise.reject(
      new Error(`Discord message is not a DM channel nor a text channel`)
    );
  }

  private _listen(): void {
    this._discordClientService
      .getClient()
      .on(`message`, (anyDiscordMessage: Readonly<AnyDiscordMessage>): void => {
        this.sendMessage(anyDiscordMessage).catch(
          (error: Readonly<Error>): void => {
            // @todo add coverage
            this._loggerService.debug({
              context: this._serviceName,
              extendedContext: true,
              message: this._loggerService.getSnowflakeContext(
                anyDiscordMessage.id,
                `message ignored`
              ),
            });
            this._loggerService.warning({
              context: this._serviceName,
              extendedContext: true,
              message: this._loggerService.getSnowflakeContext(
                anyDiscordMessage.id,
                error
              ),
            });
          }
        );
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`message`)} event`
      ),
    });
  }

  private _dmMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): Promise<void> {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `dm message`
      ),
    });

    const discordMessageResponse: IDiscordMessageResponse | null = this._discordMessageDmService.getMessage(
      anyDiscordMessage
    );

    if (!_.isNil(discordMessageResponse)) {
      return this._sendMessage(anyDiscordMessage, discordMessageResponse);
    }

    return Promise.reject(
      new Error(`Discord message response null or undefined`)
    );
  }

  private _textMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): Promise<void> {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `text message`
      ),
    });

    const discordMessageResponse: IDiscordMessageResponse | null = this._discordMessageTextService.getMessage(
      anyDiscordMessage
    );

    if (!_.isNil(discordMessageResponse)) {
      return this._sendMessage(anyDiscordMessage, discordMessageResponse);
    }

    return Promise.reject(
      new Error(`Discord message response null or undefined`)
    );
  }

  private _sendMessage(
    anyDiscordMessage: Readonly<AnyDiscordMessage>,
    discordMessageResponse: Readonly<IDiscordMessageResponse>
  ): Promise<void> {
    if (this._discordChannelService.isValid(anyDiscordMessage.channel)) {
      this._loggerService.debug({
        context: this._serviceName,
        extendedContext: true,
        message: this._loggerService.getSnowflakeContext(
          anyDiscordMessage.id,
          `sending message...`
        ),
      });

      return anyDiscordMessage.channel
        .send(discordMessageResponse.response, discordMessageResponse.options)
        .then(
          (): Promise<void> => {
            this._loggerService.log({
              context: this._serviceName,
              extendedContext: true,
              message: this._loggerService.getSnowflakeContext(
                anyDiscordMessage.id,
                `message sent`
              ),
            });

            return Promise.resolve();
          }
        )
        .catch(
          (error: unknown): Promise<never> => {
            this._discordMessageErrorService.handleError(
              error,
              anyDiscordMessage
            );

            return Promise.reject(error);
          }
        );
    }

    return Promise.reject(new Error(`Discord message channel not valid`));
  }
}
