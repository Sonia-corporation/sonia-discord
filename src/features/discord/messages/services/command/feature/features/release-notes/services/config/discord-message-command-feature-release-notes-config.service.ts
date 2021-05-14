import { DiscordMessageCommandFeatureReleaseNotesConfigCoreService } from './discord-message-command-feature-release-notes-config-core.service';
import { AbstractService } from '../../../../../../../../../../classes/services/abstract.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IDiscordMessageCommandFeatureReleaseNotesConfig } from '../../interfaces/discord-message-command-feature-release-notes-config';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesConfigService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureReleaseNotesConfigService;

  public static getInstance(): DiscordMessageCommandFeatureReleaseNotesConfigService {
    if (_.isNil(DiscordMessageCommandFeatureReleaseNotesConfigService._instance)) {
      DiscordMessageCommandFeatureReleaseNotesConfigService._instance =
        new DiscordMessageCommandFeatureReleaseNotesConfigService();
    }

    return DiscordMessageCommandFeatureReleaseNotesConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_SERVICE);
  }

  public getReleaseNotesConfig(): IDiscordMessageCommandFeatureReleaseNotesConfig {
    return DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance().releaseNotes;
  }

  public getReleaseNotesConfigImageColor(): ColorEnum {
    return DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance().releaseNotes.imageColor;
  }

  public getReleaseNotesConfigImageUrl(): IconEnum {
    return DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance().releaseNotes.imageUrl;
  }
}
