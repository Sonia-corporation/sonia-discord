import { AbstractService } from '../../../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../../../enums/service-name.enum';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum } from '../enums/discord-message-command-release-notes-flag-success-description.enum';
import { DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum } from '../enums/discord-message-command-release-notes-flag-success-title.enum';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService;

  public static getInstance(): DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService {
    if (_.isNil(DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService._instance)) {
      DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService._instance =
        new DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService();
    }

    return DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED_SUCCESS_FLAG_SERVICE);
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
        description: DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_ENABLED,
        name: DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_ENABLED,
      };
    }

    return {
      description: DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_DISABLED,
      name: DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_DISABLED,
    };
  }

  private _getFlagWhenEnabled(shouldEnable: Readonly<boolean>): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.ENABLED_AND_ENABLED,
        name: DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_ENABLED,
      };
    }

    return {
      description: DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.ENABLED_AND_DISABLED,
      name: DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_DISABLED,
    };
  }

  private _getFlagWhenDisabled(shouldEnable: Readonly<boolean>): IDiscordCommandFlagSuccess {
    if (_.isEqual(shouldEnable, true)) {
      return {
        description: DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.DISABLED_AND_ENABLED,
        name: DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_ENABLED,
      };
    }

    return {
      description: DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.DISABLED_AND_DISABLED,
      name: DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_DISABLED,
    };
  }
}
