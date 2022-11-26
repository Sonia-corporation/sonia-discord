import { DiscordMessageCommandVerifyChannelRightService } from './discord-message-command-verify-channel-right.service';
import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordChannelEnum } from '../../../channels/enums/discord-channel.enum';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';

/**
 * @description
 * Core service common to all commands.
 */
export abstract class DiscordMessageCommandCoreService extends AbstractService {
  /**
   * @description
   * The white-list of channels allowed for this command.
   * Omitting to list a channel type will disallow to execute the command as expected.
   */
  public abstract readonly allowedChannels: Set<DiscordChannelEnum>;

  /**
   * @description
   * The command name.
   * Used by the logger.
   * @protected
   */
  protected abstract readonly _commandName: string;

  protected constructor(serviceName: ServiceNameEnum) {
    super(serviceName);
  }

  /**
   * @description
   * Process the given message to execute a command.
   * @param   {IAnyDiscordMessage}                                           anyDiscordMessage The message that triggered the command.
   * @returns {Promise<IDiscordMessageResponse | IDiscordMessageResponse[]>}                   Return a response or multiple responses.
   */
  public handleResponse(
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `${this._commandName} command detected`
      ),
    });

    if (!this.canSendMessageResponseToThisChannel(anyDiscordMessage)) {
      return this.getNotAllowedChannelErrorMessageResponse(anyDiscordMessage);
    }

    return this.getMessageResponse(anyDiscordMessage);
  }

  /**
   * @description
   * Check if the message can be properly handled for this command based on the channel type.
   * If the channel type is not allowed, we should display an error message instead to warn the user.
   * @param   {IAnyDiscordMessage} anyDiscordMessage The message that triggered the command.
   * @returns {boolean}                              Return true when the command can be processed as expected.
   */
  public canSendMessageResponseToThisChannel(anyDiscordMessage: IAnyDiscordMessage): boolean {
    return (
      DiscordMessageCommandVerifyChannelRightService.getInstance().verify(anyDiscordMessage, this.allowedChannels) ??
      false
    );
  }

  /**
   * @description
   * Get the message response when the channel cannot execute this command due to not being white-listed.
   * @param   {IAnyDiscordMessage}               anyDiscordMessage The message that triggered the command.
   * @returns {Promise<IDiscordMessageResponse>}                   The message response to warn the user about using this command on a wrong kind of channel.
   */
  public getNotAllowedChannelErrorMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandVerifyChannelRightService.getInstance().getErrorMessageResponse(
      anyDiscordMessage,
      this.allowedChannels
    );
  }

  /**
   * @description
   * Get the response associated to the command.
   * @param   {IAnyDiscordMessage}                                           anyDiscordMessage The message that triggered the command.
   * @returns {Promise<IDiscordMessageResponse | IDiscordMessageResponse[]>}                   Return a response or multiple responses.
   */
  public abstract getMessageResponse(
    anyDiscordMessage?: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse | IDiscordMessageResponse[]>;
}
