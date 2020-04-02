import appRootPath from "app-root-path";
import axios, { AxiosResponse } from "axios";
import fs from "fs-extra";
import _ from "lodash";
import { ENVIRONMENT } from "../../../environment/constants/environment";
import { IEnvironment } from "../../../environment/interfaces/environment";
import { getBearer } from "../../../functions/formatters/get-bearer";
import { IPackage } from "../../../interfaces/package";
import { AppConfigMutatorService } from "../../app/services/config/app-config-mutator-service";
import { DiscordMessageConfigMutatorService } from "../../discord/messages/services/config/discord-message-config-mutator-service";
import { DiscordService } from "../../discord/services/discord-service";
import { DiscordSoniaConfigService } from "../../discord/users/services/config/discord-sonia-config-service";
import { GITHUB_API_URL } from "../../github/constants/github-api-url";
import { GITHUB_QUERY_RELEASES_LATEST_AND_TOTAL_COUNT } from "../../github/constants/queries/github-query-releases-latest-and-total-count";
import { getHumanizedReleaseNotes } from "../../github/functions/get-humanized-release-notes";
import { IGithubReleasesLatest } from "../../github/interfaces/github-releases-latest";
import { GithubConfigService } from "../../github/services/config/github-config-service";
import { ChalkService } from "../../logger/services/chalk-service";
import { LoggerConfigMutatorService } from "../../logger/services/config/logger-config-mutator-service";
import { LoggerService } from "../../logger/services/logger-service";
import { ServerConfigService } from "../../server/services/config/server-config-service";
import { ServerService } from "../../server/services/server-service";

export class InitService {
  private static _instance: InitService;

  public static getInstance(): InitService {
    if (_.isNil(InitService._instance)) {
      InitService._instance = new InitService();
    }

    return InitService._instance;
  }

  private readonly _chalkService = ChalkService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();

  public constructor() {
    this._init();
  }

  private _mergeEnvironments(
    environmentA: Readonly<IEnvironment>,
    environmentB: Readonly<IEnvironment>
  ): IEnvironment {
    return _.merge({}, environmentA, environmentB);
  }

  private _runApp(): void {
    DiscordService.getInstance();
    ServerService.getInstance();
  }

  private _init(): void {
    this._readEnvironment();
  }

  private _configureApp(environment: Readonly<IEnvironment>): void {
    this._configureAppFromEnvironment(environment);
    this._configureAppFromPackage();
    this._configureAppFromGitHubReleases();
  }

  private _configureAppFromEnvironment(
    environment: Readonly<IEnvironment>
  ): void {
    LoggerConfigMutatorService.getInstance().updateConfig(environment.logger);
    GithubConfigService.getInstance().updateConfig(environment.github);
    DiscordSoniaConfigService.getInstance().updateConfig(environment.discord);
    DiscordMessageConfigMutatorService.getInstance().updateConfig(
      environment.discord
    );
    AppConfigMutatorService.getInstance().init().updateConfig(environment.app);
    ServerConfigService.getInstance().init();
  }

  private _configureAppFromPackage(): void {
    fs.readJson(`${appRootPath}/package.json`)
      .then((data: Readonly<IPackage>): void => {
        AppConfigMutatorService.getInstance().updateVersion(data.version);
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          message: this._chalkService.text(`Failed to read the package file`),
        });
        this._loggerService.error({
          message: this._chalkService.text(error),
        });
      });
  }

  private _configureAppFromGitHubReleases(): void {
    axios({
      data: {
        query: GITHUB_QUERY_RELEASES_LATEST_AND_TOTAL_COUNT,
      },
      headers: {
        Authorization: getBearer(
          GithubConfigService.getInstance().getPersonalAccessToken()
        ),
      },
      method: `post`,
      url: GITHUB_API_URL,
    })
      .then((axiosResponse: AxiosResponse<IGithubReleasesLatest>): void => {
        AppConfigMutatorService.getInstance().updateTotalReleaseCount(
          axiosResponse.data.data.repository.releases.totalCount
        );
        AppConfigMutatorService.getInstance().updateReleaseDate(
          axiosResponse.data.data.repository.releases.edges[0].node.updatedAt
        );
        AppConfigMutatorService.getInstance().updateReleaseNotes(
          getHumanizedReleaseNotes(
            axiosResponse.data.data.repository.releases.edges[0].node
              .description
          )
        );
      })
      .catch((): void => {
        this._loggerService.error({
          message: this._chalkService.text(
            `Failed to get the app total release count from GitHub API`
          ),
        });
      });
  }

  private _readEnvironment(): void {
    fs.readJson(`${appRootPath}/src/environment/secret-environment.json`)
      .then((environment: Readonly<IEnvironment>): void => {
        this._startApp(this._mergeEnvironments(ENVIRONMENT, environment));
      })
      .catch((error: unknown): void => {
        console.error(`Failed to read the environment file`);
        console.error(error);
        throw new Error(
          `The app must have an environment file with at least a "discord.sonia.secretToken" inside it`
        );
      });
  }

  private _startApp(environment: Readonly<IEnvironment>): void {
    this._configureApp(environment);
    this._runApp();
  }
}
