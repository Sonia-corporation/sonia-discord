import { DiscordEmojiEnum } from './discord-emoji.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`DiscordEmojiEnum`, (): void => {
  it(`should have 8 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordEmojiEnum)).toBe(8);
  });

  it(`should have a member "FACE_WITH_RAISED_EYEBROW"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.FACE_WITH_RAISED_EYEBROW).toBe(`:face_with_raised_eyebrow:`);
  });

  it(`should have a member "FACE_WITH_SYMBOLS_OVER_MOUTH"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.FACE_WITH_SYMBOLS_OVER_MOUTH).toBe(`:face_with_symbols_over_mouth:`);
  });

  it(`should have a member "GIFT_HEART"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.GIFT_HEART).toBe(`:gift_heart:`);
  });

  it(`should have a member "PRAY"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.PRAY).toBe(`:pray:`);
  });

  it(`should have a member "THINKING"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.THINKING).toBe(`:thinking:`);
  });

  it(`should have a member "WARNING"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.WARNING).toBe(`:warning:`);
  });

  it(`should have a member "WORRIED"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.WORRIED).toBe(`:worried:`);
  });

  it(`should have a member "YUM"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.YUM).toBe(`:yum:`);
  });
});
