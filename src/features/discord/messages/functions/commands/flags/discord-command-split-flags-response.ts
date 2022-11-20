import { discordCommandIsFlagSuccess } from './discord-command-is-flag-success';
import { IDiscordCommandSplittedFlagsResponse } from '../../../classes/commands/flags/discord-command-splitted-flags-response';
import { IDiscordCommandFlagResponse } from '../../../types/commands/flags/discord-command-flag-response';
import { IDiscordCommandFlagsResponse } from '../../../types/commands/flags/discord-command-flags-response';
import _ from 'lodash';

/**
 * @description
 * Split between flags success and message responses.
 * @param   {IDiscordCommandFlagsResponse} discordCommandFlagsResponse The list of flags success and message responses.
 * @returns {boolean}                                                  True when a flag.
 */
export function discordCommandSplitFlagsResponse(
  discordCommandFlagsResponse: IDiscordCommandFlagsResponse
): IDiscordCommandSplittedFlagsResponse {
  const discordCommandSplittedFlagsResponse: IDiscordCommandSplittedFlagsResponse = {
    commandFlagsSuccess: [],
    messageResponses: [],
  };

  _.forEach(discordCommandFlagsResponse, (discordCommandFlagResponse: IDiscordCommandFlagResponse): void => {
    if (discordCommandIsFlagSuccess(discordCommandFlagResponse)) {
      discordCommandSplittedFlagsResponse.commandFlagsSuccess.push(discordCommandFlagResponse);
    } else {
      discordCommandSplittedFlagsResponse.messageResponses.push(discordCommandFlagResponse);
    }
  });

  return discordCommandSplittedFlagsResponse;
}
