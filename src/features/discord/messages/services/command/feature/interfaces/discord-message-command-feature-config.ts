import { IDiscordMessageCommandReleaseNotesConfig } from '../../../../../interfaces/discord-message-command-release-notes-config';
import { IDiscordMessageCommandFeatureNoonConfig } from '../features/noon/interfaces/discord-message-command-feature-noon-config';

export interface IDiscordMessageCommandFeatureConfig {
  noon: IDiscordMessageCommandFeatureNoonConfig;
  releaseNotes: IDiscordMessageCommandReleaseNotesConfig;
}
