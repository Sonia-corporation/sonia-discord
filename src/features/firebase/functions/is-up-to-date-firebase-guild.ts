import _ from "lodash";
import { FIREBASE_GUILD_CURRENT_VERSION } from "../constants/firebase-guild-current-version";
import { IAnyFirebaseGuild } from "../types/any-firebase-guild";
import { IFirebaseGuild } from "../types/firebase-guild";

export function isUpToDateFirebaseGuild(
  firebaseGuild: IAnyFirebaseGuild
): firebaseGuild is IFirebaseGuild {
  return _.isEqual(firebaseGuild.version, FIREBASE_GUILD_CURRENT_VERSION);
}
