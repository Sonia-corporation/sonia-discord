import { discordCommandSplitMessageFlags } from "./discord-command-split-message-flags";

describe(`discordCommandSplitMessageFlags()`, (): void => {
  let message: string;

  describe(`when the given message is empty`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should return an empty array`, (): void => {
      expect.assertions(1);

      const result = discordCommandSplitMessageFlags(message);

      expect(result).toStrictEqual([]);
    });
  });

  describe(`when the given message with one flag`, (): void => {
    beforeEach((): void => {
      message = `--dummy`;
    });

    it(`should return an array with one message flag`, (): void => {
      expect.assertions(1);

      const result = discordCommandSplitMessageFlags(message);

      expect(result).toStrictEqual([`--dummy`]);
    });
  });

  describe(`when the given message with two flags`, (): void => {
    beforeEach((): void => {
      message = `--dummy --other`;
    });

    it(`should return an array with two message flags`, (): void => {
      expect.assertions(1);

      const result = discordCommandSplitMessageFlags(message);

      expect(result).toStrictEqual([`--dummy`, `--other`]);
    });
  });
});
