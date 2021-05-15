import { QuoteConfigService } from './config/quote-config.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IObject } from '../../../types/object';
import { DiscordGuildSoniaChannelNameEnum } from '../../discord/guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../discord/guilds/services/discord-guild-sonia.service';
import { DiscordLoggerErrorService } from '../../discord/logger/services/discord-logger-error.service';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { QUOTE_API_URL } from '../constants/quote-api-url';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class QuoteApiService extends AbstractService {
  private static _instance: QuoteApiService;

  public static getInstance(): QuoteApiService {
    if (_.isNil(QuoteApiService._instance)) {
      QuoteApiService._instance = new QuoteApiService();
    }

    return QuoteApiService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.QUOTE_API_SERVICE);
  }

  /**
   * @description
   * Call the endpoint to have a quote of the day
   *
   * Logs in case of error
   * Also send a message in the Discord errors channel
   *
   * @param {Readonly<Snowflake>} messageId The original id of the message (to enhance the logs)
   *
   * @returns {Promise<IQuoteOfTheDayApi>} A promise containing a quote of the day
   */
  public getQuoteOfTheDay(messageId: Readonly<Snowflake>): Promise<IQuoteOfTheDayApi> {
    const url: string = this._getUrl(`qotd`);

    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        messageId,
        `calling ${ChalkService.getInstance().value(url)} endpoint`
      ),
    });

    return this._request<IQuoteOfTheDayApi>({
      method: `get`,
      url,
    })
      .then(
        ({ data }: Readonly<AxiosResponse<IQuoteOfTheDayApi>>): IQuoteOfTheDayApi => {
          LoggerService.getInstance().debug({
            context: this._serviceName,
            hasExtendedContext: true,
            message: LoggerService.getInstance().getSnowflakeContext(
              messageId,
              `${ChalkService.getInstance().value(url)} endpoint succeeded`
            ),
          });

          return data;
        }
      )
      .catch((error: Readonly<Error>): never => {
        this._logError(error, url, messageId);

        throw new Error(error.message);
      });
  }

  private _request<TData>(config: Readonly<AxiosRequestConfig>): Promise<AxiosResponse<TData>> {
    return axios({
      headers: this._getCommonHeaders(),
      ...config,
    });
  }

  private _getUrl(endpoint: Readonly<string>): string {
    return `${QUOTE_API_URL}${endpoint}`;
  }

  private _getCommonHeaders(): IObject {
    return {
      'accept': `application/vnd.favqs.v2+json;`,
      'authorization': `Token token="${QuoteConfigService.getInstance().getApiKey()}"`,
      'content-type': `application/json`,
    };
  }

  private _logError(error: Readonly<Error>, url: Readonly<string>, messageId: Readonly<Snowflake>): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        messageId,
        `${ChalkService.getInstance().value(url)} endpoint failed`
      ),
    });
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(messageId, error),
    });
    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(error),
    });
  }
}
