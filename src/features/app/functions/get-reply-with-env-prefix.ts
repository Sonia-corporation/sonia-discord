import { addDiscordDevPrefix } from '../../discord/functions/dev-prefix/add-discord-dev-prefix';
import { ProfileConfigService } from '../../profile/services/config/profile-config.service';
import { AppConfigService } from '../services/config/app-config.service';

export function getReplyWithEnvPrefix(response: string): string {
  if (!AppConfigService.getInstance().isProduction()) {
    return addDiscordDevPrefix({
      asMention: true,
      discordId: ProfileConfigService.getInstance().getDiscordId(),
      message: response,
      nickname: ProfileConfigService.getInstance().getNickname(),
    });
  }

  return response;
}
