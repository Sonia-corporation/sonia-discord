export interface IGithubReleasesLatest {
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
