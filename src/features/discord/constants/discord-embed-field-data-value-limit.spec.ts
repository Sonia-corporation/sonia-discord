import { DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT } from './discord-embed-field-data-value-limit';

describe(`DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT`, (): void => {
  it(`should be 1024`, (): void => {
    expect.assertions(1);

    expect(DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT).toStrictEqual(1024);
  });
});
