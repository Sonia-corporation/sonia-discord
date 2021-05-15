import { QuoteConfigCoreService } from './quote-config-core.service';
import { QuoteConfigService } from './quote-config.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { IQuoteConfig } from '../interfaces/quote-config';

describe(`QuoteConfigService`, (): void => {
  let service: QuoteConfigService;
  let quoteConfigCoreService: QuoteConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    quoteConfigCoreService = QuoteConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a QuoteConfigService service`, (): void => {
      expect.assertions(1);

      service = QuoteConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(QuoteConfigService));
    });

    it(`should return the created QuoteConfigService service`, (): void => {
      expect.assertions(1);

      const result = QuoteConfigService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the QuoteConfigService service creation`, (): void => {
      expect.assertions(2);

      service = new QuoteConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.QUOTE_CONFIG_SERVICE);
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = QuoteConfigService.getInstance();
      quoteConfigCoreService.apiKey = `dummy-api-key`;
    });

    it(`should return the config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        apiKey: `dummy-api-key`,
      } as IQuoteConfig);
    });
  });

  describe(`getApiKey()`, (): void => {
    beforeEach((): void => {
      service = QuoteConfigService.getInstance();
      quoteConfigCoreService.apiKey = `dummy-api-key`;
    });

    it(`should return the config API key`, (): void => {
      expect.assertions(1);

      const result = service.getApiKey();

      expect(result).toStrictEqual(`dummy-api-key`);
    });
  });
});
