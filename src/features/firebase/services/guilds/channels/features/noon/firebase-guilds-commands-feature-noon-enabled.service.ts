import { Guild } from "discord.js";
import admin from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { flattenObject } from "../../../../../../../functions/formatters/flatten-object";
import { IObject } from "../../../../../../../types/object";
import { IAnyDiscordChannel } from "../../../../../../discord/channels/types/any-discord-channel";
import { ChalkService } from "../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../logger/services/logger.service";
import { IFirebaseGuild } from "../../../../../types/guilds/firebase-guild";
import { FirebaseGuildsService } from "../../../firebase-guilds.service";
import CollectionReference = admin.firestore.CollectionReference;
import WriteResult = admin.firestore.WriteResult;

export class FirebaseGuildsCommandsFeatureNoonEnabledService extends AbstractService {
  private static _instance: FirebaseGuildsCommandsFeatureNoonEnabledService;

  public static getInstance(): FirebaseGuildsCommandsFeatureNoonEnabledService {
    if (_.isNil(FirebaseGuildsCommandsFeatureNoonEnabledService._instance)) {
      FirebaseGuildsCommandsFeatureNoonEnabledService._instance = new FirebaseGuildsCommandsFeatureNoonEnabledService();
    }

    return FirebaseGuildsCommandsFeatureNoonEnabledService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.FIREBASE_GUILDS_COMMANDS_FEATURE_NOON_ENABLED_SERVICE
    );
  }

  public updateState(
    id: Readonly<Guild["id"]>,
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>
  ): Promise<WriteResult> {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = FirebaseGuildsService.getInstance().getCollectionReference();

    if (!_.isNil(collectionReference)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `updating Firebase guild noon feature enabled state...`
        ),
      });

      return collectionReference
        .doc(id)
        .update(this.getUpdatedGuild(channelId, isEnabled))
        .then(
          (writeResult: Readonly<WriteResult>): Promise<WriteResult> => {
            LoggerService.getInstance().success({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `Firebase guild ${ChalkService.getInstance().value(
                  id
                )} noon feature enabled state updated to ${ChalkService.getInstance().value(
                  isEnabled
                )}`
              ),
            });

            return Promise.resolve(writeResult);
          }
        );
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  /**
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
   *
   * @param {Readonly<Snowflake>} id The [id]{@link Snowflake} of channel
   * @param {Readonly<boolean>} isEnabled The new [enabled state]{@link IFirebaseGuildVFinal#channels#features#noon#isEnabled}
   *
   * @return {IObject} A flatten object updating only the enabled state
   */
  public getUpdatedGuild(
    id: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>
  ): IObject {
    const flattenFirebaseGuild: IObject = {};

    _.set(
      flattenFirebaseGuild,
      `channels.${id}.features.noon.isEnabled`,
      isEnabled
    );

    return flattenObject(flattenFirebaseGuild);
  }
}
