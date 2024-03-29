import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IDiscordMessageResponse } from '../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandCliErrorService } from '../../discord/messages/services/command/discord-message-command-cli-error.service';
import { DiscordCommandErrorCoreService } from '../../discord/messages/services/helpers/discord-command-error-core.service';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import { EmbedData } from 'discord.js';
import _ from 'lodash';

export class QuoteErrorApiService extends DiscordCommandErrorCoreService {
  private static _instance: QuoteErrorApiService;

  public static getInstance(): QuoteErrorApiService {
    if (_.isNil(QuoteErrorApiService._instance)) {
      QuoteErrorApiService._instance = new QuoteErrorApiService();
    }

    return QuoteErrorApiService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.QUOTE_ERROR_API_SERVICE);
  }

  public getMessageResponse(error: IQuoteErrorApi): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then((messageResponse: IDiscordMessageResponse): IDiscordMessageResponse => {
        const options: EmbedData = {
          description: this._getMessageEmbedDescription(error),
          title: this._getCustomMessageEmbedTitle(),
        };
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [_.merge({}, this._getMessageEmbed(), options)],
          },
        };

        return _.merge(messageResponse, message);
      });
  }

  private _getMessageEmbedDescription({ message }: IQuoteErrorApi): string {
    return message;
  }

  private _getCustomMessageEmbedTitle(): string {
    return `Oops, something went wrong`;
  }
}
