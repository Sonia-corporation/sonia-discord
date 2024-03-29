import { DiscordMessageConfigCoreService } from './discord-message-config-core.service';
import { DiscordMessageConfigService } from './discord-message-config.service';
import { AbstractConfigService } from '../../../../../classes/services/abstract-config.service';
import { ColorEnum } from '../../../../../enums/color.enum';
import { IconEnum } from '../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { removeUndefined } from '../../../../../functions/formatters/remove-undefined';
import { IPartialNested } from '../../../../../types/partial-nested';
import { ConfigService } from '../../../../config/services/config.service';
import { ChalkService } from '../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { IDiscordConfig } from '../../../interfaces/discord-config';
import { IDiscordMessageCommandCliErrorConfig } from '../../../interfaces/discord-message-command-cli-error-config';
import { IDiscordMessageCommandConfig } from '../../../interfaces/discord-message-command-config';
import { IDiscordMessageCommandCookieConfig } from '../../../interfaces/discord-message-command-cookie-config';
import { IDiscordMessageCommandErrorConfig } from '../../../interfaces/discord-message-command-error-config';
import { IDiscordMessageCommandHeartbeatConfig } from '../../../interfaces/discord-message-command-heartbeat-config';
import { IDiscordMessageCommandLunchConfig } from '../../../interfaces/discord-message-command-lunch-config';
import { IDiscordMessageCommandReleaseNotesConfig } from '../../../interfaces/discord-message-command-release-notes-config';
import { IDiscordMessageCommandReleaseNotesMixedConfig } from '../../../interfaces/discord-message-command-release-notes-mixed-config';
import { IDiscordMessageCommandReleaseNotesUnknownConfig } from '../../../interfaces/discord-message-command-release-notes-unknown-config';
import { IDiscordMessageCommandVersionConfig } from '../../../interfaces/discord-message-command-version-config';
import { IDiscordMessageConfig } from '../../../interfaces/discord-message-config';
import { IDiscordMessageErrorConfig } from '../../../interfaces/discord-message-error-config';
import { IDiscordMessageWarningConfig } from '../../../interfaces/discord-message-warning-config';
import { DiscordMessageConfigValueNameEnum } from '../../enums/discord-message-config-value-name.enum';
import _ from 'lodash';

/**
 * @description
 * The service used to modify the config for the commands.
 * @see [sonia-link-003]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-003}.
 */
export class DiscordMessageConfigMutatorService extends AbstractConfigService<IDiscordConfig> {
  private static _instance: DiscordMessageConfigMutatorService;

  public static getInstance(config?: IPartialNested<IDiscordConfig>): DiscordMessageConfigMutatorService {
    if (_.isNil(DiscordMessageConfigMutatorService._instance)) {
      DiscordMessageConfigMutatorService._instance = new DiscordMessageConfigMutatorService(config);
    }

    return DiscordMessageConfigMutatorService._instance;
  }

  public constructor(config?: IPartialNested<IDiscordConfig>) {
    super(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_MUTATOR_SERVICE, config);
  }

  public override preUpdateConfig(): void {
    LoggerService.getInstance();
    DiscordMessageConfigCoreService.getInstance();
    DiscordMessageConfigService.getInstance();
  }

  public override updateConfig(config?: IPartialNested<IDiscordConfig>): void {
    if (!_.isNil(config)) {
      this.updateMessage(config.message);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateMessage(message?: IPartialNested<IDiscordMessageConfig>): void {
    if (!_.isNil(message)) {
      this.updateMessageCommand(message.command);
      this.updateMessageError(message.error);
      this.updateMessageWarning(message.warning);
    }
  }

  public updateMessageCommand(command?: IPartialNested<IDiscordMessageCommandConfig>): void {
    if (!_.isNil(command)) {
      this.updateMessageCommandCliError(command.cliError);
      this.updateMessageCommandCookie(command.cookie);
      this.updateMessageCommandError(command.error);
      this.updateMessageCommandHelp(command.help);
      this.updateMessageCommandPrefix(command.prefix);
      this.updateMessageCommandReleaseNotes(command.releaseNotes);
      this.updateMessageCommandVersion(command.version);
      this.updateMessageCommandLunch(command.lunch);
      this.updateMessageCommandHeartbeat(command.heartbeat);
    }
  }

  public updateMessageCommandCliError(cliError?: IPartialNested<IDiscordMessageCommandCliErrorConfig>): void {
    if (!_.isNil(cliError)) {
      this.updateMessageCommandCliErrorImageColor(cliError.imageColor);
      this.updateMessageCommandCliErrorImageUrl(cliError.imageUrl);
    }
  }

  public updateMessageCommandCliErrorImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.cliError.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandCliErrorImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_CLI_ERROR_IMAGE_COLOR,
      });
  }

  public updateMessageCommandCliErrorImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.cliError.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandCliErrorImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_CLI_ERROR_IMAGE_URL,
      });
  }

  public updateMessageCommandCookie(cookie?: IPartialNested<IDiscordMessageCommandCookieConfig>): void {
    if (!_.isNil(cookie)) {
      this.updateMessageCommandCookieImageColor(cookie.imageColor);
      this.updateMessageCommandCookieImageUrl(cookie.imageUrl);
    }
  }

  public updateMessageCommandCookieImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.cookie.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandCookieImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_COLOR,
      });
  }

  public updateMessageCommandCookieImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.cookie.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandCookieImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_URL,
      });
  }

  public updateMessageCommandError(error?: IPartialNested<IDiscordMessageCommandErrorConfig>): void {
    if (!_.isNil(error)) {
      this.updateMessageCommandErrorImageColor(error.imageColor);
      this.updateMessageCommandErrorImageUrl(error.imageUrl);
    }
  }

  public updateMessageCommandErrorImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.error.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_COLOR,
      });
  }

  public updateMessageCommandErrorImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.error.imageUrl = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandHelp(error?: IPartialNested<IDiscordMessageCommandErrorConfig>): void {
    if (!_.isNil(error)) {
      this.updateMessageCommandHelpImageColor(error.imageColor);
      this.updateMessageCommandHelpImageUrl(error.imageUrl);
    }
  }

  public updateMessageCommandHelpImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.help.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandHelpImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_COLOR,
      });
  }

  public updateMessageCommandHelpImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.help.imageUrl = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: imageUrl,
      oldValue: DiscordMessageConfigService.getInstance().getMessageCommandHelpImageUrl(),
      valueName: DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_URL,
    });
  }

  public updateMessageCommandLunch(lunch?: IPartialNested<IDiscordMessageCommandLunchConfig>): void {
    if (!_.isNil(lunch)) {
      this.updateMessageCommandLunchImageColor(lunch.imageColor);
      this.updateMessageCommandLunchImageUrl(lunch.imageUrl);
    }
  }

  public updateMessageCommandLunchImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.lunch.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandLunchImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_LUNCH_IMAGE_COLOR,
      });
  }

  public updateMessageCommandLunchImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.lunch.imageUrl = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandLunchImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_LUNCH_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandHeartbeat(heartbeat?: IPartialNested<IDiscordMessageCommandHeartbeatConfig>): void {
    if (!_.isNil(heartbeat)) {
      this.updateMessageCommandHeartbeatImageColor(heartbeat.imageColor);
      this.updateMessageCommandHeartbeatImageUrl(heartbeat.imageUrl);
    }
  }

  public updateMessageCommandHeartbeatImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.heartbeat.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandHeartbeatImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HEARTBEAT_IMAGE_COLOR,
      });
  }

  public updateMessageCommandHeartbeatImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.heartbeat.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandHeartbeatImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HEARTBEAT_IMAGE_URL,
      });
  }

  public updateMessageCommandPrefix(prefix?: string | (string | undefined)[]): void {
    let updatedPrefix: string | string[] | undefined;

    if (_.isArray(prefix)) {
      updatedPrefix = removeUndefined(prefix);
    } else if (_.isString(prefix)) {
      updatedPrefix = prefix;
    }

    DiscordMessageConfigCoreService.getInstance().command.prefix = ConfigService.getInstance().getUpdatedStringOrArray({
      context: this._serviceName,
      newValue: updatedPrefix,
      oldValue: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
      valueName: DiscordMessageConfigValueNameEnum.COMMAND_PREFIX,
    });
  }

  public updateMessageCommandReleaseNotes(
    releaseNotes?: IPartialNested<IDiscordMessageCommandReleaseNotesConfig>
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesBugFixes(releaseNotes.bugFixes);
      this.updateMessageCommandReleaseNotesFeatures(releaseNotes.features);
      this.updateMessageCommandReleaseNotesMixed(releaseNotes.mixed);
      this.updateMessageCommandReleaseNotesPerformanceImprovements(releaseNotes.performanceImprovements);
      this.updateMessageCommandReleaseNotesUnknown(releaseNotes.unknown);
    }
  }

  public updateMessageCommandReleaseNotesBugFixes(
    releaseNotes?: IPartialNested<IDiscordMessageCommandReleaseNotesMixedConfig>
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesBugFixesImageColor(releaseNotes.imageColor);
      this.updateMessageCommandReleaseNotesBugFixesImageUrl(releaseNotes.imageUrl);
    }
  }

  public updateMessageCommandReleaseNotesBugFixesImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.bugFixes.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesBugFixesImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_BUG_FIXES_IMAGE_COLOR,
      });
  }

  public updateMessageCommandReleaseNotesBugFixesImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.bugFixes.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesBugFixesImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_BUG_FIXES_IMAGE_URL,
      });
  }

  public updateMessageCommandReleaseNotesFeatures(
    releaseNotes?: IPartialNested<IDiscordMessageCommandReleaseNotesMixedConfig>
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesFeaturesImageColor(releaseNotes.imageColor);
      this.updateMessageCommandReleaseNotesFeaturesImageUrl(releaseNotes.imageUrl);
    }
  }

  public updateMessageCommandReleaseNotesFeaturesImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.features.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesFeaturesImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_FEATURES_IMAGE_COLOR,
      });
  }

  public updateMessageCommandReleaseNotesFeaturesImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.features.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesFeaturesImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_FEATURES_IMAGE_URL,
      });
  }

  public updateMessageCommandReleaseNotesMixed(
    releaseNotes?: IPartialNested<IDiscordMessageCommandReleaseNotesMixedConfig>
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesMixedImageColor(releaseNotes.imageColor);
      this.updateMessageCommandReleaseNotesMixedImageUrl(releaseNotes.imageUrl);
    }
  }

  public updateMessageCommandReleaseNotesMixedImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.mixed.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesMixedImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_MIXED_IMAGE_COLOR,
      });
  }

  public updateMessageCommandReleaseNotesMixedImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.mixed.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesMixedImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_MIXED_IMAGE_URL,
      });
  }

  public updateMessageCommandReleaseNotesPerformanceImprovements(
    releaseNotes?: IPartialNested<IDiscordMessageCommandReleaseNotesMixedConfig>
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesPerformanceImprovementsImageColor(releaseNotes.imageColor);
      this.updateMessageCommandReleaseNotesPerformanceImprovementsImageUrl(releaseNotes.imageUrl);
    }
  }

  public updateMessageCommandReleaseNotesPerformanceImprovementsImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.performanceImprovements.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue:
          DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesPerformanceImprovementsImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_PERFORMANCE_IMPROVEMENTS_IMAGE_COLOR,
      });
  }

  public updateMessageCommandReleaseNotesPerformanceImprovementsImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.performanceImprovements.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue:
          DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesPerformanceImprovementsImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_PERFORMANCE_IMPROVEMENTS_IMAGE_URL,
      });
  }

  public updateMessageCommandReleaseNotesUnknown(
    releaseNotes?: IPartialNested<IDiscordMessageCommandReleaseNotesUnknownConfig>
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesUnknownImageColor(releaseNotes.imageColor);
      this.updateMessageCommandReleaseNotesUnknownImageUrl(releaseNotes.imageUrl);
    }
  }

  public updateMessageCommandReleaseNotesUnknownImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.unknown.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesUnknownImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_UNKNOWN_IMAGE_COLOR,
      });
  }

  public updateMessageCommandReleaseNotesUnknownImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.releaseNotes.unknown.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesUnknownImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_UNKNOWN_IMAGE_URL,
      });
  }

  public updateMessageCommandVersion(version?: IPartialNested<IDiscordMessageCommandVersionConfig>): void {
    if (!_.isNil(version)) {
      this.updateMessageCommandVersionImageColor(version.imageColor);
      this.updateMessageCommandVersionImageUrl(version.imageUrl);
    }
  }

  public updateMessageCommandVersionImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.version.imageColor =
      ConfigService.getInstance().getUpdatedNumber({
        context: this._serviceName,
        newValue: imageColor,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandVersionImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_COLOR,
      });
  }

  public updateMessageCommandVersionImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().command.version.imageUrl =
      ConfigService.getInstance().getUpdatedString({
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: DiscordMessageConfigService.getInstance().getMessageCommandVersionImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_URL,
      });
  }

  public updateMessageError(error?: IPartialNested<IDiscordMessageErrorConfig>): void {
    if (!_.isNil(error)) {
      this.updateMessageErrorImageColor(error.imageColor);
      this.updateMessageErrorImageUrl(error.imageUrl);
    }
  }

  public updateMessageErrorImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().error.imageColor = ConfigService.getInstance().getUpdatedNumber({
      context: this._serviceName,
      newValue: imageColor,
      oldValue: DiscordMessageConfigService.getInstance().getMessageErrorImageColor(),
      valueName: DiscordMessageConfigValueNameEnum.ERROR_IMAGE_COLOR,
    });
  }

  public updateMessageErrorImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().error.imageUrl = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: imageUrl,
      oldValue: DiscordMessageConfigService.getInstance().getMessageErrorImageUrl(),
      valueName: DiscordMessageConfigValueNameEnum.ERROR_IMAGE_URL,
    });
  }

  public updateMessageWarning(warning?: IPartialNested<IDiscordMessageWarningConfig>): void {
    if (!_.isNil(warning)) {
      this.updateMessageWarningImageColor(warning.imageColor);
      this.updateMessageWarningImageUrl(warning.imageUrl);
    }
  }

  public updateMessageWarningImageColor(imageColor?: ColorEnum): void {
    DiscordMessageConfigCoreService.getInstance().warning.imageColor = ConfigService.getInstance().getUpdatedNumber({
      context: this._serviceName,
      newValue: imageColor,
      oldValue: DiscordMessageConfigService.getInstance().getMessageWarningImageColor(),
      valueName: DiscordMessageConfigValueNameEnum.WARNING_IMAGE_COLOR,
    });
  }

  public updateMessageWarningImageUrl(imageUrl?: IconEnum): void {
    DiscordMessageConfigCoreService.getInstance().warning.imageUrl = ConfigService.getInstance().getUpdatedString({
      context: this._serviceName,
      newValue: imageUrl,
      oldValue: DiscordMessageConfigService.getInstance().getMessageWarningImageUrl(),
      valueName: DiscordMessageConfigValueNameEnum.WARNING_IMAGE_URL,
    });
  }
}
