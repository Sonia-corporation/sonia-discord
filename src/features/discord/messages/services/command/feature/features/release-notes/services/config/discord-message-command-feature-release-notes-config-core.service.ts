import { AbstractService } from '../../../../../../../../../../classes/services/abstract.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IDiscordMessageCommandFeatureConfig } from '../../../../interfaces/discord-message-command-feature-config';
import { IDiscordMessageCommandFeatureReleaseNotesConfig } from '../../interfaces/discord-message-command-feature-release-notes-config';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesConfigCoreService
  extends AbstractService
  implements Pick<IDiscordMessageCommandFeatureConfig, 'releaseNotes'> {
  private static _instance: DiscordMessageCommandFeatureReleaseNotesConfigCoreService;

  public static getInstance(): DiscordMessageCommandFeatureReleaseNotesConfigCoreService {
    if (_.isNil(DiscordMessageCommandFeatureReleaseNotesConfigCoreService._instance)) {
      DiscordMessageCommandFeatureReleaseNotesConfigCoreService._instance = new DiscordMessageCommandFeatureReleaseNotesConfigCoreService();
    }

    return DiscordMessageCommandFeatureReleaseNotesConfigCoreService._instance;
  }

  public releaseNotes: IDiscordMessageCommandFeatureReleaseNotesConfig = {
    imageColor: ColorEnum.DESERT,
    imageUrl: IconEnum.NEW_PRODUCT,
  };

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_CORE_SERVICE);
  }
}
