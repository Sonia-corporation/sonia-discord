import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { LoggerService } from "../../../logger/services/logger.service";
import { IProfileConfig } from "../../interfaces/profile-config";
import { ProfileConfigCoreService } from "./profile-config-core.service";
import { ProfileConfigService } from "./profile-config.service";

export class ProfileConfigMutatorService extends AbstractConfigService<
  IProfileConfig
> {
  private static _instance: ProfileConfigMutatorService;

  public static getInstance(
    config?: Readonly<Partial<IProfileConfig>>
  ): ProfileConfigMutatorService {
    if (_.isNil(ProfileConfigMutatorService._instance)) {
      ProfileConfigMutatorService._instance = new ProfileConfigMutatorService(
        config
      );
    }

    return ProfileConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _profileConfigCoreService: ProfileConfigCoreService = ProfileConfigCoreService.getInstance();
  private _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();

  public constructor(config?: Readonly<Partial<IProfileConfig>>) {
    super(ServiceNameEnum.PROFILE_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._profileConfigCoreService = ProfileConfigCoreService.getInstance();
    this._profileConfigService = ProfileConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<Partial<IProfileConfig>>): void {
    if (!_.isNil(config)) {
      this.updateDiscordId(config.discordId);
      this.updateNickname(config.nickname);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateDiscordId(discordId?: Readonly<string | null>): void {
    this._profileConfigCoreService.discordId = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: discordId,
        oldValue: this._profileConfigService.getDiscordId(),
        valueName: `discord id`,
      }
    );
  }

  public updateNickname(nickname?: Readonly<string | null>): void {
    this._profileConfigCoreService.nickname = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: nickname,
        oldValue: this._profileConfigService.getNickname(),
        valueName: `nickname`,
      }
    );
  }
}
