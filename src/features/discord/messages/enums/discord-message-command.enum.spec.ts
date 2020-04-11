import { DiscordMessageCommandEnum } from "./discord-message-command.enum";

describe(`DiscordMessageCommandEnum`, (): void => {
  it(`should have a member "VERSION"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.VERSION).toStrictEqual(`version`);
  });

  it(`should have a member "V"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.V).toStrictEqual(`v`);
  });

  it(`should have a member "ERROR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.ERROR).toStrictEqual(`error`);
  });

  it(`should have a member "BUG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.BUG).toStrictEqual(`bug`);
  });

  it(`should have a member "HELP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.HELP).toStrictEqual(`help`);
  });

  it(`should have a member "h"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.H).toStrictEqual(`h`);
  });
});
