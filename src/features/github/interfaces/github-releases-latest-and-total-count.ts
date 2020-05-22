export interface IGithubReleasesLatestAndTotalCount {
  data: {
    repository: {
      releases: {
        edges: [
          {
            node: {
              description: string;
              updatedAt: string;
            };
          }
        ];
        totalCount: number;
      };
    };
  };
}
