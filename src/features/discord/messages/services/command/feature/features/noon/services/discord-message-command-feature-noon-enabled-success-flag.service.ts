import { AbstractService } from '../../../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../../../enums/service-name.enum';
import { DiscordCommandFlagSuccessDescriptionEnum } from '../../../../../../enums/commands/flags/discord-command-flag-success-description.enum';
import { DiscordCommandFlagSuccessTitleEnum } from '../../../../../../enums/commands/flags/discord-command-flag-success-title.enum';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonEnabledSuccessFlagService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureNoonEnabledSuccessFlagService;

  public static getInstance(): DiscordMessageCommandFeatureNoonEnabledSuccessFlagService {
    if (_.isNil(DiscordMessageCommandFeatureNoonEnabledSuccessFlagService._instance)) {
      DiscordMessageCommandFeatureNoonEnabledSuccessFlagService._instance = new DiscordMessageCommandFeatureNoonEnabledSuccessFlagService();
    }

    return DiscordMessageCommandFeatureNoonEnabledSuccessFlagService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SUCCESS_FLAG_SERVICE);
  }

  public getFlag(
    shouldEnable: Readonly<boolean>,
    isEnabled: Readonly<boolean | undefined>
  ): IDiscordCommandFlagSuccess {
    if (_.isNil(isEnabled)) {
      return this._getFlagWhenNotConfigured(shouldEnable);
    } else if (_.isEqual(isEnabled, true)) {
      return this._getFlagWhenEnabled(shouldEnable);
    }

    return this._getFlagWhenDisabled(shouldEnable);
  }

  private _getFlagWhenNotConfigured(shouldEnable: Readonly<boolean>): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: DiscordCommandFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_ENABLED,
        name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      };
    }

    return {
      description: DiscordCommandFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_DISABLED,
      name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_DISABLED,
    };
  }

  private _getFlagWhenEnabled(shouldEnable: Readonly<boolean>): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: DiscordCommandFlagSuccessDescriptionEnum.ENABLED_AND_ENABLED,
        name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      };
    }

    return {
      description: DiscordCommandFlagSuccessDescriptionEnum.ENABLED_AND_DISABLED,
      name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_DISABLED,
    };
  }

  private _getFlagWhenDisabled(shouldEnable: Readonly<boolean>): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: DiscordCommandFlagSuccessDescriptionEnum.DISABLED_AND_ENABLED,
        name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      };
    }

    return {
      description: DiscordCommandFlagSuccessDescriptionEnum.DISABLED_AND_DISABLED,
      name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_DISABLED,
    };
  }
}
