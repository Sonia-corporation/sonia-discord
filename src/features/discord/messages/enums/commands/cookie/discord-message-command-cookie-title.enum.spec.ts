import { DiscordMessageCommandCookieTitleEnum } from './discord-message-command-cookie-title.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandCookieTitleEnum`, (): void => {
  it(`should have 13 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandCookieTitleEnum)).toBe(13);
  });

  it(`should have a member "COOKIE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.COOKIE).toBe(`Cookie!`);
  });

  it(`should have a member "COOKIE_DELIVERY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.COOKIE_DELIVERY).toBe(`Cookie delivery!`);
  });

  it(`should have a member "COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.COOKIES).toBe(`Cookies!`);
  });

  it(`should have a member "GOOD_BOY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.GOOD_BOY).toBe(`Good boy ;)`);
  });

  it(`should have a member "HELLO_BOYS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HELLO_BOYS).toBe(`Hello boys!`);
  });

  it(`should have a member "HELLO_WORLD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HELLO_WORLD).toBe(`Hello, world!`);
  });

  it(`should have a member "HOT_HOT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HOT_HOT).toBe(`Hot! Hot!`);
  });

  it(`should have a member "HOTEL_TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HOTEL_TRIVAGO).toBe(`Hungry? Cookies. Hotel? Trivago.`);
  });

  it(`should have a member "HUNGRY_COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.HUNGRY_COOKIES).toBe(`Hungry? Cookies!`);
  });

  it(`should have a member "I_AM_HERE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.I_AM_HERE).toBe(`I am here!`);
  });

  it(`should have a member "SOMEONE_ORDERED_SOME_COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.SOMEONE_ORDERED_SOME_COOKIES).toBe(`Someone ordered some cookies?`);
  });

  it(`should have a member "YOU_GOTTA_LOVE_THEM_ALL"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.YOU_GOTTA_LOVE_THEM_ALL).toBe(`You gotta love them all!`);
  });

  it(`should have a member "YOU_WANT_SOME_COOKIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieTitleEnum.YOU_WANT_SOME_COOKIES).toBe(`You want some cookies?`);
  });
});
