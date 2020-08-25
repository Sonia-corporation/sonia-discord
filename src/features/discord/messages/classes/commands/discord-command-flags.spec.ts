import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../../services/command/feature/features/noon/enums/discord-message-command-feature-noon-flag.enum";
import { DiscordCommandFlag } from "./discord-command-flag";
import { DiscordCommandFlags } from "./discord-command-flags";

describe(`DiscordCommandFlags`, (): void => {
  let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with some flags`, (): void => {
      it(`should update the flags inside the class`, (): void => {
        expect.assertions(1);
        const flags = createMock<
          DiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >();

        discordCommandFlags = new DiscordCommandFlags<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(flags);

        expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
      });
    });
  });

  describe(`getFlags()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >(
        createMock<
          DiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
    });

    it(`should return the flags`, (): void => {
      expect.assertions(1);
      const flags = createMock<
        DiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
      >();
      discordCommandFlags.setFlags(flags);

      const result = discordCommandFlags.getFlags();

      expect(result).toStrictEqual(flags);
    });
  });

  describe(`setFlags()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >(
        createMock<
          DiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
    });

    it(`should update the flags with the given ones`, (): void => {
      expect.assertions(1);
      const flags = createMock<
        DiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
      >();

      discordCommandFlags.setFlags(flags);

      expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
    });
  });
});
