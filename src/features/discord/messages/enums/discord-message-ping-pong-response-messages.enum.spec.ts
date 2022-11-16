import { DiscordMessagePingPongResponseMessagesEnum } from './discord-message-ping-pong-response-messages.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildNewVersionResponseEnum`, (): void => {
  it(`should have 36 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessagePingPongResponseMessagesEnum)).toBe(36);
  });

  it(`should have a member "ARE_YOU_LOOKING_FOR_A_RESPONSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.ARE_YOU_LOOKING_FOR_A_RESPONSE).toBe(
      `Are you looking for a response?`
    );
  });

  it(`should have a member "ARE_YOU_LOOKING_FOR_A_RESPONSE_PONG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.ARE_YOU_LOOKING_FOR_A_RESPONSE_PONG).toBe(
      `Are you looking for a response? {{ pong }}`
    );
  });

  it(`should have a member "ARE_YOU_SERIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.ARE_YOU_SERIOUS).toBe(`Are you serious?`);
  });

  it(`should have a member "ARE_YOU_SERIOUS_RIGHT_NOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.ARE_YOU_SERIOUS_RIGHT_NOW).toBe(`Are you serious right now?`);
  });

  it(`should have a member "BITCH_LEAVE_ME_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.BITCH_LEAVE_ME_ALONE).toBe(`Bitch, leave me alone.`);
  });

  it(`should have a member "BITCH_PLEASE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.BITCH_PLEASE).toBe(`Bitch please.`);
  });

  it(`should have a member "DUDE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.DUDE).toBe(`Dude.`);
  });

  it(`should have a member "HAHA"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.HAHA).toBe(`Haha.`);
  });

  it(`should have a member "JOKER_OF_THE_YEAR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.JOKER_OF_THE_YEAR).toBe(`Joker of the year.`);
  });

  it(`should have a member "LEAVE_ME_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.LEAVE_ME_ALONE).toBe(`Leave me alone.`);
  });

  it(`should have a member "OH_BOI_PONG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.OH_BOI_PONG).toBe(`Oh boi! {{ pong }}!`);
  });

  it(`should have a member "PLEASE_LEAVE_ME_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PLEASE_LEAVE_ME_ALONE).toBe(`Please, leave me alone.`);
  });

  it(`should have a member "PONG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG).toBe(`{{ pong }}`);
  });

  it(`should have a member "PONG_BUT_SERIOUSLY_THOUGH"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_BUT_SERIOUSLY_THOUGH).toBe(
      `{{ pong }} but seriously though?`
    );
  });

  it(`should have a member "PONG_CAPTAIN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_CAPTAIN).toBe(`{{ pong }} captain!`);
  });

  it(`should have a member "PONG_HAPPY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_HAPPY).toBe(`{{ pong }}. Happy?`);
  });

  it(`should have a member "PONG_IS_THE_WAY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_IS_THE_WAY).toBe(`{{ pong }} is the way.`);
  });

  it(`should have a member "PONG_ME_THAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_ME_THAT).toBe(`{{ pong }} me that.`);
  });

  it(`should have a member "PONG_MY_MAN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_MY_MAN).toBe(`{{ pong }} my man!`);
  });

  it(`should have a member "PONG_OF_COURSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_OF_COURSE).toBe(`{{ pong }} of course!`);
  });

  it(`should have a member "PONG_PONG_PONG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_PONG_PONG).toBe(`{{ pong }}. {{ pong }} {{ pong }}.`);
  });

  it(`should have a member "PONG_SO_MUCH_FUN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_SO_MUCH_FUN).toBe(`{{ pong }}. So much fun.`);
  });

  it(`should have a member "PONG_VERY_FUNNY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_VERY_FUNNY).toBe(`{{ pong }}. Very funny.`);
  });

  it(`should have a member "PONG_WOW_DUDE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_WOW_DUDE).toBe(`{{ pong }}. Wow dude!`);
  });

  it(`should have a member "PONG_WOW_YOU_GOT_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.PONG_WOW_YOU_GOT_ME).toBe(`{{ pong }}. Wow, you got me.`);
  });

  it(`should have a member "SERIOUSLY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.SERIOUSLY).toBe(`Seriously?`);
  });

  it(`should have a member "SO_MUCH_FUN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.SO_MUCH_FUN).toBe(`So much fun.`);
  });

  it(`should have a member "STOP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.STOP).toBe(`Stop!`);
  });

  it(`should have a member "STOP_THAT_SHIT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.STOP_THAT_SHIT).toBe(`Stop that shit?`);
  });

  it(`should have a member "STOP_THIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.STOP_THIS).toBe(`Stop this!`);
  });

  it(`should have a member "TWO_HUNDRED_IQ_PONG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.TWO_HUNDRED_IQ_PONG).toBe(`200 IQ => {{ pong }}.`);
  });

  it(`should have a member "WHAT_DID_YOU_EXPECT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.WHAT_DID_YOU_EXPECT).toBe(`What did you expect?`);
  });

  it(`should have a member "WHAT_DID_YOU_EXPECT_PONG"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.WHAT_DID_YOU_EXPECT_PONG).toBe(
      `What did you expect? {{ pong }}?`
    );
  });

  it(`should have a member "WOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.WOW).toBe(`Wow.`);
  });

  it(`should have a member "YOU_CAN_NOT_BE_SERIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.YOU_CAN_NOT_BE_SERIOUS).toBe(`You can't be serious?`);
  });

  it(`should have a member "YOU_CAN_NOT_BE_SERIOUS_RIGHT_NOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessagePingPongResponseMessagesEnum.YOU_CAN_NOT_BE_SERIOUS_RIGHT_NOW).toBe(
      `You can't be serious right now?`
    );
  });
});
