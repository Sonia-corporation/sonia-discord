import { DiscordMessageConfigCoreService } from "./discord-message-config-core-service";

jest.mock(`../../../../config/services/config-service`);

describe(`DiscordMessageConfigCoreService`, (): void => {
  let service: DiscordMessageConfigCoreService;

  beforeEach((): void => {
    service = DiscordMessageConfigCoreService.getInstance();
  });

  it(`should have a specific color for the image of the error command`, (): void => {
    expect.assertions(1);

    expect(service.command.error.imageColor).toStrictEqual(15562905);
  });

  it(`should have a specific url for the image of the error command`, (): void => {
    expect.assertions(1);

    expect(service.command.error.imageUrl).toStrictEqual(
      `https://i.ibb.co/5jZmzSB/icons8-error-512.png`
    );
  });

  it(`should have a specific color for the image of the help command`, (): void => {
    expect.assertions(1);

    expect(service.command.help.imageColor).toStrictEqual(7522991);
  });

  it(`should have a specific url for the image of the help command`, (): void => {
    expect.assertions(1);

    expect(service.command.help.imageUrl).toStrictEqual(
      `https://i.ibb.co/vLSnVk6/icons8-information-512.png`
    );
  });

  it(`should have a "!" prefix for the commands`, (): void => {
    expect.assertions(1);

    expect(service.command.prefix).toStrictEqual(`!`);
  });

  it(`should have a specific color for the image of the version command`, (): void => {
    expect.assertions(1);

    expect(service.command.version.imageColor).toStrictEqual(11912416);
  });

  it(`should have a specific url for the image of the version command`, (): void => {
    expect.assertions(1);

    expect(service.command.version.imageUrl).toStrictEqual(
      `https://i.ibb.co/ph17BqP/icons8-artificial-intelligence-512.png`
    );
  });

  it(`should have a specific color for the image of the error`, (): void => {
    expect.assertions(1);

    expect(service.error.imageColor).toStrictEqual(15562905);
  });

  it(`should have a specific url for the image of the error`, (): void => {
    expect.assertions(1);

    expect(service.error.imageUrl).toStrictEqual(
      `https://i.ibb.co/r7PHJS1/icons8-bug-512.png`
    );
  });
});
