const baseUrl = "https://api.github.com/graphql";


/* Функция для извлечения списка репозиториев из GitHub, соответствующих заданному значению поиска (searchValue).
 Поддерживает пагинацию с использованием параметров `endCursorValue` и `startCursorValue`, а также задает размер страницы с использованием параметра `pageSize` */
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