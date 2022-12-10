export enum DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum {
  NOT_CONFIGURED_AND_ENABLED = `The release notes feature was not configured yet and is now enabled on this {{ channelType }}. A message will be sent each time a new release is deployed.`,
  NOT_CONFIGURED_AND_DISABLED = `The release notes feature was not configured yet and is now disabled on this {{ channelType }}.`,
  ENABLED_AND_ENABLED = `The release notes feature was already enabled on this {{ channelType }}. A message will be sent each time a new release is deployed.`,
  ENABLED_AND_DISABLED = `The release notes feature is now disabled on this {{ channelType }}.`,
  DISABLED_AND_ENABLED = `The release notes feature is now enabled on this {{ channelType }}. A message will be sent each time a new release is deployed.`,
  DISABLED_AND_DISABLED = `The release notes feature was already disabled on this {{ channelType }}.`,
}
