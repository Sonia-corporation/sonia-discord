import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";

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
  ): boolean {
    return (
      featureName === DiscordMessageCommandFeatureNameEnum.NOON ||
      featureName === DiscordMessageCommandFeatureNameEnum.N
    );
  }
}
