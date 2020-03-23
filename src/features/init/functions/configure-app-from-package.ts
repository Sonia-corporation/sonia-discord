import appRootPath from 'app-root-path';
import fs from 'fs-extra';
import { IPackage } from '../../../interfaces/package';
import { AppConfigService } from '../../app/app-config-service';

export function configureAppFromPackage(): void {
  fs.readJson(`${appRootPath}/package.json`).then((data: Readonly<IPackage>): void => {
    AppConfigService.getInstance().updateConfig({
      version: data.version
    });
  }).catch((error: unknown): void => {
    console.error(`Failed to read the package file`);
    console.error(error);
  });
}
