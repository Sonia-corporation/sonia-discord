import { DiscordService } from '../../discord/discord-service';
import { ServerService } from '../../server/server-service';

export function runApp(): void {
  DiscordService.getInstance();
  ServerService.getInstance();
}
