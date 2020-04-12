import { DiscordEmojiEnum } from "./discord-emoji.enum";

describe(`DiscordEmojiEnum`, (): void => {
  it(`should have a member "FACE_WITH_SYMBOLS_OVER_MOUSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.FACE_WITH_SYMBOLS_OVER_MOUSE).toStrictEqual(
      `:face_with_symbols_over_mouth:`
    );
  });

  it(`should have a member "YUM"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.YUM).toStrictEqual(`:yum:`);
  });
});
