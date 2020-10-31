import _ from "lodash";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordChannelTypingService } from "../../channels/services/discord-channel-typing.service";
import { DiscordChannelService } from "../../channels/services/discord-channel.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../types/any-discord-message";
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

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessage(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<void> {
    if (
      _.isString(anyDiscordMessage.content) &&
      !_.isEmpty(anyDiscordMessage.content)
    ) {
      LoggerService.getInstance().log({
        context: this._serviceName,
        hasExtendedContext: true,
        message: LoggerService.getInstance().getSnowflakeContext(
          anyDiscordMessage.id,
          anyDiscordMessage.content
        ),
      });

      if (
        DiscordAuthorService.getInstance().isValid(anyDiscordMessage.author)
      ) {
        if (
          DiscordAuthorService.getInstance().isBot(anyDiscordMessage.author)
        ) {
          return Promise.reject(new Error(`Discord message author is a Bot`));
        }
      }

      if (
        DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)
      ) {
        return this.handleChannelMessage(anyDiscordMessage);
      }

      return Promise.reject(new Error(`Discord message channel is not valid`));
    }

    return Promise.reject(
      new Error(`Discord message content is invalid or empty`)
    );
  }

  public handleChannelMessage(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<void> {
    if (DiscordChannelService.getInstance().isDm(anyDiscordMessage.channel)) {
      void DiscordChannelTypingService.getInstance().addOneIndicator(
        anyDiscordMessage.channel
      );

      return this._dmMessage(anyDiscordMessage)
        .then(
          (): Promise<void> => {
            DiscordChannelTypingService.getInstance().removeOneIndicator(
              anyDiscordMessage.channel
            );
            return Promise.resolve();
          }
        )
        .catch(
          (error: Error): Promise<void> => {
            DiscordChannelTypingService.getInstance().removeOneIndicator(
              anyDiscordMessage.channel
            );
            return Promise.reject(error);
          }
        );
    } else if (
      DiscordChannelService.getInstance().isText(anyDiscordMessage.channel)
    ) {
      void DiscordChannelTypingService.getInstance().addOneIndicator(
        anyDiscordMessage.channel
      );

      return this._textMessage(anyDiscordMessage)
        .then(
          (): Promise<void> => {
            DiscordChannelTypingService.getInstance().removeOneIndicator(
              anyDiscordMessage.channel
            );
            return Promise.resolve();
          }
        )
        .catch(
          (error: Error): Promise<void> => {
            DiscordChannelTypingService.getInstance().removeOneIndicator(
              anyDiscordMessage.channel
            );
            return Promise.reject(error);
          }
        );
    }

    return Promise.reject(
      new Error(`Discord message is not a DM channel nor a text channel`)
    );
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(
        `message`,
        (anyDiscordMessage: Readonly<IAnyDiscordMessage>): void => {
          this.sendMessage(anyDiscordMessage).catch(
            (error: Readonly<Error>): void => {
              // @todo add coverage
              LoggerService.getInstance().debug({
                context: this._serviceName,
                hasExtendedContext: true,
                message: LoggerService.getInstance().getSnowflakeContext(
                  anyDiscordMessage.id,
                  `message ignored`
                ),
              });
              LoggerService.getInstance().warning({
                context: this._serviceName,
                hasExtendedContext: true,
                message: LoggerService.getInstance().getSnowflakeContext(
                  anyDiscordMessage.id,
                  error
                ),
              });
            }
          );
        }
      );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`message`)} event`
      ),
    });
  }

  private _dmMessage(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `dm message`
      ),
    });

    return DiscordMessageDmService.getInstance()
      .getMessage(anyDiscordMessage)
      .then(
        (
          discordMessageResponse: Readonly<IDiscordMessageResponse>
        ): Promise<void> =>
          this._sendMessage(anyDiscordMessage, discordMessageResponse)
      )
      .catch(
        (error: Readonly<Error>): Promise<void> => {
          LoggerService.getInstance().error({
            context: this._serviceName,
            hasExtendedContext: true,
            message: LoggerService.getInstance().getSnowflakeContext(
              anyDiscordMessage.id,
              `failed to get a valid message response`
            ),
          });

          return Promise.reject(error);
        }
      );
  }

  private _textMessage(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `text message`
      ),
    });

    return DiscordMessageTextService.getInstance()
      .getMessage(anyDiscordMessage)
      .then(
        (
          discordMessageResponse: Readonly<IDiscordMessageResponse>
        ): Promise<void> =>
          this._sendMessage(anyDiscordMessage, discordMessageResponse)
      )
      .catch(
        (error: Readonly<Error>): Promise<void> => {
          LoggerService.getInstance().error({
            context: this._serviceName,
            hasExtendedContext: true,
            message: LoggerService.getInstance().getSnowflakeContext(
              anyDiscordMessage.id,
              `failed to get a valid message response`
            ),
          });

          return Promise.reject(error);
        }
      );
  }

  private _sendMessage(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    { response, options }: Readonly<IDiscordMessageResponse>
  ): Promise<void> {
    if (
      DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)
    ) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        hasExtendedContext: true,
        message: LoggerService.getInstance().getSnowflakeContext(
          anyDiscordMessage.id,
          `sending message...`
        ),
      });

      return anyDiscordMessage.channel
        .send(response, options)
        .then(
          (): Promise<void> => {
            LoggerService.getInstance().log({
              context: this._serviceName,
              hasExtendedContext: true,
              message: LoggerService.getInstance().getSnowflakeContext(
                anyDiscordMessage.id,
                `message sent`
              ),
            });

            return Promise.resolve();
          }
        )
        .catch(
          (error: unknown): Promise<void> => {
            DiscordMessageErrorService.getInstance().handleError(
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
