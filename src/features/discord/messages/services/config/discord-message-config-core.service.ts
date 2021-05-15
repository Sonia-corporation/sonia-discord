import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { IDiscordMessageCommandConfig } from '../../../interfaces/discord-message-command-config';
import { IDiscordMessageConfig } from '../../../interfaces/discord-message-config';
import { IDiscordMessageErrorConfig } from '../../../interfaces/discord-message-error-config';
import { IDiscordMessageWarningConfig } from '../../../interfaces/discord-message-warning-config';
import _ from 'lodash';

export class DiscordMessageConfigCoreService extends AbstractService implements IDiscordMessageConfig {
  private static _instance: DiscordMessageConfigCoreService;

  public static getInstance(): DiscordMessageConfigCoreService {
    if (_.isNil(DiscordMessageConfigCoreService._instance)) {
      DiscordMessageConfigCoreService._instance = new DiscordMessageConfigCoreService();
    }

    return DiscordMessageConfigCoreService._instance;
  }

  public command: IDiscordMessageCommandConfig = {
    cliError: {
      imageColor: ColorEnum.CANDY,
      imageUrl: IconEnum.CANCEL,
    },
    cookie: {
      imageColor: ColorEnum.SUN,
      imageUrl: IconEnum.COOKIES,
    },
    error: {
      imageColor: ColorEnum.CANDY,
      imageUrl: IconEnum.ERROR,
    },
    help: {
      imageColor: ColorEnum.MINT,
      imageUrl: IconEnum.INFORMATION,
    },
    lunch: {
      imageColor: ColorEnum.SILK,
      imageUrl: IconEnum.RESTAURANT,
    },
    prefix: `!`,
    releaseNotes: {
      bugFixes: {
        imageColor: ColorEnum.DEAD,
        imageUrl: IconEnum.DEADBUG,
      },
      features: {
        imageColor: ColorEnum.CANDY,
        imageUrl: IconEnum.NEW,
      },
      mixed: {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      },
      performanceImprovements: {
        imageColor: ColorEnum.CANDY,
        imageUrl: IconEnum.THE_FLASH_SIGN,
      },
      unknown: {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      },
    },
    version: {
      imageColor: ColorEnum.SKY,
      imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
    },
  };
  public error: IDiscordMessageErrorConfig = {
    imageColor: ColorEnum.CANDY,
    imageUrl: IconEnum.BUG,
  };
  public warning: IDiscordMessageWarningConfig = {
    imageColor: ColorEnum.CANDY,
    imageUrl: IconEnum.WARNING_SHIELD,
  };

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_CORE_SERVICE);
  }
}
