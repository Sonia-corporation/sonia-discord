import { DiscordMessageCommandCookieDescriptionEnum } from './discord-message-command-cookie-description.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandCookieDescriptionEnum`, (): void => {
  it(`should have 26 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandCookieDescriptionEnum)).toBe(26);
  });

  it(`should have a member "BETTER_THAN_COOKIE_CLICKER"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.BETTER_THAN_COOKIE_CLICKER).toBe(
      `Better than [cookie clicker](https://orteil.dashnet.org/cookieclicker/).`
    );
  });

  it(`should have a member "CALL_911_THIS_IS_TOO_GOOD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.CALL_911_THIS_IS_TOO_GOOD).toBe(`Call 911, this is too good.`);
  });

  it(`should have a member "CALL_ME_LEGEND"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.CALL_ME_LEGEND).toBe(`Call me Legend.`);
  });

  it(`should have a member "CHUCK_NORRIS_CAN_NOT_BEAT_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.CHUCK_NORRIS_CAN_NOT_BEAT_ME).toBe(`Chuck Norris can't beat me.`);
  });

  it(`should have a member "DAMN_GOOD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.DAMN_GOOD).toBe(`Damn good!`);
  });

  it(`should have a member "DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.DO_NOT_WORRY).toBe(`Do not worry.`);
  });

  it(`should have a member "EAT_YOU_MUST"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.EAT_YOU_MUST).toBe(`Eat you must.`);
  });

  it(`should have a member "ENJOY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.ENJOY).toBe(`Enjoy!`);
  });

  it(`should have a member "ENJOY_THEM"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.ENJOY_THEM).toBe(`Enjoy them!`);
  });

  it(`should have a member "GETTING_FAT_IS_AN_ILLUSION"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.GETTING_FAT_IS_AN_ILLUSION).toBe(`Getting fat is an illusion.`);
  });

  it(`should have a member "GODLIKE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.GODLIKE).toBe(`Godlike.`);
  });

  it(`should have a member "HEART"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.HEART).toBe(`:heart:`);
  });

  it(`should have a member "HEARTS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.HEARTS).toBe(`:hearts:`);
  });

  it(`should have a member "I_AM_HERE_FOR_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.I_AM_HERE_FOR_YOU).toBe(`I am here for you!`);
  });

  it(`should have a member "I_COVER_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.I_COVER_YOU).toBe(`I cover you!`);
  });

  it(`should have a member "I_GOT_ENOUGH_FOR_EVERYBODY_WINK"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.I_GOT_ENOUGH_FOR_EVERYBODY_WINK).toBe(
      `I got enough for everybody :wink:`
    );
  });

  it(`should have a member "I_GOT_YOUR_BACK"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.I_GOT_YOUR_BACK).toBe(`I got your back!`);
  });

  it(`should have a member "I_JUST_KILLED_THE_GAME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.I_JUST_KILLED_THE_GAME).toBe(`I just killed the game!`);
  });

  it(`should have a member "I_ROCK_SO_HARD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.I_ROCK_SO_HARD).toBe(`I rock so hard!`);
  });

  it(`should have a member "IT_WAS_MY_PLEASURE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.IT_WAS_MY_PLEASURE).toBe(`It was my pleasure.`);
  });

  it(`should have a member "LOVE_THEM_TOO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.LOVE_THEM_TOO).toBe(`I love them too :yum:`);
  });

  it(`should have a member "SUNGLASSES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.SUNGLASSES).toBe(`:sunglasses:`);
  });

  it(`should have a member "THIS_IS_FREE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.THIS_IS_FREE).toBe(`This is free.`);
  });

  it(`should have a member "THIS_IS_SO_FUCKING_GREAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.THIS_IS_SO_FUCKING_GREAT).toBe(`This is so fucking great!`);
  });

  it(`should have a member "YES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.YES).toBe(`Yes.`);
  });

  it(`should have a member "YOU_WERE_SO_SKINNY_THOUGH"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandCookieDescriptionEnum.YOU_WERE_SO_SKINNY_THOUGH).toBe(`You were so skinny though.`);
  });
});
