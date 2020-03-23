import { IEnvironment } from '../../../environment/interfaces/environment';
import { AppConfigService } from '../../app/app-config-service';
import { DiscordMessageConfigService } from '../../discord/messages/discord-message-config-service';
import { DiscordSoniaConfigService } from '../../discord/users/discord-sonia-config-service';
import { LoggerConfigService } from '../../logger/logger-config-service';

export function configureAppFromEnvironment(environment: Readonly<IEnvironment>): void {
  LoggerConfigService.getInstance().updateConfig(environment.logger);
  DiscordSoniaConfigService.getInstance().updateConfig(environment.discord);
  DiscordMessageConfigService.getInstance().updateConfig(environment.discord);
  AppConfigService.getInstance().updateConfig(environment.app);
}
