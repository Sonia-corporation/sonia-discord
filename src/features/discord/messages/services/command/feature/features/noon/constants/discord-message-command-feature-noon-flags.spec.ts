import { TimezoneEnum } from "../../../../../../../../time/enums/timezone.enum";
import { DiscordCommandBooleanFlag } from "../../../../../../classes/commands/flags/discord-command-boolean-flag";
import { DiscordCommandFlags } from "../../../../../../classes/commands/flags/discord-command-flags";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from "../../../constants/discord-message-command-feature-name-noon";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../enums/discord-message-command-feature-noon-flag.enum";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "./discord-message-command-feature-noon-flags";

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS`, (): void => {
  it(`should be the feature command flags list`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS).toStrictEqual(
      new DiscordCommandFlags({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: [
          new DiscordCommandBooleanFlag({
            description: `Enable the noon message on this channel. The message will be sent on the ${TimezoneEnum.PARIS} timezone.`,
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
          }),
        ],
      })
    );
  });
});
