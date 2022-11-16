import { QuoteConfigService } from './config/quote-config.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { QUOTE_API_URL } from '../constants/quote-api-url';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
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
   * Logs in case of error
   * @param {Readonly<Snowflake>} messageId The original id of the message (to enhance the logs)
   * @returns {Promise<IQuoteOfTheDayApi | IQuoteErrorApi>} A promise containing a quote of the day or an error
   */
  public getQuoteOfTheDay(messageId: Readonly<Snowflake>): Promise<IQuoteOfTheDayApi | IQuoteErrorApi> {
    const url: string = this._getUrl(`qotd`);

    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        messageId,
        `calling ${ChalkService.getInstance().value(url)} endpoint`
      ),
    });

    return this._getRequest<IQuoteOfTheDayApi | IQuoteErrorApi>(url)
      .then(
        ({ data }: Readonly<AxiosResponse<IQuoteOfTheDayApi | IQuoteErrorApi>>): IQuoteOfTheDayApi | IQuoteErrorApi => {
          this._handleSuccess(url, messageId);

          return data;
        }
      )
      .catch((error: Readonly<Error>): never => {
        this._handleError(error, url, messageId);
      });
  }

  private _getRequest<TData>(
    url: Readonly<string>,
    config?: Readonly<AxiosRequestConfig>
  ): Promise<AxiosResponse<TData>> {
    return axios.get(url, {
      headers: this._getCommonHeaders(),
      ...config,
    });
  }

  private _getUrl(endpoint: Readonly<string>): string {
    return `${QUOTE_API_URL}${endpoint}`;
  }

  private _getCommonHeaders(): RawAxiosRequestHeaders {
    return {
      'accept': `application/vnd.favqs.v2+json;`,
      'authorization': `Token token="${QuoteConfigService.getInstance().getApiKey()}"`,
      'content-type': `application/json`,
    };
  }

  /**
   * @description
   * Log the success
   * @param {Readonly<string>} url The original endpoint called
   * @param {Readonly<Snowflake>} messageId The original id of the message (to enhance the logs)
   * @private
   */
  private _handleSuccess(url: Readonly<string>, messageId: Readonly<Snowflake>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        messageId,
        `${ChalkService.getInstance().value(url)} endpoint succeeded`
      ),
    });
  }

  /**
   * @description
   * Log the error
   * @param {Readonly<Error>} error The original http error
   * @param {Readonly<string>} url The original endpoint called
   * @param {Readonly<Snowflake>} messageId The original id of the message (to enhance the logs)
   * @private
   */
  private _handleError(error: Readonly<Error>, url: Readonly<string>, messageId: Readonly<Snowflake>): never {
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        messageId,
        `${ChalkService.getInstance().value(url)} endpoint failed`
      ),
    });

    throw new Error(error.message);
  }
}
