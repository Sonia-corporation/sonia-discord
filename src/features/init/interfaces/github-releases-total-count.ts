export interface IGithubReleasesTotalCount {
  data: {
    repository: {
      releases: {
        totalCount: number;
      };
    };
  };
}
