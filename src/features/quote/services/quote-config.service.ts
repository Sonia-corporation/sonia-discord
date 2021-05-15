import { QuoteConfigCoreService } from './quote-config-core.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IQuoteConfig } from '../interfaces/quote-config';
import _ from 'lodash';

export class QuoteConfigService extends AbstractService {
  private static _instance: QuoteConfigService;

  public static getInstance(): QuoteConfigService {
    if (_.isNil(QuoteConfigService._instance)) {
      QuoteConfigService._instance = new QuoteConfigService();
    }

    return QuoteConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.QUOTE_CONFIG_SERVICE);
  }

  public getConfig(): IQuoteConfig {
    return {
      apiKey: this.getApiKey(),
    };
  }

  public getApiKey(): string {
    return QuoteConfigCoreService.getInstance().apiKey;
  }
}
