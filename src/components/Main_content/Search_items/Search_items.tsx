import { DataGrid, gridClasses, GridColDef, GridPaginationModel, GridRowId, GridRowsProp } from '@mui/x-data-grid';

import { RepositoriesType } from '../../../types/types';
import { useAppSelector } from '../../../redux/hooks/hooks';

import styles from './Search_items.module.scss';

type RowParamsType = {
	id: GridRowId
	columns: GridColDef[]
	row: RowType
}

export type RowType = {
	key?: number
	id?: number
	name?: string
	language?: string
	forkCount?: number
	stargazerCount?: number
	updatedAt?: string
	description?: string
	license?: string
}

type RestParamsType = {
	name?: string
	description?: string
	license?: string
}

type SearchResultsPropsType = {
	isLoading: boolean
	totalRepositoriesCount?: number
	repositories?: Array<RepositoriesType>
	setRowParams: (restParams: RestParamsType) => void
	onPageChange: (model: GridPaginationModel) => void;
}

const COLUMNS: GridColDef[] = [
	{ field: 'name', headerName: 'Название', width: 182.4, resizable: false, sortable: false, disableColumnMenu: true },
	{ field: 'language', headerName: 'Язык', width: 182.4, resizable: false, sortable: false, disableColumnMenu: true },
	{ field: 'forkCount', headerName: 'Число форков', width: 182.4, resizable: false, hideable: false },
	{ field: 'stargazerCount', headerName: 'Число звезд', width: 182.4, resizable: false, hideable: false },
	{ field: 'updatedAt', headerName: 'Дата обновления', width: 182.4, resizable: false, hideable: false },
];

const SearchItems: React.FC<SearchResultsPropsType> = ({
	isLoading,
	repositories,
	setRowParams,
	onPageChange,
	totalRepositoriesCount,
}) => {

	const { page, pageSize } = useAppSelector(state => state.repositoriesPage)

	let rows: GridRowsProp = [];

	if (repositories) {
		rows = repositories.map((el: RepositoriesType, index: number) => {

		const formattedDate = new Date(el.repository.updatedAt).toLocaleDateString();

			return (
				{
					key: index,
					id: index + 1,
					name: el.repository.name,
					language: el.repository.language?.name ?? 'Значение отсутствует',
					forkCount: el.repository.forkCount,
					stargazerCount: el.repository.stargazerCount,
					updatedAt: formattedDate,
					description: el.repository.description ?? 'Описание отсутствует',
					license: el.repository.licenseInfo?.name ?? 'Лицензия отсутствует',
				}
			)
		})
	}

	const handleRowClick = (params: RowParamsType) => {
		const { name, description, license } = params.row
		setRowParams({ name, description, license });
	}

	return (
		<>
			{<div className={styles.searchItemsContainer}>
				<DataGrid
					rows={rows}
					columns={COLUMNS}
					loading={isLoading}
					disableRowSelectionOnClick={true}
					onRowClick={handleRowClick}
					sortingOrder={['desc', 'asc']}
					disableColumnFilter
					disableColumnSelector={true}
					paginationMode="server"
					rowCount={totalRepositoriesCount}
					paginationModel={{ pageSize, page }}
					onPaginationModelChange={onPageChange}
					pageSizeOptions={[5, 10]}
					sx={{
						borderRadius: 0,
						border: 'none',
						'& .MuiDataGrid-footerContainer': { border: 'none' },
						'& .MuiTablePagination-selectLabel': { fontSize: '12px', letterSpacing: '0.4px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.6)' },
						'& .MuiTablePagination-select': { fontSize: '12px', letterSpacing: '0.4px', lineHeight: '20px' },
						'& .MuiTablePagination-displayedRows': { fontSize: '12px', letterSpacing: '0.4px', lineHeight: '20px' },
						'& .MuiToolbar-root .MuiTablePagination-actions': { width: '96px', height: '48px', marginLeft: '26px' },
						'& .MuiButtonBase-root': { padding: '12px' },
						'& .MuiDataGrid-selectedRowCount': { visibility: 'hidden' },
						[`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
							outline: 'none',
						},
						[`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
						{
							outline: 'none',
						},
					}} />
			</div>}
		</>
	)
}

export default SearchItems;