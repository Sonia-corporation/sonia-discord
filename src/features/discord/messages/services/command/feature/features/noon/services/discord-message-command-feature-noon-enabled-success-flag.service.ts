import { AbstractService } from '../../../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../../../enums/service-name.enum';
import { replaceInTemplate } from '../../../../../../../../../functions/formatters/replace-in-template';
import { IDiscordHumanizedChannel } from '../../../../../../../channels/types/discord-humanized-channel';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { DiscordMessageCommandNoonFlagSuccessDescriptionEnum } from '../enums/discord-message-command-noon-flag-success-description.enum';
import { DiscordMessageCommandNoonFlagSuccessTitleEnum } from '../enums/discord-message-command-noon-flag-success-title.enum';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonEnabledSuccessFlagService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureNoonEnabledSuccessFlagService;

  public static getInstance(): DiscordMessageCommandFeatureNoonEnabledSuccessFlagService {
    if (_.isNil(DiscordMessageCommandFeatureNoonEnabledSuccessFlagService._instance)) {
      DiscordMessageCommandFeatureNoonEnabledSuccessFlagService._instance =
        new DiscordMessageCommandFeatureNoonEnabledSuccessFlagService();
    }

    return DiscordMessageCommandFeatureNoonEnabledSuccessFlagService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SUCCESS_FLAG_SERVICE);
  }

  public getFlag(
    shouldEnable: boolean,
    isEnabled: boolean | undefined,
    humanizedChannel: IDiscordHumanizedChannel
  ): IDiscordCommandFlagSuccess {
    if (_.isNil(isEnabled)) {
      return this._getFlagWhenNotConfigured(shouldEnable, humanizedChannel);
    } else if (_.isEqual(isEnabled, true)) {
      return this._getFlagWhenEnabled(shouldEnable, humanizedChannel);
    }

    return this._getFlagWhenDisabled(shouldEnable, humanizedChannel);
  }

  private _getFlagWhenNotConfigured(
    shouldEnable: boolean,
    humanizedChannel: IDiscordHumanizedChannel
  ): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: replaceInTemplate(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_ENABLED, {
          channelType: humanizedChannel,
        }),
        name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      };
    }

    return {
      description: replaceInTemplate(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_DISABLED, {
        channelType: humanizedChannel,
      }),
      name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_DISABLED,
    };
  }

  private _getFlagWhenEnabled(
    shouldEnable: boolean,
    humanizedChannel: IDiscordHumanizedChannel
  ): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: replaceInTemplate(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.ENABLED_AND_ENABLED, {
          channelType: humanizedChannel,
        }),
        name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      };
    }

    return {
      description: replaceInTemplate(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.ENABLED_AND_DISABLED, {
        channelType: humanizedChannel,
      }),
      name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_DISABLED,
    };
  }

  private _getFlagWhenDisabled(
    shouldEnable: boolean,
    humanizedChannel: IDiscordHumanizedChannel
  ): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: replaceInTemplate(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.DISABLED_AND_ENABLED, {
          channelType: humanizedChannel,
        }),
        name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      };
    }

    return {
      description: replaceInTemplate(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.DISABLED_AND_DISABLED, {
        channelType: humanizedChannel,
      }),
      name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_DISABLED,
    };
  }
}
