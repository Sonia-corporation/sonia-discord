export enum DiscordCommandFlagSuccessDescriptionEnum {
  NOT_CONFIGURED_AND_ENABLED = `The \`noon\` feature was not configured yet and is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
  NOT_CONFIGURED_AND_DISABLED = `The \`noon\` feature was not configured yet and is now disabled on this channel.`,
  ENABLED_AND_ENABLED = `The \`noon\` feature was already enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
  ENABLED_AND_DISABLED = `The \`noon\` feature is now disabled on this channel.`,
  DISABLED_AND_ENABLED = `The \`noon\` feature is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
  DISABLED_AND_DISABLED = `The \`noon\` feature was already disabled on this channel.`,
}
