import { AbstractService } from '../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { isQuoteErrorApi } from '../../../../../../quote/functions/is-quote-error-api';
import { IQuote } from '../../../../../../quote/interfaces/quote';
import { IQuoteErrorApi } from '../../../../../../quote/interfaces/quote-error-api';
import { QuoteConfigService } from '../../../../../../quote/services/config/quote-config.service';
import { QuoteErrorApiService } from '../../../../../../quote/services/quote-error-api.service';
import { QuoteRandomService } from '../../../../../../quote/services/quote-random.service';
import { DiscordSoniaService } from '../../../../../users/services/discord-sonia.service';
import { DiscordMessageCommandEnum } from '../../../../enums/commands/discord-message-command.enum';
import { discordHasThisCommand } from '../../../../functions/commands/checks/discord-has-this-command';
import { IDiscordMessageResponse } from '../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../config/discord-message-config.service';
import { DiscordMessageErrorService } from '../../../helpers/discord-message-error.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedOptions, MessageEmbedThumbnail } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageCommandQuoteService extends AbstractService {
  private static _instance: DiscordMessageCommandQuoteService;

  public static getInstance(): DiscordMessageCommandQuoteService {
    if (_.isNil(DiscordMessageCommandQuoteService._instance)) {
      DiscordMessageCommandQuoteService._instance = new DiscordMessageCommandQuoteService();
    }

    return DiscordMessageCommandQuoteService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_QUOTE_SERVICE);
  }

  public handleResponse(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `quote command detected`),
    });

    return this.getMessageResponse(anyDiscordMessage);
  }

  public getMessageResponse(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    return QuoteRandomService.getInstance()
      .fetchRandomQuote(anyDiscordMessage.id)
      .then((quote: IQuote | IQuoteErrorApi): Promise<IDiscordMessageResponse> => {
        if (isQuoteErrorApi(quote)) {
          return QuoteErrorApiService.getInstance().getMessageResponse(quote);
        }

        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(quote)],
          },
        };

        return Promise.resolve(message);
      })
      .catch((error: Error): never => {
        DiscordMessageErrorService.getInstance().handleError(error, anyDiscordMessage);

        throw error;
      });
  }

  public hasCommand(message: string): boolean {
    return discordHasThisCommand({
      commands: [DiscordMessageCommandEnum.QUOTE, DiscordMessageCommandEnum.Q],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getMessageEmbed(quote: IQuote): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(quote),
      color: this._getMessageEmbedColor(),
      description: this._getMessageDescription(quote),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(quote),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor({ authorName, quoteUrl }: IQuote): MessageEmbedAuthor {
    return {
      iconURL: QuoteConfigService.getInstance().getAuthorIconUrl(),
      name: authorName,
      url: quoteUrl,
    };
  }

  private _getMessageEmbedColor(): number {
    return QuoteConfigService.getInstance().getImageColor();
  }

  private _getMessageDescription({ quote }: IQuote): string {
    return quote;
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `Enjoy my wisdom`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: QuoteConfigService.getInstance().getImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp({ date }: IQuote): Date {
    return moment(date).toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Random quote`;
  }
}
