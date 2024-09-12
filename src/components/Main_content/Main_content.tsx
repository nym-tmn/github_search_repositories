import { useState } from 'react';
import Alert from '@mui/material/Alert/Alert';
import { GridPaginationModel } from '@mui/x-data-grid';

import SearchItems, { RowType } from './Search_items/Search_items';
import { RepositoriesType } from '../../types/types';
import SearchItem from './Search_item/Search_item';

import styles from './Main_content.module.scss'

export type MainContentPropsType = {
	isLoading: boolean
	totalRepositoriesCount?: number
	repositories?: Array<RepositoriesType>
	onPageChange: (model: GridPaginationModel) => void;
	error: string | unknown
}

const MainContent: React.FC<MainContentPropsType> = ({
	isLoading,
	totalRepositoriesCount,
	repositories,
	onPageChange,
	error,
}) => {

	const [rowParams, setRowParams] = useState<RowType>({});

	return (

		<div className={styles.mainContainer}>
			<h1>Результаты поиска</h1>
			{error ?
				<Alert className={styles.error} severity="error">{error.toString()}</Alert> :
				<>
					<SearchItems
						repositories={repositories}
						totalRepositoriesCount={totalRepositoriesCount}
						setRowParams={setRowParams}
						onPageChange={onPageChange}
						isLoading={isLoading}
					/>
					<SearchItem {...rowParams} />
				</>}
		</div>

	)
}

export default MainContent;