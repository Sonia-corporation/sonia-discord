import { DiscordMessageCommandFeatureNoonFlagEnum } from "../enums/discord-message-command-feature-noon-flag.enum";
import { getDiscordMessageCommandNoonAllFlags } from "./get-discord-message-command-noon-all-flags";

describe(`getDiscordMessageCommandNoonAllFlags()`, (): void => {
  it(`should return a list of all the flags for the feature noon command`, (): void => {
    expect.assertions(1);

    const result = getDiscordMessageCommandNoonAllFlags();

    expect(result).toStrictEqual([
      DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
    ]);
  });
});
