import { AbstractService } from '../../../../../../../../../../classes/services/abstract.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { IDiscordMessageCommandFeatureConfig } from '../../../../interfaces/discord-message-command-feature-config';
import { IDiscordMessageCommandFeatureNoonConfig } from '../../interfaces/discord-message-command-feature-noon-config';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonConfigCoreService
  extends AbstractService
  implements Pick<IDiscordMessageCommandFeatureConfig, 'noon'>
{
  private static _instance: DiscordMessageCommandFeatureNoonConfigCoreService;

  public static getInstance(): DiscordMessageCommandFeatureNoonConfigCoreService {
    if (_.isNil(DiscordMessageCommandFeatureNoonConfigCoreService._instance)) {
      DiscordMessageCommandFeatureNoonConfigCoreService._instance =
        new DiscordMessageCommandFeatureNoonConfigCoreService();
    }

    return DiscordMessageCommandFeatureNoonConfigCoreService._instance;
  }

  public noon: IDiscordMessageCommandFeatureNoonConfig = {
    imageColor: ColorEnum.DESERT,
    imageUrl: IconEnum.ALARM,
  };

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_CORE_SERVICE);
  }
}
