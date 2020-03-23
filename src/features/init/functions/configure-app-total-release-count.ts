import axios, { AxiosResponse } from 'axios';
import { GITHUB_API_URL } from '../../../constants/github-api-url';
import { getBearer } from '../../../functions/get-bearer';
import { AppConfigService } from '../../app/app-config-service';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { IGithubTagsTotalCount } from '../interfaces/github-tags-total-count';

export function configureAppTotalReleaseCount(): void {
  axios({
    data: {
      query: `{
        repository(owner: "Sonia-corporation", name: "il-est-midi-discord") {
          refs(refPrefix: "refs/tags/") {
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
  }).then((axiosResponse: AxiosResponse<IGithubTagsTotalCount>): void => {
    AppConfigService.getInstance().updateTotalReleaseCount(axiosResponse.data.data.repository.refs.totalCount);
  }).catch((): void => {
    LoggerService.getInstance().error(ChalkService.getInstance().text(`Failed to get the app total release count from GitHub API`));
  });
}
