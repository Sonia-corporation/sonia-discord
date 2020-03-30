import { DISCORD_MESSAGE_CONFIG } from "./discord-message-config";

describe(`DISCORD_MESSAGE_CONFIG`, (): void => {
  it(`should have a "!" prefix for the commands`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_CONFIG.command.prefix).toStrictEqual(`!`);
  });

  it(`should have a specific color for the image of the version command`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_CONFIG.command.version.imageColor).toStrictEqual(
      11912416
    );
  });

  it(`should have a specific url for the image of the version command`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_CONFIG.command.version.imageUrl).toStrictEqual(
      `https://i.ibb.co/ph17BqP/icons8-artificial-intelligence-512.png`
    );
  });

  it(`should have a specific color for the image of the error`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_CONFIG.error.imageColor).toStrictEqual(15562905);
  });

  it(`should have a specific url for the image of the error`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_CONFIG.error.imageUrl).toStrictEqual(
      `https://i.ibb.co/r7PHJS1/icons8-bug-512.png`
    );
  });
});
