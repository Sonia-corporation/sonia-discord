import { Snowflake } from "discord.js";
import admin from "firebase-admin";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import DocumentData = admin.firestore.DocumentData;

export interface IFirebaseGuild extends DocumentData {
  id?: Snowflake | undefined;
  version?: FirebaseGuildVersionEnum | undefined;
}
