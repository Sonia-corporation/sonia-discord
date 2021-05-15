import { QuoteConfigService } from './config/quote-config.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IObject } from '../../../types/object';
import { QUOTE_API_URL } from '../constants/quote-api-url';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

  public getQuoteOfTheDay(): Promise<IQuoteOfTheDayApi> {
    return this._request<IQuoteOfTheDayApi>({
      method: `get`,
      url: this._getUrl(`qotd`),
    }).then(({ data }: Readonly<AxiosResponse<IQuoteOfTheDayApi>>): IQuoteOfTheDayApi => data);
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
