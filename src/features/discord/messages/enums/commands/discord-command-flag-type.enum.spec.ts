import { DiscordCommandFlagTypeEnum } from './discord-command-flag-type.enum';

describe(`DiscordCommandFlagTypeEnum`, (): void => {
  it(`should have a member "BOOLEAN"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagTypeEnum.BOOLEAN).toStrictEqual(`boolean`);
  });

  it(`should have a member "VALUELESS"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagTypeEnum.VALUELESS).toStrictEqual(`valueless`);
  });
});
