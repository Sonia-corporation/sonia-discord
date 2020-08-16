import { DiscordEmojiEnum } from "./discord-emoji.enum";

describe(`DiscordEmojiEnum`, (): void => {
  it(`should have a member "FACE_WITH_RAISED_EYEBROW"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.FACE_WITH_RAISED_EYEBROW).toStrictEqual(
      `:face_with_raised_eyebrow:`
    );
  });

  it(`should have a member "FACE_WITH_SYMBOLS_OVER_MOUSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.FACE_WITH_SYMBOLS_OVER_MOUSE).toStrictEqual(
      `:face_with_symbols_over_mouth:`
    );
  });

  it(`should have a member "GIFT_HEART"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.GIFT_HEART).toStrictEqual(`:gift_heart:`);
  });

  it(`should have a member "PRAY"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.PRAY).toStrictEqual(`:pray:`);
  });

  it(`should have a member "THINKING"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.THINKING).toStrictEqual(`:thinking:`);
  });

  it(`should have a member "WARNING"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.WARNING).toStrictEqual(`:warning:`);
  });

  it(`should have a member "WORRIED"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.WORRIED).toStrictEqual(`:worried:`);
  });

  it(`should have a member "YUM"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.YUM).toStrictEqual(`:yum:`);
  });
});
