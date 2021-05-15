import { QuoteConfigCoreService } from './quote-config-core.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';

describe(`QuoteConfigCoreService`, (): void => {
  let service: QuoteConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a QuoteConfigCoreService service`, (): void => {
      expect.assertions(1);

      service = QuoteConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(QuoteConfigCoreService));
    });

    it(`should return the created QuoteConfigCoreService service`, (): void => {
      expect.assertions(1);

      const result = QuoteConfigCoreService.getInstance();

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

    it(`should notify the QuoteConfigCoreService service creation`, (): void => {
      expect.assertions(2);

      service = new QuoteConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.QUOTE_CONFIG_CORE_SERVICE);
    });
  });

  it(`should have an unknown API key`, (): void => {
    expect.assertions(1);

    service = QuoteConfigCoreService.getInstance();

    expect(service.apiKey).toStrictEqual(`unknown`);
  });
});