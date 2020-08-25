import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandFlagsData } from "../../interfaces/commands/discord-get-command-flags-data";
import { discordGetCommandFlags } from "./discord-get-command-flags";

describe(`discordGetCommandFlags()`, (): void => {
  let data: IDiscordGetCommandFlagsData;

  beforeEach((): void => {
    data = createMock<IDiscordGetCommandFlagsData>();
  });

  describe(`when the given prefix is !`, (): void => {
    beforeEach((): void => {
      data.prefixes = `!`;
    });

    describe(`when the given command is feature`, (): void => {
      beforeEach((): void => {
        data.commands = DiscordMessageCommandEnum.FEATURE;
      });

      describe(`when the given message is empty`, (): void => {
        beforeEach((): void => {
          data.message = ``;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });
    });
  });
});
