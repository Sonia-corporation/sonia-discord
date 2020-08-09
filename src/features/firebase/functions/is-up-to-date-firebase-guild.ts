import _ from "lodash";
import { FIREBASE_GUILD_CURRENT_VERSION } from "../constants/firebase-guild-current-version";
import { IFirebaseGuild } from "../types/firebase-guild";
import { IFirebaseGuildVFinal } from "../types/firebase-guild-v-final";

export function isUpToDateFirebaseGuild(
  firebaseGuild: Readonly<IFirebaseGuild>
): firebaseGuild is IFirebaseGuildVFinal {
  return _.isEqual(firebaseGuild.version, FIREBASE_GUILD_CURRENT_VERSION);
}
