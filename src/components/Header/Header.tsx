import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

import PopoverComponent from '../../popups/Popover_component';
import { setRequestParameter } from '../../redux/features/getRepositories/getRepositoriesSlice';
import { useAppDispatch } from '../../redux/hooks/hooks';

import styles from './Header.module.scss'

type MainContentPropsType = {
	setIsStarted: (isStarted: boolean) => void
}

const Header: React.FC<MainContentPropsType> = ({ setIsStarted }) => {

	// ----Данная часть кода предназначена для использования функционала компонента "PopoverComponent"----
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	// -------------------------------------------------------------------------------------------------------

	// Применение React hook Form для получения значения из строки поиска "searchValue" который отпраляется в redux и в дальнейшем использутся в качестве query параметра для запроса на сервер
	const { register, handleSubmit, formState: { errors } } = useForm();

	const dispatch = useAppDispatch();

	const onSearchRepos: SubmitHandler<FieldValues> = (searchFormData: FieldValues) => {
		const searchValue = searchFormData.search as string;
		setIsStarted(true)
		dispatch(setRequestParameter(searchValue));
	};
	// -----------------------------------------------------------------------------------------------------------

	return (
		<div className={styles.header}>
			<form className={styles.searchForm}
				onSubmit={handleSubmit(onSearchRepos)}>
				<input className={styles.searchBar}
					{...(register('search', {
						required: 'This field is required',
					}))}
					placeholder='Введите поисковый запрос'
				/>
				{errors.searchBar?.message &&
					<div className={styles.error}>
						<PopoverComponent id={id} open={open} anchorEl={anchorEl} handleClose={handleClose} errors={errors} />
					</div>}
				<Button
					className={styles.searchButton}
					type='submit'
					variant="contained"
					size='large'
					sx={{
						backgroundColor: '#2196F3',
						":hover": {
							backgroundColor: '#1e88e5',
						}
					}}
					onClick={handleClick}>Искать</Button>
			</form>
		</div>
	)
}

export default Header;