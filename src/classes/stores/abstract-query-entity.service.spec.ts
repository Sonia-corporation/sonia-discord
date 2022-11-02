import { AbstractEntityStoreService } from './abstract-entity-store.service';
import { AbstractQueryEntityService } from './abstract-query-entity.service';
import { ServiceNameEnum } from '../../enums/service-name.enum';
import { StoreNameEnum } from '../../enums/store-name.enum';
import { CoreEventService } from '../../features/core/services/core-event.service';
import { EntityState, StoreConfig } from '@datorama/akita';
import _ from 'lodash';

interface IDummy {
  name: string;
}

interface IDummyState extends EntityState<IDummy, string> {
  sort: string;
}

@StoreConfig({
  idKey: `name`,
  name: StoreNameEnum.GUILDS,
})
class DummyStore extends AbstractEntityStoreService<IDummyState> {
  private static _instance: DummyStore;

  public static getInstance(): DummyStore {
    if (_.isNil(DummyStore._instance)) {
      DummyStore._instance = new DummyStore();
    }

    return DummyStore._instance;
  }

  public constructor() {
    super(ServiceNameEnum.CORE_SERVICE);
  }
}

class DummyQuery extends AbstractQueryEntityService<DummyStore, IDummyState> {
  public constructor(serviceName: ServiceNameEnum, dummyStore: DummyStore) {
    super(serviceName, dummyStore);
  }
}

describe(`AbstractQueryEntityService`, (): void => {
  let coreEventService: CoreEventService;
  let dummyStore: DummyStore;

  let serviceName: ServiceNameEnum;

  let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    dummyStore = DummyStore.getInstance();

    coreEventServiceNotifyServiceCreatedSpy = jest.spyOn(coreEventService, `notifyServiceCreated`).mockImplementation();
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_SERVICE;
    });

    it(`should notify about the creation of the AppConfig service`, (): void => {
      expect.assertions(2);

      new DummyQuery(serviceName, dummyStore);

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.APP_CONFIG_SERVICE);
    });
  });

  describe(`when the service is created with the name ServiceNameEnum.APP_CONFIG_CORE_SERVICE`, (): void => {
    beforeEach((): void => {
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
    });

    it(`should notify about the creation of the AppConfigCore service`, (): void => {
      expect.assertions(2);

      new DummyQuery(serviceName, dummyStore);

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.APP_CONFIG_CORE_SERVICE);
    });
  });
});
