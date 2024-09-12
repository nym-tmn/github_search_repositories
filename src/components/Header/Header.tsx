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

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const dispatch = useAppDispatch();

	const { register, handleSubmit, formState: { errors } } = useForm();

	const searchRepos: SubmitHandler<FieldValues> = (searchFormData: FieldValues) => {
		setIsStarted(true)
		dispatch(setRequestParameter(searchFormData.searchBar));
	};

	return (
		<div className={styles.header}>
			<form className={styles.searchForm}
				onSubmit={handleSubmit(searchRepos)}>
				<input className={styles.searchBar}
					{...(register('searchBar', {
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