import { IFirebaseGuildV1 } from "../../interfaces/guilds/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../../interfaces/guilds/firebase-guild-v2";
import { IFirebaseGuildV3 } from "../../interfaces/guilds/firebase-guild-v3";
import { IFirebaseGuildV4 } from "../../interfaces/guilds/firebase-guild-v4";

export type IFirebaseGuild =
  | IFirebaseGuildV1
  | IFirebaseGuildV2
  | IFirebaseGuildV3
  | IFirebaseGuildV4;
