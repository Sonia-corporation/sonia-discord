import { discordGetCommandFlags } from './discord-get-command-flags';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandFlagsData } from '../../../interfaces/commands/getters/discord-get-command-flags-data';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordGetCommandFlags()`, (): void => {
  let data: IDiscordGetCommandFlagsData;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandFlagsData>();
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

      describe(`when the given message contains a command "!"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon -"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon -e"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e`;
        });

        it(`should return "-e"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e`);
        });
      });

      describe(`when the given message contains a command "!feature noon --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon --enabled=true`;
        });

        it(`should return "--enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon -e --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e --enabled=true`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon -e --enabled=true "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e --enabled=true `;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e --enabled=true and some text`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon --enabled=true -e --enabled=false`;
        });

        it(`should return "--enabled=true -e --enabled=false"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true -e --enabled=false`);
        });
      });

      describe(`when the given message contains a command "!FEATURE NOON -E --ENABLED=TRUE AND SOME TEXT"`, (): void => {
        beforeEach((): void => {
          data.message = `SIMPLE MESSAGE !FEATURE NOON -E --ENABLED=TRUE AND SOME TEXT`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-feature noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon -e --enabled=true and some text`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!other noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !other noon -e --enabled=true and some text`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });
    });
  });

  describe(`when the given prefix is ! and -`, (): void => {
    beforeEach((): void => {
      data.prefixes = [`!`, `-`];
    });

    describe(`when the given command is feature and f`, (): void => {
      beforeEach((): void => {
        data.commands = [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F];
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

      describe(`when the given message contains a command "!"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-feature"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!f"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-f"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-feature "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!f "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-f "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-feature noon"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!f noon"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-f noon"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-feature noon "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!f noon "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-f noon "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon `;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon -"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-feature noon -"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon -`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!f noon -"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon -`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-f noon -"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon -`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!feature noon -e"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e`;
        });

        it(`should return "-e"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e`);
        });
      });

      describe(`when the given message contains a command "-feature noon -e"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon -e`;
        });

        it(`should return "-e"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e`);
        });
      });

      describe(`when the given message contains a command "!f noon -e"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon -e`;
        });

        it(`should return "-e"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e`);
        });
      });

      describe(`when the given message contains a command "-f noon -e"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon -e`;
        });

        it(`should return "-e"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e`);
        });
      });

      describe(`when the given message contains a command "!feature noon --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon --enabled=true`;
        });

        it(`should return "--enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true`);
        });
      });

      describe(`when the given message contains a command "-feature noon --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon --enabled=true`;
        });

        it(`should return "--enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true`);
        });
      });

      describe(`when the given message contains a command "!f noon --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon --enabled=true`;
        });

        it(`should return "--enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true`);
        });
      });

      describe(`when the given message contains a command "-f noon --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon --enabled=true`;
        });

        it(`should return "--enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon -e --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e --enabled=true`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-feature noon -e --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon -e --enabled=true`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!f noon -e --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon -e --enabled=true`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-f noon -e --enabled=true"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon -e --enabled=true`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon -e --enabled=true "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e --enabled=true `;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-feature noon -e --enabled=true "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon -e --enabled=true `;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!f noon -e --enabled=true "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon -e --enabled=true `;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-f noon -e --enabled=true "`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon -e --enabled=true `;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon -e --enabled=true and some text`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-feature noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon -e --enabled=true and some text`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!f noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon -e --enabled=true and some text`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-f noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon -e --enabled=true and some text`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!feature noon --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon --enabled=true -e --enabled=false`;
        });

        it(`should return "--enabled=true -e --enabled=false"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true -e --enabled=false`);
        });
      });

      describe(`when the given message contains a command "-feature noon --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -feature noon --enabled=true -e --enabled=false`;
        });

        it(`should return "--enabled=true -e --enabled=false"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true -e --enabled=false`);
        });
      });

      describe(`when the given message contains a command "!f noon --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !f noon --enabled=true -e --enabled=false`;
        });

        it(`should return "--enabled=true -e --enabled=false"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true -e --enabled=false`);
        });
      });

      describe(`when the given message contains a command "-f noon --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -f noon --enabled=true -e --enabled=false`;
        });

        it(`should return "--enabled=true -e --enabled=false"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`--enabled=true -e --enabled=false`);
        });
      });

      describe(`when the given message contains a command "!FEATURE NOON -E --ENABLED=TRUE AND SOME TEXT"`, (): void => {
        beforeEach((): void => {
          data.message = `SIMPLE MESSAGE !FEATURE NOON -E --ENABLED=TRUE AND SOME TEXT`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-FEATURE NOON -E --ENABLED=TRUE AND SOME TEXT"`, (): void => {
        beforeEach((): void => {
          data.message = `SIMPLE MESSAGE -FEATURE NOON -E --ENABLED=TRUE AND SOME TEXT`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "!F NOON -E --ENABLED=TRUE AND SOME TEXT"`, (): void => {
        beforeEach((): void => {
          data.message = `SIMPLE MESSAGE !F NOON -E --ENABLED=TRUE AND SOME TEXT`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "-F NOON -E --ENABLED=TRUE AND SOME TEXT"`, (): void => {
        beforeEach((): void => {
          data.message = `SIMPLE MESSAGE -F NOON -E --ENABLED=TRUE AND SOME TEXT`;
        });

        it(`should return "-e --enabled=true"`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toStrictEqual(`-e --enabled=true`);
        });
      });

      describe(`when the given message contains a command "$feature noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon -e --enabled=true and some text`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "$f noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $f noon -e --enabled=true and some text`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "!other noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !other noon -e --enabled=true and some text`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFlags(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message contains a command "-other noon -e --enabled=true and some text"`, (): void => {
        beforeEach((): void => {
          data.message = `simple message -other noon -e --enabled=true and some text`;
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
