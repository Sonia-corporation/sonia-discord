import { DiscordActivityTypeEnum } from './discord-activity-type.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordActivityTypeEnum`, (): void => {
  it(`should have 5 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordActivityTypeEnum)).toBe(5);
  });

  it(`should have a member "CUSTOM"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityTypeEnum.CUSTOM).toBe(`CUSTOM`);
  });

  it(`should have a member "LISTENING"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityTypeEnum.LISTENING).toBe(`LISTENING`);
  });

  it(`should have a member "PLAYING"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityTypeEnum.PLAYING).toBe(`PLAYING`);
  });

  it(`should have a member "STREAMING"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityTypeEnum.STREAMING).toBe(`STREAMING`);
  });

  it(`should have a member "WATCHING"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityTypeEnum.WATCHING).toBe(`WATCHING`);
  });
});
