import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IDiscordMessageResponse } from '../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandCliErrorService } from '../../discord/messages/services/command/discord-message-command-cli-error.service';
import { DiscordCommandErrorCoreService } from '../../discord/messages/services/helpers/discord-command-error-core.service';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
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

  public getMessageResponse(error: Readonly<IQuoteErrorApi>): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then(
        (messageResponse: Readonly<IDiscordMessageResponse>): IDiscordMessageResponse =>
          _.merge(messageResponse, {
            options: {
              embed: {
                ...this._getMessageEmbed(),
                description: this._getMessageEmbedDescription(error),
                title: this._getCustomMessageEmbedTitle(error),
              },
              split: false,
            },
            response: ``,
          } as IDiscordMessageResponse)
      );
  }

  private _getMessageEmbedDescription(_error: Readonly<IQuoteErrorApi>): string {
    return `Oops, something went wrong`;
  }

  private _getCustomMessageEmbedTitle(_error: Readonly<IQuoteErrorApi>): string {
    return `Oops, something went wrong`;
  }
}
