import { QuoteConfigCoreService } from './quote-config-core.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ColorEnum } from '../../../../enums/color.enum';
import { IconEnum } from '../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IQuoteConfig } from '../../interfaces/quote-config';
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
      authorIconUrl: this.getAuthorIconUrl(),
      imageColor: this.getImageColor(),
      imageUrl: this.getImageUrl(),
    };
  }

  public getApiKey(): string {
    return QuoteConfigCoreService.getInstance().apiKey;
  }

  public getAuthorIconUrl(): IconEnum {
    return QuoteConfigCoreService.getInstance().authorIconUrl;
  }

  public getImageColor(): ColorEnum {
    return QuoteConfigCoreService.getInstance().imageColor;
  }

  public getImageUrl(): IconEnum {
    return QuoteConfigCoreService.getInstance().imageUrl;
  }
}
