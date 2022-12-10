export enum DiscordMessageCommandNoonFlagSuccessDescriptionEnum {
  NOT_CONFIGURED_AND_ENABLED = `The noon feature was not configured yet and is now enabled on this {{ channelType }}. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
  NOT_CONFIGURED_AND_DISABLED = `The noon feature was not configured yet and is now disabled on this {{ channelType }}.`,
  ENABLED_AND_ENABLED = `The noon feature was already enabled on this {{ channelType }}. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
  ENABLED_AND_DISABLED = `The noon feature is now disabled on this {{ channelType }}.`,
  DISABLED_AND_ENABLED = `The noon feature is now enabled on this {{ channelType }}. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
  DISABLED_AND_DISABLED = `The noon feature was already disabled on this {{ channelType }}.`,
}
