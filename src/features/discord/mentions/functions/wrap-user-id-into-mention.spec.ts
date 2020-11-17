import { wrapUserIdIntoMention } from './wrap-user-id-into-mention';
import { Snowflake } from 'discord.js';

describe(`wrapUserIdIntoMention()`, (): void => {
  let userId: Snowflake;

  beforeEach((): void => {
    userId = `dummy-user-id`;
  });

  it(`should return the given user id wrapped into a Discord mention`, (): void => {
    expect.assertions(1);

    const result = wrapUserIdIntoMention(userId);

    expect(result).toStrictEqual(`<@!dummy-user-id>`);
  });
});
