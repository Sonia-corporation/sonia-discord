import { IAddDiscordDevPrefix } from "../../interfaces/dev-prefix/add-discord-dev-prefix";
import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let config: IAddDiscordDevPrefix;

  beforeEach((): void => {
    config = {
      discordId: `dummy-discord-id`,
      message: `dummy-message`,
      nickname: `dummy-nickname`,
    };
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeEach((): void => {
      config.message = ``;
    });

    describe(`when the given nickname is null`, (): void => {
      beforeEach((): void => {
        config.nickname = null;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!dummy-discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!dummy-discord-id>] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!discord-id>] `);
            });
          });
        });
      });
    });

    describe(`when the given nickname is an empty string`, (): void => {
      beforeEach((): void => {
        config.nickname = ``;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!dummy-discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!dummy-discord-id>] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!discord-id>] `);
            });
          });
        });
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      beforeEach((): void => {
        config.nickname = `dummy-nickname`;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - dummy-nickname] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - dummy-nickname] `);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - dummy-nickname] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - dummy-nickname] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - dummy-nickname] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!dummy-discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!dummy-discord-id>] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - dummy-nickname] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!discord-id>] `);
            });
          });
        });
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        config.nickname = `sonia`;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] `);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!dummy-discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!dummy-discord-id>] `);
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] `);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - <@!discord-id>]** `);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - <@!discord-id>] `);
            });
          });
        });
      });
    });
  });

  describe(`when the given message is "hello world"`, (): void => {
    beforeEach((): void => {
      config.message = `hello world`;
    });

    describe(`when the given nickname is null`, (): void => {
      beforeEach((): void => {
        config.nickname = null;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!dummy-discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!dummy-discord-id>] hello world`
              );
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!discord-id>] hello world`
              );
            });
          });
        });
      });
    });

    describe(`when the given nickname is an empty string`, (): void => {
      beforeEach((): void => {
        config.nickname = ``;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!dummy-discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!dummy-discord-id>] hello world`
              );
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix with a Discord id and an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix with a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!discord-id>] hello world`
              );
            });
          });
        });
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      beforeEach((): void => {
        config.nickname = `dummy-nickname`;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - dummy-nickname]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - dummy-nickname] hello world`
              );
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - dummy-nickname]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - dummy-nickname] hello world`
              );
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - dummy-nickname]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - dummy-nickname] hello world`
              );
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - dummy-nickname]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - dummy-nickname] hello world`
              );
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - dummy-nickname]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - dummy-nickname] hello world`
              );
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!dummy-discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!dummy-discord-id>] hello world`
              );
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - dummy-nickname]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - dummy-nickname] hello world`
              );
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!discord-id>] hello world`
              );
            });
          });
        });
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        config.nickname = `sonia`;
      });

      describe(`when the given Discord id is null`, (): void => {
        beforeEach((): void => {
          config.discordId = null;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] hello world`);
            });
          });
        });
      });

      describe(`when the given Discord id is an empty string`, (): void => {
        beforeEach((): void => {
          config.discordId = ``;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] hello world`);
            });
          });
        });
      });

      describe(`when the given Discord id is "dummy-discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `dummy-discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!dummy-discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!dummy-discord-id>] hello world`
              );
            });
          });
        });
      });

      describe(`when the given Discord id is "discord-id"`, (): void => {
        beforeEach((): void => {
          config.discordId = `discord-id`;
        });

        describe(`when the given as mention is false`, (): void => {
          beforeEach((): void => {
            config.asMention = false;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`**[dev - sonia]** hello world`);
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a nickname`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(`[dev - sonia] hello world`);
            });
          });
        });

        describe(`when the given as mention is true`, (): void => {
          beforeEach((): void => {
            config.asMention = true;
          });

          describe(`when the emphasis is enabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = true;
            });

            it(`should return a dev prefix and a Discord id with an emphasis`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `**[dev - <@!discord-id>]** hello world`
              );
            });
          });

          describe(`when the emphasis is disabled`, (): void => {
            beforeEach((): void => {
              config.hasEmphasis = false;
            });

            it(`should return a dev prefix and a Discord id`, (): void => {
              expect.assertions(1);

              const result = addDiscordDevPrefix(config);

              expect(result).toStrictEqual(
                `[dev - <@!discord-id>] hello world`
              );
            });
          });
        });
      });
    });
  });
});
