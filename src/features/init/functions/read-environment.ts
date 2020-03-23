import appRootPath from 'app-root-path';
import fs from 'fs-extra';
import { ENVIRONMENT } from '../../../environment/environment';
import { IEnvironment } from '../../../environment/interfaces/environment';
import { mergeEnvironments } from './merge-environments';
import { startApp } from './start-app';

export function readEnvironment(): void {
  fs.readJson(`${appRootPath}/src/environment/secret-environment.json`).then((environment: Readonly<IEnvironment>): void => {
    startApp(mergeEnvironments(ENVIRONMENT, environment));
  }).catch((error: unknown): void => {
    console.error(`Failed to read the environment file`);
    console.error(error);
    throw new Error(`The app must have an environment file with at least a "discord.sonia.secretToken" inside it`);
  });
}
