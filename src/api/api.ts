const baseUrl = "https://api.github.com/graphql";

export const getRepositories = async (searchValue: string, endCursorValue: string = '', startCursorValue: string = '', pageSize: number = 10): Promise<Response> => {

	const query = `{
  search(
    type: REPOSITORY
    query: "${searchValue} in:name"
    last: ${pageSize}
		after: "${endCursorValue}"
		before: "${startCursorValue}"
  ) {
		totalRepositoriesCount: repositoryCount
		pageInfo {
      endCursor
			startCursor
    }
    repositories: edges {
      repository: node {
        ... on Repository {
          name
          language: primaryLanguage {
            name
          }
          forkCount
          stargazerCount
          updatedAt
					description
          licenseInfo {
            name
          }
        }
      }
    }
  }
}`;
	
	const options = {
		method: 'POST',
		headers: {
			"Authorization": "bearer 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",
		},
		body: JSON.stringify({ query })
	};

	const response = await fetch(baseUrl, options);
	return response;
}