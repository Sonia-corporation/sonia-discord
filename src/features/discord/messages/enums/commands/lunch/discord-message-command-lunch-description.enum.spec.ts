import { DiscordMessageCommandLunchDescriptionEnum } from './discord-message-command-lunch-description.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandLunchDescriptionEnum`, (): void => {
  it(`should have 15 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandLunchDescriptionEnum)).toStrictEqual(15);
  });

  it(`should have a member "AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.AWESOME).toStrictEqual(`Awesome!`);
  });

  it(`should have a member "COOL"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.COOL).toStrictEqual(`Cool.`);
  });

  it(`should have a member "FOOD_IS_HEART"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.FOOD_IS_HEART).toStrictEqual(`Food is :heart:`);
  });

  it(`should have a member "FOOD_IS_HEARTS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.FOOD_IS_HEARTS).toStrictEqual(`Food is :hearts:`);
  });

  it(`should have a member "FOOD_IS_YUM"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.FOOD_IS_YUM).toStrictEqual(`Food is :yum:`);
  });

  it(`should have a member "HEART"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.HEART).toStrictEqual(`:heart:`);
  });

  it(`should have a member "HEARTS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.HEARTS).toStrictEqual(`:hearts:`);
  });

  it(`should have a member "I_WAS_STARVING"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.I_WAS_STARVING).toStrictEqual(`I was starving.`);
  });

  it(`should have a member "I_WAS_STARVING_TOO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.I_WAS_STARVING_TOO).toStrictEqual(`I was starving too.`);
  });

  it(`should have a member "I_WILL_EAT_FOR_THREE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.I_WILL_EAT_FOR_THREE).toStrictEqual(`I will eat for three.`);
  });

  it(`should have a member "I_WILL_EAT_FOR_TWO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.I_WILL_EAT_FOR_TWO).toStrictEqual(`I will eat for two.`);
  });

  it(`should have a member "LETS_GO"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.LETS_GO).toStrictEqual(`Let's go!`);
  });

  it(`should have a member "LIFE_IS_GOOD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.LIFE_IS_GOOD).toStrictEqual(`Life is good!`);
  });

  it(`should have a member "SHALL_WE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.SHALL_WE).toStrictEqual(`Shall we?`);
  });

  it(`should have a member "YUM"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchDescriptionEnum.YUM).toStrictEqual(`:yum:`);
  });
});
