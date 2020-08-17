import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";
import { getDiscordMessageCommandAllFeatureNames } from "./get-discord-message-command-all-feature-names";

describe(`getDiscordMessageCommandAllFeatureNames()`, (): void => {
  it(`should return a list of all the feature names for the feature command`, (): void => {
    expect.assertions(1);

    const result = getDiscordMessageCommandAllFeatureNames();

    expect(result).toStrictEqual([DiscordMessageCommandFeatureNameEnum.NOON]);
  });
});
