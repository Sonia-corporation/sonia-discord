/* eslint-disable import/order */
import { Message } from 'discord.js';
import _ from 'lodash';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { ChalkService } from '../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordChannelEnum } from '../../../../channels/enums/discord-channel.enum';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { discordHasThisCommand } from '../../../functions/commands/checks/discord-has-this-command';
import { discordGetCommandFirstArgument } from '../../../functions/commands/getters/discord-get-command-first-argument';
import { discordGetCommandFlags } from '../../../functions/commands/getters/discord-get-command-flags';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { IDiscordCommandFlagsDuplicated } from '../../../types/commands/flags/discord-command-flags-duplicated';
import { IDiscordCommandFlagsErrors } from '../../../types/commands/flags/discord-command-flags-errors';
import { IDiscordCommandFlagsOpposite } from '../../../types/commands/flags/discord-command-flags-opposite';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { DiscordMessageCommandCoreService } from '../discord-message-command-core.service';
import { DiscordMessageCommandFeatureNameEnum } from './enums/discord-message-command-feature-name.enum';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from './features/noon/constants/discord-message-command-feature-noon-flags';
import { DiscordMessageCommandFeatureNoonService } from './features/noon/services/discord-message-command-feature-noon.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS } from './features/release-notes/constants/discord-message-command-feature-release-notes-flags';
import { DiscordMessageCommandFeatureReleaseNotesService } from './features/release-notes/services/discord-message-command-feature-release-notes.service';
import { DiscordMessageCommandFeatureEmptyContentErrorService } from './services/discord-message-command-feature-empty-content-error.service';
import { DiscordMessageCommandFeatureEmptyFeatureNameErrorService } from './services/feature-names/discord-message-command-feature-empty-feature-name-error.service';
import { DiscordMessageCommandFeatureWrongFeatureNameErrorService } from './services/feature-names/discord-message-command-feature-wrong-feature-name-error.service';
import { DiscordMessageCommandFeatureDuplicatedFlagsErrorService } from './services/flags/discord-message-command-feature-duplicated-flags-error.service';
import { DiscordMessageCommandFeatureEmptyFlagsErrorService } from './services/flags/discord-message-command-feature-empty-flags-error.service';
import { DiscordMessageCommandFeatureOppositeFlagsErrorService } from './services/flags/discord-message-command-feature-opposite-flags-error.service';
import { DiscordMessageCommandFeatureWrongFlagsErrorService } from './services/flags/discord-message-command-feature-wrong-flags-error.service';

export class DiscordMessageCommandFeatureService extends DiscordMessageCommandCoreService {
  private static _instance: DiscordMessageCommandFeatureService;

  public static getInstance(): DiscordMessageCommandFeatureService {
    if (_.isNil(DiscordMessageCommandFeatureService._instance)) {
      DiscordMessageCommandFeatureService._instance = new DiscordMessageCommandFeatureService();
    }

    return DiscordMessageCommandFeatureService._instance;
  }

  public readonly allowedChannels: Set<DiscordChannelEnum> = new Set<DiscordChannelEnum>([
    DiscordChannelEnum.DM,
    DiscordChannelEnum.TEXT,
  ]);
  protected readonly _commandName: string = `feature`;

  private readonly _commands: DiscordMessageCommandEnum[] = [
    DiscordMessageCommandEnum.FEATURE,
    DiscordMessageCommandEnum.F,
  ];

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE);
  }

  public getMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    if (!_.isString(anyDiscordMessage.content)) {
      return DiscordMessageCommandFeatureEmptyContentErrorService.getInstance().getMessageResponse();
    }

    // Small type hack but the other way is to use instanceof, and it's not nice for the testing purposes
    const message: Message = anyDiscordMessage as Message;
    const featureName: string | null = this._getFeatureName(message.content);

    if (_.isNil(featureName)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        hasExtendedContext: true,
        message: LoggerService.getInstance().getSnowflakeContext(message.id, `feature name not specified`),
      });

      return DiscordMessageCommandFeatureEmptyFeatureNameErrorService.getInstance().getMessageResponse(
        message,
        this._commands
      );
    }

    if (DiscordMessageCommandFeatureNoonService.getInstance().isNoonFeature(featureName)) {
      return this._getNoonMessageResponse(message);
    }

    if (DiscordMessageCommandFeatureReleaseNotesService.getInstance().isReleaseNotesFeature(featureName)) {
      return this._getReleaseNotesMessageResponse(message);
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        message.id,
        `feature name ${ChalkService.getInstance().value(featureName)} not matching an existing feature`
      ),
    });

    return DiscordMessageCommandFeatureWrongFeatureNameErrorService.getInstance().getMessageResponse(
      message,
      this._commands,
      featureName
    );
  }

  public hasCommand(message: string): boolean {
    return discordHasThisCommand({
      commands: this._commands,
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  public hasFlags(message: string): boolean {
    const flags: string | null = this.getFlags(message);

    return !_.isNil(flags);
  }

  public getFlags(message: string): string | null {
    return discordGetCommandFlags({
      commands: this._commands,
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getFeatureName(message: string): string | null {
    return discordGetCommandFirstArgument({
      commands: this._commands,
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getEmptyFlagsErrorMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    featureName: DiscordMessageCommandFeatureNameEnum
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `feature name ${ChalkService.getInstance().value(_.capitalize(featureName))} not having any flags`
      ),
    });

    return DiscordMessageCommandFeatureEmptyFlagsErrorService.getInstance().getMessageResponse(
      anyDiscordMessage,
      this._commands,
      featureName
    );
  }

  private _getWrongFlagsErrorMessageResponse(
    { id }: IAnyDiscordMessage,
    featureName: DiscordMessageCommandFeatureNameEnum,
    flagsErrors: IDiscordCommandFlagsErrors
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `feature name ${ChalkService.getInstance().value(_.capitalize(featureName))} not having all valid flags`
      ),
    });

    return DiscordMessageCommandFeatureWrongFlagsErrorService.getInstance().getMessageResponse(flagsErrors);
  }

  private _getDuplicatedFlagsErrorMessageResponse(
    { id }: IAnyDiscordMessage,
    featureName: DiscordMessageCommandFeatureNameEnum,
    flagsDuplicated: IDiscordCommandFlagsDuplicated
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `feature name ${ChalkService.getInstance().value(_.capitalize(featureName))} has duplicated flags`
      ),
    });

    return DiscordMessageCommandFeatureDuplicatedFlagsErrorService.getInstance().getMessageResponse(flagsDuplicated);
  }

  private _getOppositeFlagsErrorMessageResponse(
    { id }: IAnyDiscordMessage,
    featureName: DiscordMessageCommandFeatureNameEnum,
    oppositeFlags: IDiscordCommandFlagsOpposite
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `feature name ${ChalkService.getInstance().value(_.capitalize(featureName))} has opposite flags`
      ),
    });

    return DiscordMessageCommandFeatureOppositeFlagsErrorService.getInstance().getMessageResponse(oppositeFlags);
  }

  private async _getNoonMessageResponse(
    message: Message
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    const verifiedResult: IDiscordMessageResponse | undefined =
      await DiscordMessageCommandFeatureNoonService.getInstance().verifyMessage(message);

    if (!_.isNil(verifiedResult)) {
      return verifiedResult;
    }

    const messageFlags: string | null = this.getFlags(message.content);

    if (_.isNil(messageFlags)) {
      return this._getEmptyFlagsErrorMessageResponse(message, DiscordMessageCommandFeatureNameEnum.NOON);
    }

    const flagsErrors: IDiscordCommandFlagsErrors | null =
      DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getErrors(messageFlags);

    if (!_.isNil(flagsErrors)) {
      return this._getWrongFlagsErrorMessageResponse(message, DiscordMessageCommandFeatureNameEnum.NOON, flagsErrors);
    }

    const flagsDuplicated: IDiscordCommandFlagsDuplicated | null =
      DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getDuplicated(messageFlags);

    if (!_.isNil(flagsDuplicated)) {
      return this._getDuplicatedFlagsErrorMessageResponse(
        message,
        DiscordMessageCommandFeatureNameEnum.NOON,
        flagsDuplicated
      );
    }

    const oppositeFlags: IDiscordCommandFlagsOpposite | null =
      DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getOpposites(messageFlags);

    if (!_.isNil(oppositeFlags)) {
      return this._getOppositeFlagsErrorMessageResponse(
        message,
        DiscordMessageCommandFeatureNameEnum.NOON,
        oppositeFlags
      );
    }

    return DiscordMessageCommandFeatureNoonService.getInstance().getMessageResponse(message, messageFlags);
  }

  private async _getReleaseNotesMessageResponse(
    message: Message
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    const verifiedResult: IDiscordMessageResponse | undefined =
      await DiscordMessageCommandFeatureReleaseNotesService.getInstance().verifyMessage(message);

    if (!_.isNil(verifiedResult)) {
      return verifiedResult;
    }

    const messageFlags: string | null = this.getFlags(message.content);

    if (_.isNil(messageFlags)) {
      return this._getEmptyFlagsErrorMessageResponse(message, DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES);
    }

    const flagsErrors: IDiscordCommandFlagsErrors | null =
      DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS.getErrors(messageFlags);

    if (!_.isNil(flagsErrors)) {
      return this._getWrongFlagsErrorMessageResponse(
        message,
        DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES,
        flagsErrors
      );
    }

    const flagsDuplicated: IDiscordCommandFlagsDuplicated | null =
      DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS.getDuplicated(messageFlags);

    if (!_.isNil(flagsDuplicated)) {
      return this._getDuplicatedFlagsErrorMessageResponse(
        message,
        DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES,
        flagsDuplicated
      );
    }

    const oppositeFlags: IDiscordCommandFlagsOpposite | null =
      DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS.getOpposites(messageFlags);

    if (!_.isNil(oppositeFlags)) {
      return this._getOppositeFlagsErrorMessageResponse(
        message,
        DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES,
        oppositeFlags
      );
    }

    return DiscordMessageCommandFeatureReleaseNotesService.getInstance().getMessageResponse(message, messageFlags);
  }
}
