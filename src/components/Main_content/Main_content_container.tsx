import { useEffect } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";

import { fetchRepositories, setCurrentPage, setPageSize } from "../../redux/features/getRepositories/getRepositoriesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import MainContent from "./Main_content";

const MainContentContainer = () => {

	const {
		isLoading,
		searchValue,
		repositories,
		totalRepositoriesCount,
		endCursorValue,
		startCursorValue,
		error,
		pageSize: oldPageSize,
		page: oldPage
	} = useAppSelector(state => state.repositoriesPage);

	const dispatch = useAppDispatch();

	useEffect(() => {
		// Отправка fetchRepositories для получения первых данных с сервера
		dispatch(fetchRepositories({ searchValue }))

	}, [searchValue, dispatch])

	/* Функция предназначения для изменения размера страницы и реализации пагинации. Запускается из компонента "SearchItems".
	page - номер страницы
	pageSize - размер страницы 
	endCursorValue - курсор для получения данных следующей страницы
	startCursorValue - курсор для получения данных предыдущей страниц */
	
	const onPageChange = (model: GridPaginationModel) => {

		const { page, pageSize } = model;

		if (oldPageSize !== pageSize) {
			dispatch(setPageSize(pageSize))
			dispatch(fetchRepositories({ searchValue, pageSize }))
		}

		if (oldPage !== page) {

			dispatch(setCurrentPage(page))

			if (oldPage < page) {
				dispatch(fetchRepositories({ searchValue, endCursorValue, pageSize }))
			}

			if (oldPage > page) {
				dispatch(fetchRepositories({ searchValue, startCursorValue, pageSize }))
			}
		}
	}

	return (
		<MainContent
			isLoading={isLoading}
			repositories={repositories}
			totalRepositoriesCount={totalRepositoriesCount}
			error={error}
			onPageChange={onPageChange}
		/>
	)
}

export default MainContentContainer;
