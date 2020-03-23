import { IEnvironment } from '../../../environment/interfaces/environment';
import { configureAppFromEnvironment } from './configure-app-from-environment';
import { configureAppFromPackage } from './configure-app-from-package';

export function configureApp(environment: Readonly<IEnvironment>): void {
  configureAppFromEnvironment(environment);
  configureAppFromPackage();
}
