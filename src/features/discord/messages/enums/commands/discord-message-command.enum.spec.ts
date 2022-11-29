import { DiscordMessageCommandEnum } from './discord-message-command.enum';
import { getEnumLength } from '../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandEnum`, (): void => {
  it(`should have 19 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandEnum)).toBe(19);
  });

  it(`should have a member "VERSION"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.VERSION).toBe(`version`);
  });

  it(`should have a member "V"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.V).toBe(`v`);
  });

  it(`should have a member "ERROR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.ERROR).toBe(`error`);
  });

  it(`should have a member "BUG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.BUG).toBe(`bug`);
  });

  it(`should have a member "HELP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.HELP).toBe(`help`);
  });

  it(`should have a member "H"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.H).toBe(`h`);
  });

  it(`should have a member "HEARTBEAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.HEARTBEAT).toBe(`heartbeat`);
  });

  it(`should have a member "HB"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.HB).toBe(`hb`);
  });

  it(`should have a member "COOKIE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.COOKIE).toBe(`cookie`);
  });

  it(`should have a member "COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.COOKIES).toBe(`cookies`);
  });

  it(`should have a member "C"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.C).toBe(`c`);
  });

  it(`should have a member "LUNCH"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.LUNCH).toBe(`lunch`);
  });

  it(`should have a member "L"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.L).toBe(`l`);
  });

  it(`should have a member "RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.RELEASE_NOTES).toBe(`release-notes`);
  });

  it(`should have a member "R"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.R).toBe(`r`);
  });

  it(`should have a member "FEATURE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.FEATURE).toBe(`feature`);
  });

  it(`should have a member "F"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.F).toBe(`f`);
  });

  it(`should have a member "QUOTE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.QUOTE).toBe(`quote`);
  });

  it(`should have a member "Q"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandEnum.Q).toBe(`q`);
  });
});
