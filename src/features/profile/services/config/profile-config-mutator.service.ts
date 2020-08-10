import _ from "lodash";
import { AbstractConfigService } from "../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { ConfigService } from "../../../config/services/config.service";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
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

  public constructor(config?: Readonly<Partial<IProfileConfig>>) {
    super(ServiceNameEnum.PROFILE_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    ProfileConfigCoreService.getInstance();
    ProfileConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<Partial<IProfileConfig>>): void {
    if (!_.isNil(config)) {
      this.updateDiscordId(config.discordId);
      this.updateNickname(config.nickname);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateDiscordId(discordId?: Readonly<string | null>): void {
    ProfileConfigCoreService.getInstance().discordId = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: discordId,
        oldValue: ProfileConfigService.getInstance().getDiscordId(),
        valueName: `discord id`,
      }
    );
  }

  public updateNickname(nickname?: Readonly<string | null>): void {
    ProfileConfigCoreService.getInstance().nickname = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: nickname,
        oldValue: ProfileConfigService.getInstance().getNickname(),
        valueName: `nickname`,
      }
    );
  }
}
