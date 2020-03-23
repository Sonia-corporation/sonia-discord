export interface IGithubTagsTotalCount {
  data: {
    repository: {
      refs: {
        totalCount: number;
      };
    };
  };
}
