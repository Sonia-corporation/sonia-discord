import { DiscordMessageCommandCookieTitleEnum } from "./discord-message-command-cookie-title.enum";

describe(`DiscordMessageCommandCookieTitleEnum`, (): void => {
  it(`should have a member "HUNGRY_COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HUNGRY_COOKIES).toStrictEqual(
      `Hungry? Cookies!`
    );
  });

  it(`should have a member "COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.COOKIES).toStrictEqual(
      `Cookies!`
    );
  });

  it(`should have a member "COOKIE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.COOKIE).toStrictEqual(
      `Cookie!`
    );
  });

  it(`should have a member "GOOD_BOY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.GOOD_BOY).toStrictEqual(
      `Good boy ;)`
    );
  });

  it(`should have a member "HELLO_BOYS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HELLO_BOYS).toStrictEqual(
      `Hello boys!`
    );
  });

  it(`should have a member "HELLO_WORLD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HELLO_WORLD).toStrictEqual(
      `Hello, world!`
    );
  });

  it(`should have a member "HOTEL_TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HOTEL_TRIVAGO).toStrictEqual(
      `Hungry? Cookies. Hotel? Trivago.`
    );
  });

  it(`should have a member "SOMEONE_ORDERED_SOME_COOKIES"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandCookieTitleEnum.SOMEONE_ORDERED_SOME_COOKIES
    ).toStrictEqual(`Someone ordered some cookies?`);
  });

  it(`should have a member "YOU_WANT_SOME_COOKIES"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandCookieTitleEnum.YOU_WANT_SOME_COOKIES
    ).toStrictEqual(`You want some cookies?`);
  });

  it(`should have a member "COOKIE_DELIVERY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.COOKIE_DELIVERY).toStrictEqual(
      `Cookie delivery!`
    );
  });

  it(`should have a member "HOT_HOT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HOT_HOT).toStrictEqual(
      `Hot! Hot!`
    );
  });

  it(`should have a member "I_AM_HERE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.I_AM_HERE).toStrictEqual(
      `I am here!`
    );
  });

  it(`should have a member "YOU_GOTTA_LOVE_THEM_ALL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandCookieTitleEnum.YOU_GOTTA_LOVE_THEM_ALL
    ).toStrictEqual(`You gotta love them all!`);
  });
});
