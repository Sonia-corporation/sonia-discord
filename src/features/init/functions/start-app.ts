import { IEnvironment } from '../../../environment/interfaces/environment';
import { configureApp } from './configure-app';
import { runApp } from './run-app';

export function startApp(environment: Readonly<IEnvironment>): void {
  configureApp(environment);
  runApp();
}
