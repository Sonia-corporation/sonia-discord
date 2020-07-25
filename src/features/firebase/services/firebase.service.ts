import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { FirebaseAppService } from "./firebase-app.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";

export class FirebaseService extends AbstractService {
  private static _instance: FirebaseService;

  public static getInstance(): FirebaseService {
    if (_.isNil(FirebaseService._instance)) {
      FirebaseService._instance = new FirebaseService();
    }

    return FirebaseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_SERVICE);
  }

  public init(): void {
    FirebaseAppService.getInstance().init();
    FirebaseGuildsService.getInstance().init();
  }
}
