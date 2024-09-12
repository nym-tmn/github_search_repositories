import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './../features/getRepositories/getRepositoriesSlice';

export const store = configureStore({
	reducer: {
		repositoriesPage: repositoriesReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch