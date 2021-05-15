import { IDiscordMessageCommandReleaseNotesBugFixesConfig } from './discord-message-command-release-notes-bug-fixes-config';
import { IDiscordMessageCommandReleaseNotesFeaturesConfig } from './discord-message-command-release-notes-features-config';
import { IDiscordMessageCommandReleaseNotesMixedConfig } from './discord-message-command-release-notes-mixed-config';
import { IDiscordMessageCommandReleaseNotesPerformanceImprovementsConfig } from './discord-message-command-release-notes-performance-improvements-config';
import { IDiscordMessageCommandReleaseNotesUnknownConfig } from './discord-message-command-release-notes-unknown-config';

export interface IDiscordMessageCommandReleaseNotesConfig {
  bugFixes: IDiscordMessageCommandReleaseNotesBugFixesConfig;
  features: IDiscordMessageCommandReleaseNotesFeaturesConfig;
  mixed: IDiscordMessageCommandReleaseNotesMixedConfig;
  performanceImprovements: IDiscordMessageCommandReleaseNotesPerformanceImprovementsConfig;
  unknown: IDiscordMessageCommandReleaseNotesUnknownConfig;
}
