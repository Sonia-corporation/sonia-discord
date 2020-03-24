import appRootPath from 'app-root-path';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs-extra';
import _ from 'lodash';
import { ENVIRONMENT } from '../../environment/environment';
import { IEnvironment } from '../../environment/interfaces/environment';
import { getBearer } from '../../functions/get-bearer';
import { IPackage } from '../../interfaces/package';
import { AppConfigService } from '../app/app-config-service';
import { DiscordService } from '../discord/discord-service';
import { DiscordMessageConfigService } from '../discord/messages/discord-message-config-service';
import { DiscordSoniaConfigService } from '../discord/users/discord-sonia-config-service';
import { GITHUB_API_URL } from '../github/constants/github-api-url';
import { GithubConfigService } from '../github/github-config-service';
import { ChalkService } from '../logger/chalk-service';
import { LoggerConfigService } from '../logger/logger-config-service';
import { LoggerService } from '../logger/logger-service';
import { ServerService } from '../server/server-service';
import { IGithubReleasesTotalCount } from './interfaces/github-releases-total-count';

export class InitService {
  private static _instance: InitService;
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();

  public constructor() {
    this._init();
  }

  public static getInstance(): InitService {
    if (_.isNil(InitService._instance)) {
      InitService._instance = new InitService();
    }

    return InitService._instance;
  }

  private _mergeEnvironments(
    environmentA: Readonly<IEnvironment>,
    environmentB: Readonly<IEnvironment>
  ): IEnvironment {
    return _.merge(
      {},
      environmentA,
      environmentB
    );
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
    this._configureAppTotalReleaseCount();
  }

  private _configureAppFromEnvironment(environment: Readonly<IEnvironment>): void {
    LoggerConfigService.getInstance().updateConfig(environment.logger);
    GithubConfigService.getInstance().updateConfig(environment.github);
    DiscordSoniaConfigService.getInstance().updateConfig(environment.discord);
    DiscordMessageConfigService.getInstance().updateConfig(environment.discord);
    AppConfigService.getInstance().updateConfig(environment.app);
  }

  private _configureAppFromPackage(): void {
    fs.readJson(`${appRootPath}/package.json`).then((data: Readonly<IPackage>): void => {
      AppConfigService.getInstance().updateVersion(data.version);
    }).catch((error: unknown): void => {
      this._loggerService.error(this._chalkService.text(`Failed to read the package file`));
      this._loggerService.error(this._chalkService.text(error));
    });
  }

  private _configureAppTotalReleaseCount(): void {
    axios({
      data: {
        query: `{
        repository(owner: "Sonia-corporation", name: "il-est-midi-discord") {
          releases {
            totalCount
          }
        }
      }`
      },
      headers: {
        Authorization: getBearer(`dummy`)
      },
      method: `post`,
      url: GITHUB_API_URL
    }).then((axiosResponse: AxiosResponse<IGithubReleasesTotalCount>): void => {
      AppConfigService.getInstance().updateTotalReleaseCount(axiosResponse.data.data.repository.releases.totalCount);
    }).catch((): void => {
      this._loggerService.error(this._chalkService.text(`Failed to get the app total release count from GitHub API`));
    });
  }

  private _readEnvironment(): void {
    fs.readJson(`${appRootPath}/src/environment/secret-environment.json`).then((environment: Readonly<IEnvironment>): void => {
      this._startApp(this._mergeEnvironments(ENVIRONMENT, environment));
    }).catch((error: unknown): void => {
      console.error(`Failed to read the environment file`);
      console.error(error);
      throw new Error(`The app must have an environment file with at least a "discord.sonia.secretToken" inside it`);
    });
  }

  private _startApp(environment: Readonly<IEnvironment>): void {
    this._configureApp(environment);
    this._runApp();
  }
}
