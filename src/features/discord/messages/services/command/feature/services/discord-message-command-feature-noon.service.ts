import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { IDiscordMessageResponse } from "../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";
import { IDiscordMessageCommandFeatureNameNoon } from "../types/discord-message-command-feature-name-noon";

export class DiscordMessageCommandFeatureNoonService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureNoonService;

  public static getInstance(): DiscordMessageCommandFeatureNoonService {
    if (_.isNil(DiscordMessageCommandFeatureNoonService._instance)) {
      DiscordMessageCommandFeatureNoonService._instance = new DiscordMessageCommandFeatureNoonService();
    }

    return DiscordMessageCommandFeatureNoonService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE);
  }

  public isNoonFeature(
    featureName: Readonly<string | DiscordMessageCommandFeatureNameEnum>
  ): featureName is IDiscordMessageCommandFeatureNameNoon {
    return (
      featureName === DiscordMessageCommandFeatureNameEnum.NOON ||
      featureName === DiscordMessageCommandFeatureNameEnum.N
    );
  }

  public getMessageResponse(
    _anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse> {
    return Promise.resolve({
      response: `No options for noon feature for now. Work in progress.`,
    });
  }
}
