import { AbstractService } from '../../../../classes/services/abstract.service';
import { ColorEnum } from '../../../../enums/color.enum';
import { IconEnum } from '../../../../enums/icon.enum';
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
  public imageColor = ColorEnum.DEAD;
  public imageUrl = IconEnum.MOTIVATION_DAILY_QUOTES;

  public constructor() {
    super(ServiceNameEnum.QUOTE_CONFIG_CORE_SERVICE);
  }
}
