import { AbstractService } from '../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { IAnyDiscordMessage } from '../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../helpers/discord-message-error.service';
import _ from 'lodash';

/**
 * @description
 * Handle the error in case the update of the roundtrip latency threw.
 */
export class DiscordMessageCommandHeartbeatUpdateErrorService extends AbstractService {
  private static _instance: DiscordMessageCommandHeartbeatUpdateErrorService;

  public static getInstance(): DiscordMessageCommandHeartbeatUpdateErrorService {
    if (_.isNil(DiscordMessageCommandHeartbeatUpdateErrorService._instance)) {
      DiscordMessageCommandHeartbeatUpdateErrorService._instance =
        new DiscordMessageCommandHeartbeatUpdateErrorService();
    }

    return DiscordMessageCommandHeartbeatUpdateErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HEARTBEAT_UPDATE_ERROR_SERVICE);
  }

  /**
   * @description
   * Log the error.
   * Send a message to the channel where the message come from.
   * Send a message to the Sonia guild errors channel.
   * @param {IAnyDiscordMessage} anyDiscordMessage The message that trigger the error.
   * @param {Error }             error             The error that occurred.
   */
  public handleError(anyDiscordMessage: IAnyDiscordMessage, error: Error): void {
    DiscordMessageErrorService.getInstance().handleError(
      error,
      anyDiscordMessage,
      `failed to update the roundtrip latency of the heartbeat command`
    );
  }
}
