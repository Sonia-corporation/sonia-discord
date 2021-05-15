import { QuoteConfigService } from './config/quote-config.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IObject } from '../../../types/object';
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
}
