import { DiscordMessageCommandEnum } from './discord-message-command.enum';

describe(`discordMessageCommandEnum`, (): void => {
  it(`should have a member "VERSION"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.VERSION).toStrictEqual(`version`);
  });
});
