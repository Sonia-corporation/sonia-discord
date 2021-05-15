import { DiscordMessageCommandFeatureReleaseNotesConfigCoreService } from './discord-message-command-feature-release-notes-config-core.service';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from './discord-message-command-feature-release-notes-config.service';
import { AbstractConfigService } from '../../../../../../../../../../classes/services/abstract-config.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IPartialNested } from '../../../../../../../../../../types/partial-nested';
import { ConfigService } from '../../../../../../../../../config/services/config.service';
import { ChalkService } from '../../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../../logger/services/logger.service';
import { DiscordMessageConfigValueNameEnum } from '../../../../../../../enums/discord-message-config-value-name.enum';
import { IDiscordMessageCommandFeatureConfig } from '../../../../interfaces/discord-message-command-feature-config';
import { IDiscordMessageCommandFeatureReleaseNotesConfig } from '../../interfaces/discord-message-command-feature-release-notes-config';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesConfigMutatorService extends AbstractConfigService<IDiscordMessageCommandFeatureConfig> {
  private static _instance: DiscordMessageCommandFeatureReleaseNotesConfigMutatorService;

  public static getInstance(
    config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureConfig>>
  ): DiscordMessageCommandFeatureReleaseNotesConfigMutatorService {
    if (_.isNil(DiscordMessageCommandFeatureReleaseNotesConfigMutatorService._instance)) {
      DiscordMessageCommandFeatureReleaseNotesConfigMutatorService._instance = new DiscordMessageCommandFeatureReleaseNotesConfigMutatorService(
        config
      );
    }

    return DiscordMessageCommandFeatureReleaseNotesConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureConfig>>) {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();
    DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureConfig>>): void {
    if (!_.isNil(config)) {
      this.updateReleaseNotes(config.releaseNotes?.unknown);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateReleaseNotes(config?: Readonly<IPartialNested<IDiscordMessageCommandFeatureReleaseNotesConfig>>): void {
    if (!_.isNil(config)) {
      this.updateReleaseNotesImageColor(config.imageColor);
      this.updateReleaseNotesImageUrl(config.imageUrl);
    }
  }

  public updateReleaseNotesImageColor(imageColor?: Readonly<ColorEnum>): void {
    DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance().releaseNotes.imageColor = ConfigService.getInstance().getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance().getReleaseNotesConfigImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_FEATURE_RELEASE_NOTES_COLOR,
      }
    );
  }

  public updateReleaseNotesImageUrl(imageUrl?: Readonly<IconEnum>): void {
    DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance().releaseNotes.imageUrl = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance().getReleaseNotesConfigImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_FEATURE_RELEASE_NOTES_IMAGE_URL,
      }
    );
  }
}
