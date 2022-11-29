import { DiscordMessageCommandHeartbeatTitleEnum } from './discord-message-command-heartbeat-title.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandHeartbeatTitleEnum`, (): void => {
  it(`should have 5 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandHeartbeatTitleEnum)).toBe(5);
  });

  it(`should have a member "MON_COEUR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatTitleEnum.MON_COEUR).toBe(`Mon coeur!`);
  });

  it(`should have a member "MY_PING"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatTitleEnum.MY_PING).toBe(`My ping!`);
  });

  it(`should have a member "MY_HEARTBEAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatTitleEnum.MY_HEARTBEAT).toBe(`My heartbeat!`);
  });

  it(`should have a member "THIS_IS_MY_PING"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatTitleEnum.THIS_IS_MY_PING).toBe(`This is my ping.`);
  });

  it(`should have a member "THIS_IS_MY_HEARTBEAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandHeartbeatTitleEnum.THIS_IS_MY_HEARTBEAT).toBe(`This is my heartbeat.`);
  });
});
