import { QuoteConfigCoreService } from './quote-config-core.service';
import { QuoteConfigService } from './quote-config.service';
import { AbstractConfigService } from '../../../classes/services/abstract-config.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IPartialNested } from '../../../types/partial-nested';
import { ConfigService } from '../../config/services/config.service';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import { QuoteConfigValueNameEnum } from '../enums/quote-config-value-name.enum';
import { IQuoteConfig } from '../interfaces/quote-config';
import _ from 'lodash';

export class QuoteConfigMutatorService extends AbstractConfigService<IQuoteConfig> {
  private static _instance: QuoteConfigMutatorService;

  public static getInstance(config?: Readonly<IPartialNested<IQuoteConfig>>): QuoteConfigMutatorService {
    if (_.isNil(QuoteConfigMutatorService._instance)) {
      QuoteConfigMutatorService._instance = new QuoteConfigMutatorService(config);
    }

    return QuoteConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IQuoteConfig>>) {
    super(ServiceNameEnum.QUOTE_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    QuoteConfigCoreService.getInstance();
    QuoteConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IQuoteConfig>>): void {
    if (!_.isNil(config)) {
      this.updateApiKey(config.apiKey);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateApiKey(apiKey?: Readonly<string>): void {
    QuoteConfigCoreService.getInstance().apiKey = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      isValueHidden: true,
      newValue: apiKey,
      oldValue: QuoteConfigService.getInstance().getApiKey(),
      valueName: QuoteConfigValueNameEnum.API_KEY,
    });
  }
}
