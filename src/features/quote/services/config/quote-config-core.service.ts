import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IQuoteConfig } from '../../interfaces/quote-config';
import _ from 'lodash';

export class QuoteConfigCoreService extends AbstractService implements IQuoteConfig {
  private static _instance: QuoteConfigCoreService;

  public static getInstance(): QuoteConfigCoreService {
    if (_.isNil(QuoteConfigCoreService._instance)) {
      QuoteConfigCoreService._instance = new QuoteConfigCoreService();
    }

    return QuoteConfigCoreService._instance;
  }

  public apiKey = `unknown`;

  public constructor() {
    super(ServiceNameEnum.QUOTE_CONFIG_CORE_SERVICE);
  }
}
