import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { IAppConfig } from "../../interfaces/app-config";
import { AppConfigCoreService } from "./app-config-core.service";

export class AppConfigService extends AbstractService {
  private static _instance: AppConfigService;

  public static getInstance(): AppConfigService {
    if (_.isNil(AppConfigService._instance)) {
      AppConfigService._instance = new AppConfigService();
    }

    return AppConfigService._instance;
  }

  private readonly _appConfigCoreService = AppConfigCoreService.getInstance();

  public constructor() {
    super(ServiceNameEnum.APP_CONFIG_SERVICE);
  }

  public getConfig(): IAppConfig {
    return {
      firstReleaseDate: this.getFirstReleaseDate(),
      initializationDate: this.getInitializationDate(),
      isProduction: this.isProduction(),
      releaseDate: this.getReleaseDate(),
      releaseNotes: this.getReleaseNotes(),
      totalReleaseCount: this.getTotalReleaseCount(),
      version: this.getVersion(),
    };
  }

  public getFirstReleaseDate(): string {
    return this._appConfigCoreService.firstReleaseDate;
  }

  public getVersion(): string {
    return this._appConfigCoreService.version;
  }

  public getReleaseDate(): string {
    return this._appConfigCoreService.releaseDate;
  }

  public getInitializationDate(): string {
    return this._appConfigCoreService.initializationDate;
  }

  public isProduction(): boolean {
    return this._appConfigCoreService.isProduction;
  }

  public getTotalReleaseCount(): number {
    return this._appConfigCoreService.totalReleaseCount;
  }

  public getReleaseNotes(): string {
    return this._appConfigCoreService.releaseNotes;
  }
}
