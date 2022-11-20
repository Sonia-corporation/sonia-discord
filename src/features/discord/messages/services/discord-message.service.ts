import { DiscordMessageErrorService } from './helpers/discord-message-error.service';
import { DiscordMessageRightsService } from './rights/discord-message-rights.service';
import { DiscordMessageDmService } from './types/discord-message-dm.service';
import { DiscordMessageTextService } from './types/discord-message-text.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordChannelTypingService } from '../../channels/services/discord-channel-typing.service';
import { DiscordChannelService } from '../../channels/services/discord-channel.service';
import { DiscordMentionService } from '../../mentions/services/discord-mention.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { DiscordAuthorService } from '../../users/services/discord-author.service';
import { DiscordSoniaService } from '../../users/services/discord-sonia.service';
import { ISonia } from '../../users/types/sonia';
import { isDiscordValidTextMessage } from '../functions/is-discord-valid-text-message';
import { IDiscordMessageResponse } from '../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../types/any-discord-message';
import { Message } from 'discord.js';
import _ from 'lodash';

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

  public sendMessage(anyDiscordMessage: IAnyDiscordMessage): Promise<(Message | void) | (Message | void)[]> {
    if (!isDiscordValidTextMessage(anyDiscordMessage)) {
      if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
        LoggerService.getInstance().warning({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `We only support for now text messages (embed or such are not handled)`
          ),
        });
      }

      return Promise.reject(new Error(`Discord message content is invalid or empty`));
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, anyDiscordMessage.content),
    });

    if (!DiscordAuthorService.getInstance().isValid(anyDiscordMessage.author)) {
      return Promise.reject(new Error(`Invalid author`));
    }

    if (DiscordAuthorService.getInstance().isBot(anyDiscordMessage.author)) {
      return Promise.reject(new Error(`Discord message author is a Bot`));
    }

    if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
      return Promise.reject(new Error(`Discord message channel is not valid`));
    }

    return this.handleChannelMessage(anyDiscordMessage);
  }

  public handleChannelMessage(anyDiscordMessage: IAnyDiscordMessage): Promise<(Message | void) | (Message | void)[]> {
    if (DiscordChannelService.getInstance().isDm(anyDiscordMessage.channel)) {
      void DiscordChannelTypingService.getInstance().sendTyping(anyDiscordMessage.channel);

      return this._dmMessage(anyDiscordMessage);
    } else if (
      DiscordChannelService.getInstance().isText(anyDiscordMessage.channel) ||
      DiscordChannelService.getInstance().isThread(anyDiscordMessage.channel)
    ) {
      if (
        _.isNil(anyDiscordMessage.guild) ||
        !DiscordMessageRightsService.getInstance().isSoniaAuthorizedForThisGuild(anyDiscordMessage.guild)
      ) {
        LoggerService.getInstance().warning({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `Sonia is not authorized to send messages to this guild in local environment`
          ),
        });
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `add the guild id ${ChalkService.getInstance().value(
              anyDiscordMessage.guild?.id
            )} to your secret environment under 'discord.sonia.devGuildIdWhitelist' to allow Sonia to interact with it`
          ),
        });

        return Promise.reject(new Error(`Sonia is not authorized for this guild`));
      }

      if (
        DiscordAuthorService.getInstance().isValid(anyDiscordMessage.author) &&
        DiscordMentionService.getInstance().isValid(anyDiscordMessage.mentions)
      ) {
        if (DiscordMentionService.getInstance().isForEveryone(anyDiscordMessage.mentions)) {
          void DiscordChannelTypingService.getInstance().sendTyping(anyDiscordMessage.channel);
        } else {
          const sonia: ISonia | null = DiscordSoniaService.getInstance().getSonia();

          if (
            DiscordSoniaService.getInstance().isValid(sonia) &&
            DiscordMentionService.getInstance().isUserMentioned(anyDiscordMessage.mentions, sonia)
          ) {
            void DiscordChannelTypingService.getInstance().sendTyping(anyDiscordMessage.channel);
          }
        }
      }

      return this._textMessage(anyDiscordMessage);
    }

    return Promise.reject(new Error(`Discord message is not a DM channel nor a text channel nor a thread`));
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`messageCreate`, (anyDiscordMessage: IAnyDiscordMessage): void => {
        this.sendMessage(anyDiscordMessage).catch((error: Error): void => {
          // TODO add coverage
          if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
            LoggerService.getInstance().debug({
              context: this._serviceName,
              hasExtendedContext: true,
              message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message ignored`),
            });
          }

          LoggerService.getInstance().warning({
            context: this._serviceName,
            hasExtendedContext: true,
            message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, error),
          });
        });
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`message`)} event`),
    });
  }

  private _dmMessage(anyDiscordMessage: IAnyDiscordMessage): Promise<(Message | void) | (Message | void)[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `dm message`),
    });

    return DiscordMessageDmService.getInstance()
      .getMessage(anyDiscordMessage)
      .then(
        (
          discordMessageResponses: IDiscordMessageResponse | IDiscordMessageResponse[]
        ): Promise<(Message | void) | (Message | void)[]> => {
          if (!_.isArray(discordMessageResponses)) {
            return this._sendMessage(anyDiscordMessage, discordMessageResponses);
          }

          return this._sendMessages(anyDiscordMessage, discordMessageResponses);
        }
      )
      .catch((error: Error): Promise<void> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `failed to get a valid message response`
          ),
        });

        throw error;
      });
  }

  private _textMessage(anyDiscordMessage: IAnyDiscordMessage): Promise<(Message | void) | (Message | void)[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `text message`),
    });

    return DiscordMessageTextService.getInstance()
      .getMessage(anyDiscordMessage)
      .then(
        (
          discordMessageResponses: IDiscordMessageResponse | IDiscordMessageResponse[]
        ): Promise<(Message | void) | (Message | void)[]> => {
          if (!_.isArray(discordMessageResponses)) {
            return this._sendMessage(anyDiscordMessage, discordMessageResponses);
          }

          return this._sendMessages(anyDiscordMessage, discordMessageResponses);
        }
      )
      .catch((error: Error): Promise<void> => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `failed to get a valid message response`
          ),
        });

        throw error;
      });
  }

  private _sendMessage(
    anyDiscordMessage: IAnyDiscordMessage,
    { content, options }: IDiscordMessageResponse
  ): Promise<Message | void> {
    if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
      throw new Error(`Discord message channel not valid`);
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `sending message...`),
    });

    return anyDiscordMessage.channel
      .send({
        ...options,
        content,
      })
      .then((message: Message): Promise<Message> => {
        LoggerService.getInstance().log({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `message sent`),
        });

        return Promise.resolve(message);
      })
      .catch((error: Error): Promise<void> => {
        DiscordMessageErrorService.getInstance().handleError(error, anyDiscordMessage);

        throw error;
      });
  }

  private _sendMessages(
    anyDiscordMessage: IAnyDiscordMessage,
    discordMessageResponses: IDiscordMessageResponse[]
  ): Promise<(Message | void)[]> {
    return Promise.all(
      _.map(
        discordMessageResponses,
        (discordMessageResponse: IDiscordMessageResponse): Promise<Message | void> =>
          this._sendMessage(anyDiscordMessage, discordMessageResponse)
      )
    );
  }
}
