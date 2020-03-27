import { DiscordEmojiEnum } from './discord-emoji.enum';

describe(`discordEmojiEnum`, (): void => {
  it(`should have a member "FACE_WITH_SYMBOLS_OVER_MOUSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordEmojiEnum.FACE_WITH_SYMBOLS_OVER_MOUSE).toStrictEqual(`:face_with_symbols_over_mouth:`);
  });
});
