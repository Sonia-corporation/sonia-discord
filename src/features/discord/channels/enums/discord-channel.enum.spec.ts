import { DiscordChannelEnum } from './discord-channel.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordChannelEnum`, (): void => {
  it(`should have 7 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordChannelEnum)).toBe(7);
  });

  it(`should have a member "DM"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.DM).toBe(`dm`);
  });

  it(`should have a member "TEXT"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.TEXT).toBe(`text`);
  });

  it(`should have a member "NEWS"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.NEWS).toBe(`news`);
  });

  it(`should have a member "THREAD"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.THREAD).toBe(`thread`);
  });

  it(`should have a member "CATEGORY"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.CATEGORY).toBe(`category`);
  });

  it(`should have a member "STAGE"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.STAGE).toBe(`stage`);
  });

  it(`should have a member "VOICE"`, (): void => {
    expect.assertions(1);

    expect(DiscordChannelEnum.VOICE).toBe(`voice`);
  });
});
