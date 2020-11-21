import { DiscordMessageCommandFeatureNoonConfigCoreService } from './discord-message-command-feature-noon-config-core.service';
import { DiscordMessageCommandFeatureNoonConfigService } from './discord-message-command-feature-noon-config.service';
import { AbstractConfigService } from '../../../../../../../../../../classes/services/abstract-config.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../../../../../../../types/partial-nested';
import { ConfigService } from '../../../../../../../../../config/services/config.service';
import { ChalkService } from '../../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../../logger/services/logger.service';
import { DiscordMessageConfigValueNameEnum } from '../../../../../../../enums/discord-message-config-value-name.enum';
import { IDiscordMessageCommandFeatureConfig } from '../../interfaces/discord-message-command-feature-config';
import { IDiscordMessageCommandFeatureNoonConfig } from '../../interfaces/discord-message-command-feature-noon-config';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonConfigMutatorService extends AbstractConfigService<IDiscordMessageCommandFeatureConfig> {
  private static _instance: DiscordMessageCommandFeatureNoonConfigMutatorService;

  public static getInstance(
    config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureConfig>>
  ): DiscordMessageCommandFeatureNoonConfigMutatorService {
    if (_.isNil(DiscordMessageCommandFeatureNoonConfigMutatorService._instance)) {
      DiscordMessageCommandFeatureNoonConfigMutatorService._instance = new DiscordMessageCommandFeatureNoonConfigMutatorService(
        config
      );
    }

    return DiscordMessageCommandFeatureNoonConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureConfig>>) {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();
    DiscordMessageCommandFeatureNoonConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureConfig>>): void {
    if (!_.isNil(config)) {
      this.updateNoon(config.noon);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateNoon(config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureNoonConfig>>): void {
    if (!_.isNil(config)) {
      this.updateNoonImageColor(config.imageColor);
      this.updateNoonImageUrl(config.imageUrl);
    }
  }

  public updateNoonImageColor(imageColor?: Readonly<ColorEnum>): void {
    DiscordMessageCommandFeatureNoonConfigCoreService.getInstance().noon.imageColor = ConfigService.getInstance().getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageCommandFeatureNoonConfigService.getInstance().getNoonConfigImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_FEATURE_NOON_COLOR,
      }
    );
  }

  public updateNoonImageUrl(imageUrl?: Readonly<IconEnum>): void {
    DiscordMessageCommandFeatureNoonConfigCoreService.getInstance().noon.imageUrl = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageCommandFeatureNoonConfigService.getInstance().getNoonConfigImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_FEATURE_NOON_IMAGE_URL,
      }
    );
  }
}
