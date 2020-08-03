import admin from "firebase-admin";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import DocumentData = admin.firestore.DocumentData;

export interface IFirebaseGuild extends DocumentData {
  creationDate?: string | undefined;
  id?: string | undefined;
  version?: FirebaseGuildVersionEnum | undefined;
}
