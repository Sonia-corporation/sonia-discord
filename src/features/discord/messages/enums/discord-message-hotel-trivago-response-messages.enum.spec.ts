import { DiscordMessageHotelTrivagoResponseMessagesEnum } from './discord-message-hotel-trivago-response-messages.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordMessageHotelTrivagoResponseMessagesEnum`, (): void => {
  it(`should have a 35 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageHotelTrivagoResponseMessagesEnum)).toStrictEqual(35);
  });

  it(`should have a member "ARE_YOU_LOOKING_FOR_A_RESPONSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.ARE_YOU_LOOKING_FOR_A_RESPONSE).toStrictEqual(
      `Are you looking for a response?`
    );
  });

  it(`should have a member "ARE_YOU_LOOKING_FOR_A_RESPONSE_TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.ARE_YOU_LOOKING_FOR_A_RESPONSE_TRIVAGO).toStrictEqual(
      `Are you looking for a response? {{ trivago }}`
    );
  });

  it(`should have a member "ARE_YOU_SERIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.ARE_YOU_SERIOUS).toStrictEqual(`Are you serious?`);
  });

  it(`should have a member "ARE_YOU_SERIOUS_RIGHT_NOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.ARE_YOU_SERIOUS_RIGHT_NOW).toStrictEqual(
      `Are you serious right now?`
    );
  });

  it(`should have a member "BITCH_LEAVE_ME_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.BITCH_LEAVE_ME_ALONE).toStrictEqual(`Bitch, leave me alone.`);
  });

  it(`should have a member "BITCH_PLEASE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.BITCH_PLEASE).toStrictEqual(`Bitch please.`);
  });

  it(`should have a member "DUDE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.DUDE).toStrictEqual(`Dude.`);
  });

  it(`should have a member "HAHA"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.HAHA).toStrictEqual(`Haha.`);
  });

  it(`should have a member "JOKER_OF_THE_YEAR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.JOKER_OF_THE_YEAR).toStrictEqual(`Joker of the year.`);
  });

  it(`should have a member "LEAVE_ME_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.LEAVE_ME_ALONE).toStrictEqual(`Leave me alone.`);
  });

  it(`should have a member "OH_BOI_TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.OH_BOI_TRIVAGO).toStrictEqual(`Oh boi! {{ trivago }}!`);
  });

  it(`should have a member "PLEASE_LEAVE_ME_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.PLEASE_LEAVE_ME_ALONE).toStrictEqual(
      `Please, leave me alone.`
    );
  });

  it(`should have a member "SERIOUSLY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.SERIOUSLY).toStrictEqual(`Seriously?`);
  });

  it(`should have a member "SO_MUCH_FUN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.SO_MUCH_FUN).toStrictEqual(`So much fun.`);
  });

  it(`should have a member "STOP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.STOP).toStrictEqual(`Stop!`);
  });

  it(`should have a member "STOP_THAT_SHIT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.STOP_THAT_SHIT).toStrictEqual(`Stop that shit?`);
  });

  it(`should have a member "STOP_THIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.STOP_THIS).toStrictEqual(`Stop this!`);
  });

  it(`should have a member "TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO).toStrictEqual(`{{ trivago }}`);
  });

  it(`should have a member "TRIVAGO_BUT_SERIOUSLY_THOUGH"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_BUT_SERIOUSLY_THOUGH).toStrictEqual(
      `{{ trivago }} but seriously though?`
    );
  });

  it(`should have a member "TRIVAGO_CAPTAIN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_CAPTAIN).toStrictEqual(`{{ trivago }} captain!`);
  });

  it(`should have a member "TRIVAGO_HAPPY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_HAPPY).toStrictEqual(`{{ trivago }}. Happy?`);
  });

  it(`should have a member "TRIVAGO_IS_THE_WAY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_IS_THE_WAY).toStrictEqual(
      `{{ trivago }} is the way.`
    );
  });

  it(`should have a member "TRIVAGO_ME_THAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_ME_THAT).toStrictEqual(`{{ trivago }} me that.`);
  });

  it(`should have a member "TRIVAGO_MY_MAN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_MY_MAN).toStrictEqual(`{{ trivago }} my man!`);
  });

  it(`should have a member "TRIVAGO_OF_COURSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_OF_COURSE).toStrictEqual(`{{ trivago }} of course!`);
  });

  it(`should have a member "TRIVAGO_SO_MUCH_FUN"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_SO_MUCH_FUN).toStrictEqual(
      `{{ trivago }}. So much fun.`
    );
  });

  it(`should have a member "TRIVAGO_VERY_FUNNY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_VERY_FUNNY).toStrictEqual(
      `{{ trivago }}. Very funny.`
    );
  });

  it(`should have a member "TRIVAGO_WOW_DUDE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_WOW_DUDE).toStrictEqual(`{{ trivago }}. Wow dude!`);
  });

  it(`should have a member "TRIVAGO_WOW_YOU_GOT_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO_WOW_YOU_GOT_ME).toStrictEqual(
      `{{ trivago }}. Wow, you got me.`
    );
  });

  it(`should have a member "TWO_HUNDRED_IQ_TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.TWO_HUNDRED_IQ_TRIVAGO).toStrictEqual(
      `200 IQ => {{ trivago }}.`
    );
  });

  it(`should have a member "WHAT_DID_YOU_EXPECT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.WHAT_DID_YOU_EXPECT).toStrictEqual(`What did you expect?`);
  });

  it(`should have a member "WHAT_DID_YOU_EXPECT_TRIVAGO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.WHAT_DID_YOU_EXPECT_TRIVAGO).toStrictEqual(
      `What did you expect? {{ trivago }}?`
    );
  });

  it(`should have a member "WOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.WOW).toStrictEqual(`Wow.`);
  });

  it(`should have a member "YOU_CAN_NOT_BE_SERIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.YOU_CAN_NOT_BE_SERIOUS).toStrictEqual(
      `You can't be serious?`
    );
  });

  it(`should have a member "YOU_CAN_NOT_BE_SERIOUS_RIGHT_NOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageHotelTrivagoResponseMessagesEnum.YOU_CAN_NOT_BE_SERIOUS_RIGHT_NOW).toStrictEqual(
      `You can't be serious right now?`
    );
  });
});
