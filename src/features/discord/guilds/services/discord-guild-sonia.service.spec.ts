import { DiscordGuildSoniaService } from "./discord-guild-sonia.service";

describe(`DiscordChannelSoniaService`, (): void => {
  let service: DiscordGuildSoniaService;

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordChannelSonia service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildSoniaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildSoniaService));
    });

    it(`should return the created DiscordChannelSonia service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildSoniaService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });
});
