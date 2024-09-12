// Типизация данных полученных с сервера
export type RequestDataType = {
	data: {
		search: {
			totalRepositoriesCount: number
			pageInfo: {
				endCursor: string
				hasNextPage: boolean
				startCursor: string
			}
			isHasNextPage: boolean
			repositories: Array<RepositoriesType>
		}
	}
}

export type RepositoriesType = {
	repository: RepositoryType
}

// Типизация репозитория
export type RepositoryType = {
	name: string
	forkCount: number
	stargazerCount: number
	updatedAt: string
	language: {
		name: string
	}
	description: string
	licenseInfo: {
		name: string
	}
}

// Типизация данных ошибки
export type ErrorDataType = {
	message: string
	documentation_url: string
	status: string
}