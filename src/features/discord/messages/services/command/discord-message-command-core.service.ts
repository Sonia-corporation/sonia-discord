import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { LoggerService } from '../../../../logger/services/logger.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';

/**
 * @description
 * Core service common to all commands.
 */
export abstract class DiscordMessageCommandCoreService extends AbstractService {
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

    return this.getMessageResponse(anyDiscordMessage);
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
