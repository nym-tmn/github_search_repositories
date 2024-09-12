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