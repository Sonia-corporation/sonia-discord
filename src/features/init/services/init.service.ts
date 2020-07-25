import appRootPath from "app-root-path";
import axios, { AxiosResponse } from "axios";
import fs from "fs-extra";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { ENVIRONMENT } from "../../../environment/constants/environment";
import { IEnvironment } from "../../../environment/interfaces/environment";
import { getBearer } from "../../../functions/formatters/get-bearer";
import { IPackage } from "../../../interfaces/package";
import { AppConfigMutatorService } from "../../app/services/config/app-config-mutator.service";
import { AppConfigService } from "../../app/services/config/app-config.service";
import { DiscordMessageConfigMutatorService } from "../../discord/messages/services/config/discord-message-config-mutator.service";
import { DiscordService } from "../../discord/services/discord.service";
import { DiscordSoniaConfigMutatorService } from "../../discord/users/services/config/discord-sonia-config-mutator.service";
import { FirebaseService } from "../../firebase/services/firebase.service";
import { GITHUB_API_URL } from "../../github/constants/github-api-url";
import { getHumanizedReleaseNotes } from "../../github/functions/get-humanized-release-notes";
import { getGithubQueryReleaseByTagAndTotalCount } from "../../github/functions/queries/get-github-query-release-by-tag-and-total-count";
import { IGithubReleaseAndTotalCount } from "../../github/interfaces/github-release-and-total-count";
import { GithubConfigMutatorService } from "../../github/services/config/github-config-mutator.service";
import { GithubConfigService } from "../../github/services/config/github-config.service";
import { ChalkColorService } from "../../logger/services/chalk/chalk-color.service";
import { ChalkService } from "../../logger/services/chalk/chalk.service";
import { LoggerConfigMutatorService } from "../../logger/services/config/logger-config-mutator.service";
import { LoggerService } from "../../logger/services/logger.service";
import { ProfileConfigMutatorService } from "../../profile/services/config/profile-config-mutator.service";
import { ServerConfigMutatorService } from "../../server/services/config/server-config-mutator.service";
import { ServerService } from "../../server/services/server.service";

export class InitService extends AbstractService {
  private static _instance: InitService;

  public static getInstance(): InitService {
    if (_.isNil(InitService._instance)) {
      InitService._instance = new InitService();
    }

    return InitService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.INIT_SERVICE);
  }

  public init(): void {
    this._loggerService.init();
    ChalkColorService.getInstance().init();
    this._readEnvironment();
  }

  private _mergeEnvironments(
    environmentA: Readonly<IEnvironment>,
    environmentB: Readonly<IEnvironment>
  ): IEnvironment {
    return _.merge({}, environmentA, environmentB);
  }

  private _runApp(): void {
    DiscordService.getInstance().init();
    ServerService.getInstance().initializeApp();
    FirebaseService.getInstance().init();
  }

  private _configureApp(environment: Readonly<IEnvironment>): void {
    this._configureAppFromEnvironment(environment);
    this._configureAppFromPackage().then(
      (): Promise<IGithubReleaseAndTotalCount> => {
        return this._configureAppFromGitHubReleases();
      }
    );
  }

  private _configureAppFromEnvironment(
    environment: Readonly<IEnvironment>
  ): void {
    LoggerConfigMutatorService.getInstance().updateConfig(environment.logger);
    GithubConfigMutatorService.getInstance().updateConfig(environment.github);
    DiscordSoniaConfigMutatorService.getInstance().updateConfig(
      environment.discord
    );
    DiscordMessageConfigMutatorService.getInstance().updateConfig(
      environment.discord
    );
    ProfileConfigMutatorService.getInstance().updateConfig(environment.profile);
    AppConfigMutatorService.getInstance().init().updateConfig(environment.app);
    ServerConfigMutatorService.getInstance().init();
  }

  private _configureAppFromPackage(): Promise<IPackage> {
    return fs
      .readJson(`${appRootPath}/package.json`)
      .then(
        (data: Readonly<IPackage>): Promise<IPackage> => {
          AppConfigMutatorService.getInstance().updateVersion(data.version);

          return Promise.resolve(data);
        }
      )
      .catch(
        (error: unknown): Promise<never> => {
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(`Failed to read the package file`),
          });
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(error),
          });

          return Promise.reject(error);
        }
      );
  }

  private _configureAppFromGitHubReleases(): Promise<
    IGithubReleaseAndTotalCount
  > {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `app version: ${this._chalkService.value(appVersion)}`
      ),
    });

    return axios({
      data: {
        query: getGithubQueryReleaseByTagAndTotalCount(appVersion),
      },
      headers: {
        authorization: getBearer(
          GithubConfigService.getInstance().getPersonalAccessToken()
        ),
      },
      method: `post`,
      url: GITHUB_API_URL,
    })
      .then(
        (
          axiosResponse: AxiosResponse<IGithubReleaseAndTotalCount>
        ): Promise<IGithubReleaseAndTotalCount> => {
          AppConfigMutatorService.getInstance().updateTotalReleaseCount(
            axiosResponse.data.data.repository.releases.totalCount
          );

          this._loggerService.success({
            context: this._serviceName,
            message: this._chalkService.text(
              `Total release count updated from GitHub API`
            ),
          });

          if (!_.isNil(axiosResponse.data.data.repository.release)) {
            AppConfigMutatorService.getInstance().updateReleaseDate(
              axiosResponse.data.data.repository.release.updatedAt
            );
            AppConfigMutatorService.getInstance().updateReleaseNotes(
              getHumanizedReleaseNotes(
                axiosResponse.data.data.repository.release.description
              )
            );

            this._loggerService.success({
              context: this._serviceName,
              message: this._chalkService.text(
                `Release notes updated from GitHub API`
              ),
            });
          } else {
            this._loggerService.error({
              context: this._serviceName,
              message: this._chalkService.text(
                `Failed to find a release with the given tag name from GitHub API`
              ),
            });
          }

          return Promise.resolve(axiosResponse.data);
        }
      )
      .catch(
        (error: unknown): Promise<never> => {
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(
              `Failed to get the total release count from GitHub API`
            ),
          });
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(
              `Failed to get the release notes for the app version from GitHub API`
            ),
          });
          this._loggerService.error({
            context: this._serviceName,
            message: this._chalkService.text(error),
          });

          return Promise.reject(error);
        }
      );
  }

  private _readEnvironment(): Promise<IEnvironment> {
    return fs
      .readJson(`${appRootPath}/src/environment/secret-environment.json`)
      .then(
        (environment: Readonly<IEnvironment>): Promise<IEnvironment> => {
          this._startApp(this._mergeEnvironments(ENVIRONMENT, environment));

          return Promise.resolve(environment);
        }
      )
      .catch(
        (error: unknown): Promise<never> => {
          console.error(`Failed to read the secret environment file`);
          console.error(error);
          console.debug(
            `Follow the instructions about the secret environment to fix this:`
          );
          console.debug(
            `https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#create-the-secret-environment-file`
          );

          return Promise.reject(
            new Error(
              `The app must have a secret environment file with at least a "discord.sonia.secretToken" inside it`
            )
          );
        }
      );
  }

  private _startApp(environment: Readonly<IEnvironment>): void {
    this._configureApp(environment);
    this._runApp();
  }
}
