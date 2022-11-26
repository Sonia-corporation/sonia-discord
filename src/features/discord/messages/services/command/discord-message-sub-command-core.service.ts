import { DiscordMessageSubCommandVerifyChannelRightService } from './discord-message-sub-command-verify-channel-right.service';
import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { DiscordChannelEnum } from '../../../channels/enums/discord-channel.enum';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';

/**
 * @description
 * Core service common to all sub-commands.
 * Sub-commands are commands with a specific allowed list of first argument before adding the flags.
 * For example, the feature command has sub-commands like noon.
 */
export abstract class DiscordMessageSubCommandCoreService extends AbstractService {
  /**
   * @description
   * The white-list of channels allowed for this sub-command.
   * Omitting to list a channel type will disallow to execute the sub-command as expected.
   */
  public abstract readonly allowedChannels: Set<DiscordChannelEnum>;

  protected constructor(serviceName: ServiceNameEnum) {
    super(serviceName);
  }

  /**
   * @description
   * Process the given message to check if the sub-command can be processed.
   * The sub-command can be excluded from being processed if the message is sent on a none white-listed channel type.
   * In such case, an error message response is return, else undefined.
   * @param   {IAnyDiscordMessage}                           anyDiscordMessage The message that triggered the sub-command.
   * @returns {Promise<IDiscordMessageResponse | undefined>}                   Return an error response or undefined.
   */
  public verifyMessage(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse | undefined> {
    if (!this.canSendMessageResponseToThisChannel(anyDiscordMessage)) {
      return this.getNotAllowedChannelErrorMessageResponse(anyDiscordMessage);
    }

    return Promise.resolve(undefined);
  }

  /**
   * @description
   * Check if the message can be properly handled for this sub-command based on the channel type.
   * If the channel type is not allowed, we should display an error message instead to warn the user.
   * @param   {IAnyDiscordMessage} anyDiscordMessage The message that triggered the sub-command.
   * @returns {boolean}                              Return true when the sub-command can be processed as expected.
   */
  public canSendMessageResponseToThisChannel(anyDiscordMessage: IAnyDiscordMessage): boolean {
    return (
      DiscordMessageSubCommandVerifyChannelRightService.getInstance().verify(anyDiscordMessage, this.allowedChannels) ??
      false
    );
  }

  /**
   * @description
   * Get the message response when the channel cannot execute this sub-command due to not being white-listed.
   * @param   {IAnyDiscordMessage}               anyDiscordMessage The message that triggered the sub-command.
   * @returns {Promise<IDiscordMessageResponse>}                   The message response to warn the user about using this sub-command on a wrong kind of channel.
   */
  public getNotAllowedChannelErrorMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageSubCommandVerifyChannelRightService.getInstance().getErrorMessageResponse(
      anyDiscordMessage,
      this.allowedChannels
    );
  }

  /**
   * @description
   * Get the response associated to the sub-command.
   * @param   {IAnyDiscordMessage}                 anyDiscordMessage The message that triggered the sub-command.
   * @param   {string}                             messageFlags      The flags associated to the sub-command, space delimited.
   * @returns {Promise<IDiscordMessageResponse[]>}                   Return a response or multiple responses.
   */
  public abstract getMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    messageFlags: string
  ): Promise<IDiscordMessageResponse[]>;
}
