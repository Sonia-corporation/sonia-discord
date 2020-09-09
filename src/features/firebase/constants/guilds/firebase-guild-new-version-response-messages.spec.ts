import { Messages } from "../../../discord/messages/classes/messages";
import { FirebaseGuildNewVersionResponseEnum } from "../../enums/guilds/firebase-guild-new-version-response.enum";
import { FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES } from "./firebase-guild-new-version-response-messages";

describe(`FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES`, (): void => {
  it(`should be a messages of Firebase guild new version responses`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<FirebaseGuildNewVersionResponseEnum>({
        defaultMessage: FirebaseGuildNewVersionResponseEnum.COOL,
        messages: FirebaseGuildNewVersionResponseEnum,
      })
    );
  });
});
