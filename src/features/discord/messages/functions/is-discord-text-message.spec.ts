import { isDiscordValidTextMessage } from './is-discord-valid-text-message';
import { IAnyDiscordMessage } from '../types/any-discord-message';
import { createHydratedMock } from 'ts-auto-mock';

describe(`isDiscordValidTextMessage()`, (): void => {
  let message: IAnyDiscordMessage;

  describe(`when the given message has no content`, (): void => {
    beforeEach((): void => {
      message = createHydratedMock<IAnyDiscordMessage>({
        content: null,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordValidTextMessage(message);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given message has a content empty`, (): void => {
    beforeEach((): void => {
      message = createHydratedMock<IAnyDiscordMessage>({
        content: ``,
      });
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDiscordValidTextMessage(message);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given message has a content filled`, (): void => {
    beforeEach((): void => {
      message = createHydratedMock<IAnyDiscordMessage>({
        content: `text message`,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDiscordValidTextMessage(message);

      expect(result).toBeTrue();
    });
  });
});
