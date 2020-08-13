import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCompleteCommandRegexp } from "../../interfaces/commands/discord-get-complete-command-regexp";
import { discordGetCompleteCommandRegexp } from "./discord-get-complete-command-regexp";

describe(`discordGetCompleteCommandRegexp()`, (): void => {
  let data: IDiscordGetCompleteCommandRegexp;

  beforeEach((): void => {
    data = createMock<IDiscordGetCompleteCommandRegexp>();
  });

  describe(`when the given prefix is !`, (): void => {
    beforeEach((): void => {
      data.prefix = `!`;
    });

    describe(`when the given command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCompleteCommandRegexp(data);

        // eslint-disable-next-line no-useless-escape
        expect(result).toStrictEqual(/(\!)(?:)(help)(?:)(\s)(?:)(\S+)(?:)/gim);
      });
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(cookie)(?:)(\s)(?:)(\S+)(?:)/gim
        );
      });
    });
  });

  describe(`when the given prefix is -`, (): void => {
    beforeEach((): void => {
      data.prefix = `-`;
    });

    describe(`when the given command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(help)(?:)(\s)(?:)(\S+)(?:)/gim
        );
      });
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(cookie)(?:)(\s)(?:)(\S+)(?:)/gim
        );
      });
    });
  });
});
