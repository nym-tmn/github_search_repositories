import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getRepositories } from "../../../api/api"
import { ErrorDataType, RepositoriesType, RequestDataType } from "../../../types/types"

type InitialStateType = {
	isLoading: boolean
	error: string | unknown
	searchValue: string
	repositories?: Array<RepositoriesType>
	totalRepositoriesCount?: number
	endCursorValue: string
	startCursorValue: string
	pageSize: number
	page: number
}

const initialState: InitialStateType = {
	isLoading: false,
	error: '',
	searchValue: '',
	repositories: [],
	totalRepositoriesCount: 0,
	endCursorValue: '',
	startCursorValue: '',
	pageSize: 10,
	page: 0,
}

export const getRepositoriesSlice = createSlice({
	name: 'getRepositories',
	initialState,
	reducers: {
		setRequestParameter: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRepositories.fulfilled, (state, action) => {
			state.isLoading = false
			state.repositories = action.payload?.repositories;
			state.totalRepositoriesCount = action.payload?.totalRepositoriesCount;
			state.endCursorValue = action.payload?.pageInfo.endCursor ?? '';
			state.startCursorValue = action.payload?.pageInfo.startCursor ?? '';
		});
		builder.addCase(fetchRepositories.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload;
		});
		builder.addCase(fetchRepositories.pending, (state) => {
			state.isLoading = true
		})
	},
})

export const { setRequestParameter } = getRepositoriesSlice.actions;
export const { setPageSize } = getRepositoriesSlice.actions;
export const { setCurrentPage } = getRepositoriesSlice.actions;

export const fetchRepositories = createAsyncThunk(
	'repositories/fetchByName',
	async ({ searchValue, endCursorValue, startCursorValue, pageSize }: { searchValue: string, endCursorValue?: string, startCursorValue?: string, pageSize?: number }, thunkAPI) => {
		try {
			const response = await getRepositories(searchValue, endCursorValue, startCursorValue, pageSize);

			if (!response.ok) {
				const errorData = await response.json() as ErrorDataType;
				throw new Error(`An error occerd: ${errorData.message}`)
			}

			const data = await response.json() as RequestDataType;
			console.log(data);
			
			const { repositories, totalRepositoriesCount, pageInfo } = data.data.search;
			return { repositories, totalRepositoriesCount, pageInfo };

		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message)
			}
		}

	}
)

export default getRepositoriesSlice.reducer;


