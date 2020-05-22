export interface IGithubReleaseAndTotalCount {
  data: {
    repository: {
      release?: {
        description: string;
        updatedAt: string;
      };
      releases: {
        totalCount: number;
      };
    };
  };
}
