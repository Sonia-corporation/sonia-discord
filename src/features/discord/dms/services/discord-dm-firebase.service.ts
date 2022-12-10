import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { FirebaseDmsService } from '../../../firebase/services/dms/firebase-dms.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordMessageErrorService } from '../../messages/services/helpers/discord-message-error.service';
import { IAnyDiscordMessage } from '../../messages/types/any-discord-message';
import { User } from 'discord.js';
import { WriteResult } from 'firebase-admin/firestore';
import _ from 'lodash';

export class DiscordDmFirebaseService extends AbstractService {
  private static _instance: DiscordDmFirebaseService;

  public static getInstance(): DiscordDmFirebaseService {
    if (_.isNil(DiscordDmFirebaseService._instance)) {
      DiscordDmFirebaseService._instance = new DiscordDmFirebaseService();
    }

    return DiscordDmFirebaseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_DM_FIREBASE_SERVICE);
  }

  public addDmToFirebase(anyDiscordMessage: IAnyDiscordMessage): Promise<WriteResult | void> {
    const { author } = anyDiscordMessage;

    if (_.isNil(author)) {
      DiscordMessageErrorService.getInstance().handleError(
        new Error(`The author should exist!`),
        anyDiscordMessage,
        `could not register the author into the DM Firestore`
      );

      return Promise.resolve();
    }

    return FirebaseDmsService.getInstance()
      .hasDm(author.id)
      .then((hasDm: boolean): Promise<WriteResult | void> => {
        if (_.isEqual(hasDm, false)) {
          return this._addFirebaseDm(anyDiscordMessage, author).catch((error: Error): void => {
            DiscordMessageErrorService.getInstance().handleError(
              error,
              anyDiscordMessage,
              `could not add the DM into the Firestore`
            );
          });
        }

        LoggerService.getInstance().debug({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `Firestore DM already created for the user ${ChalkService.getInstance().value(author.id)}`
          ),
        });

        return Promise.resolve();
      })
      .catch((error: Error): void => {
        DiscordMessageErrorService.getInstance().handleError(
          error,
          anyDiscordMessage,
          `could not register the author into the DM Firestore`
        );
      });
  }

  private _addFirebaseDm(anyDiscordMessage: IAnyDiscordMessage, user: User): Promise<WriteResult> {
    return FirebaseDmsService.getInstance()
      .addDm(user.id)
      .then((writeResult: WriteResult): Promise<WriteResult> => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `DM ${ChalkService.getInstance().value(user.id)} added into the Firestore`
          ),
        });

        return Promise.resolve(writeResult);
      });
  }
}
