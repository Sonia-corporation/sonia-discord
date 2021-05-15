import { AbstractService } from '../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { ENVIRONMENT } from '../../../environment/constants/environment';
import { IEnvironment } from '../../../environment/interfaces/environment';
import { getBearer } from '../../../functions/formatters/get-bearer';
import { IPackage } from '../../../interfaces/package';
import { AppConfigMutatorService } from '../../app/services/config/app-config-mutator.service';
import { AppConfigService } from '../../app/services/config/app-config.service';
import { DiscordMessageConfigMutatorService } from '../../discord/messages/services/config/discord-message-config-mutator.service';
import { DiscordService } from '../../discord/services/discord.service';
import { DiscordSoniaConfigMutatorService } from '../../discord/users/services/config/discord-sonia-config-mutator.service';
import { EnvironmentValidityCheckService } from '../../environment/services/environment-validity-check.service';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { GITHUB_API_URL } from '../../github/constants/github-api-url';
import { getHumanizedReleaseNotes } from '../../github/functions/get-humanized-release-notes';
import { getGithubQueryReleaseByTagAndTotalCount } from '../../github/functions/queries/get-github-query-release-by-tag-and-total-count';
import { IGithubReleaseAndTotalCount } from '../../github/interfaces/github-release-and-total-count';
import { GithubConfigMutatorService } from '../../github/services/config/github-config-mutator.service';
import { GithubConfigService } from '../../github/services/config/github-config.service';
import { ChalkColorService } from '../../logger/services/chalk/chalk-color.service';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerConfigMutatorService } from '../../logger/services/config/logger-config-mutator.service';
import { LoggerService } from '../../logger/services/logger.service';
import { ProfileConfigMutatorService } from '../../profile/services/config/profile-config-mutator.service';
import { QuoteConfigMutatorService } from '../../quote/services/quote-config-mutator.service';
import { ServerConfigMutatorService } from '../../server/services/config/server-config-mutator.service';
import { ServerService } from '../../server/services/server.service';
import appRootPath from 'app-root-path';
import axios, { AxiosResponse } from 'axios';
import admin from 'firebase-admin';
import fs from 'fs-extra';
import _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export class InitService extends AbstractService {
  private static _instance: InitService;

  public static getInstance(): InitService {
    if (_.isNil(InitService._instance)) {
      InitService._instance = new InitService();
    }

    return InitService._instance;
  }

  private readonly _isAppConfigured$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor() {
    super(ServiceNameEnum.INIT_SERVICE);
  }

  public init(): Promise<void> {
    LoggerService.getInstance().init();
    ChalkColorService.getInstance().init();

    return this.readEnvironment().then((): void => {
      this.notifyIsAppConfigured();
    });
  }

  public isAppConfigured$(): Observable<boolean> {
    return this._isAppConfigured$.asObservable();
  }

  public isAppConfigured(): Promise<true> {
    return this.isAppConfigured$()
      .pipe(
        filter((isAppConfigured: Readonly<boolean>): boolean => _.isEqual(isAppConfigured, true)),
        take(ONE_EMITTER),
        map((): true => true)
      )
      .toPromise();
  }

  public notifyIsAppConfigured(): void {
    this._isAppConfigured$.next(true);
  }

  public readEnvironment(): Promise<[true, [number | void, admin.firestore.WriteResult[] | void]] | void> {
    return fs
      .readJson(`${_.toString(appRootPath)}/src/environment/secret-environment.json`)
      .then(
        (
          environment: Readonly<IEnvironment>
        ): Promise<[true, [number | void, admin.firestore.WriteResult[] | void]] | void> =>
          this._startApp(this._mergeEnvironments(ENVIRONMENT, environment)).catch((error: Readonly<Error>): void => {
            console.error(error);
          })
      )
      .catch(
        (error: unknown): Promise<never> => {
          console.error(`Failed to read the secret environment file`);
          console.error(error);
          console.debug(`Follow the instructions about the secret environment to fix this:`);
          console.debug(
            `https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#create-the-secret-environment-file`
          );

          return Promise.reject(error);
        }
      );
  }

  private _mergeEnvironments(environmentA: Readonly<IEnvironment>, environmentB: Readonly<IEnvironment>): IEnvironment {
    return _.merge({}, environmentA, environmentB);
  }

  private _runApp(): Promise<[true, [number | void, admin.firestore.WriteResult[] | void]]> {
    EnvironmentValidityCheckService.getInstance().init();
    ServerService.getInstance().initializeApp();

    return Promise.all([DiscordService.getInstance().init(), FirebaseService.getInstance().init()]);
  }

  private _configureApp(environment: Readonly<IEnvironment>): Promise<IGithubReleaseAndTotalCount> {
    this._configureAppFromEnvironment(environment);

    return this._configureAppFromPackage().then(
      (): Promise<IGithubReleaseAndTotalCount> => this._configureAppFromGitHubReleases()
    );
  }

  private _configureAppFromEnvironment({ logger, github, discord, profile, app, quote }: Readonly<IEnvironment>): void {
    LoggerConfigMutatorService.getInstance().updateConfig(logger);
    GithubConfigMutatorService.getInstance().updateConfig(github);
    DiscordSoniaConfigMutatorService.getInstance().updateConfig(discord);
    DiscordMessageConfigMutatorService.getInstance().updateConfig(discord);
    ProfileConfigMutatorService.getInstance().updateConfig(profile);
    AppConfigMutatorService.getInstance().init().updateConfig(app);
    QuoteConfigMutatorService.getInstance().updateConfig(quote);
    ServerConfigMutatorService.getInstance().init();
  }

  private _configureAppFromPackage(): Promise<IPackage> {
    return fs
      .readJson(`${_.toString(appRootPath)}/package.json`)
      .then(
        (data: Readonly<IPackage>): Promise<IPackage> => {
          AppConfigMutatorService.getInstance().updateVersion(data.version);

          return Promise.resolve(data);
        }
      )
      .catch(
        (error: unknown): Promise<never> => {
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`failed to read the package file`),
          });
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(error),
          });

          return Promise.reject(error);
        }
      );
  }

  private _configureAppFromGitHubReleases(): Promise<IGithubReleaseAndTotalCount> {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`app version: ${ChalkService.getInstance().value(appVersion)}`),
    });

    return axios({
      data: {
        query: getGithubQueryReleaseByTagAndTotalCount(appVersion),
      },
      headers: {
        authorization: getBearer(GithubConfigService.getInstance().getPersonalAccessToken()),
      },
      method: `post`,
      url: GITHUB_API_URL,
    })
      .then(
        ({ data }: Readonly<AxiosResponse<IGithubReleaseAndTotalCount>>): Promise<IGithubReleaseAndTotalCount> => {
          AppConfigMutatorService.getInstance().updateTotalReleaseCount(data.data.repository.releases.totalCount);

          LoggerService.getInstance().success({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`Total release count updated from GitHub API`),
          });

          if (_.isNil(data.data.repository.release)) {
            LoggerService.getInstance().error({
              context: this._serviceName,
              message: ChalkService.getInstance().text(
                `Failed to find a release with the given tag name from GitHub API`
              ),
            });
          } else {
            AppConfigMutatorService.getInstance().updateReleaseDate(data.data.repository.release.updatedAt);
            AppConfigMutatorService.getInstance().updateReleaseNotes(
              getHumanizedReleaseNotes(data.data.repository.release.description)
            );

            LoggerService.getInstance().success({
              context: this._serviceName,
              message: ChalkService.getInstance().text(`Release notes updated from GitHub API`),
            });
          }

          return Promise.resolve(data);
        }
      )
      .catch(
        (error: unknown): Promise<never> => {
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`Failed to get the total release count from GitHub API`),
          });
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `Failed to get the release notes for the app version from GitHub API`
            ),
          });
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(error),
          });

          return Promise.reject(error);
        }
      );
  }

  private _startApp(
    environment: Readonly<IEnvironment>
  ): Promise<[true, [number | void, admin.firestore.WriteResult[] | void]]> {
    return this._configureApp(environment).then(
      (): Promise<[true, [number | void, admin.firestore.WriteResult[] | void]]> => this._runApp()
    );
  }
}
