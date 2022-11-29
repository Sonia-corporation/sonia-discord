import { DiscordMessageCommandHeartbeatDescriptionEnum } from './discord-message-command-heartbeat-description.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandHeartbeatDescriptionEnum`, (): void => {
  it(`should have 11 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandHeartbeatDescriptionEnum)).toBe(11);
  });

  it(`should have a member "I_HOPE_I_AM_IN_GOOD_HEALTH"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.I_HOPE_I_AM_IN_GOOD_HEALTH).toBe(
      `I hope I am in good health!`
    );
  });

  it(`should have a member "I_HOPE_I_AM_HEALTHY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.I_HOPE_I_AM_HEALTHY).toBe(`I hope I am healthy!`);
  });

  it(`should have a member "IS_IT_GOOD_DOCTOR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.IS_IT_GOOD_DOCTOR).toBe(`Is it good, doctor?`);
  });

  it(`should have a member "IS_IT_GOOD"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.IS_IT_GOOD).toBe(`Is it good?`);
  });

  it(`should have a member "IS_IT_GOOD_RIGHT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.IS_IT_GOOD_RIGHT).toBe(`Is it good, right?`);
  });

  it(`should have a member "AM_I_IN_DANGER"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.AM_I_IN_DANGER).toBe(`Am I in danger?`);
  });

  it(`should have a member "SHOULD_I_CONSULT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.SHOULD_I_CONSULT).toBe(`Should I consult?`);
  });

  it(`should have a member "IT_IS_NEVER_TOO_FAST"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.IT_IS_NEVER_TOO_FAST).toBe(`It is never too fast ;)`);
  });

  it(`should have a member "IT_IS_NEVER_TOO_FAST_RIGHT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.IT_IS_NEVER_TOO_FAST_RIGHT).toBe(
      `It is never too fast, right?`
    );
  });

  it(`should have a member "AM_I_SLOW_TODAY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.AM_I_SLOW_TODAY).toBe(`Am I slow today?`);
  });

  it(`should have a member "AM_I_SLOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatDescriptionEnum.AM_I_SLOW).toBe(`Am I slow?`);
  });
});
