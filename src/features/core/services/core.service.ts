import { CoreEventService } from './core-event.service';
import _ from 'lodash';

export class CoreService {
  private static _instance: CoreService;

  public static getInstance(): CoreService {
    if (_.isNil(CoreService._instance)) {
      CoreService._instance = new CoreService();
    }

    return CoreService._instance;
  }

  public init(): void {
    CoreEventService.getInstance().init();
  }
}
