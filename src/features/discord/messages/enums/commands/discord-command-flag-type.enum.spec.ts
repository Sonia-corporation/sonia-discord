import { DiscordCommandFlagTypeEnum } from './discord-command-flag-type.enum';
import { getEnumLength } from '../../../../../functions/checks/get-enum-length';

describe(`DiscordCommandFlagTypeEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordCommandFlagTypeEnum)).toBe(2);
  });

  it(`should have a member "BOOLEAN"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagTypeEnum.BOOLEAN).toBe(`boolean`);
  });

  it(`should have a member "VALUELESS"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagTypeEnum.VALUELESS).toBe(`valueless`);
  });
});
