import { ReactNode } from 'react';
import Popover from '@mui/material/Popover/Popover';
import Typography from '@mui/material/Typography/Typography';
import { FieldErrors, FieldValues } from 'react-hook-form';

type PopoverComponentPropsType = {
	id: string | undefined
	open: boolean
	handleClose: () => void
	anchorEl: HTMLButtonElement | null
	errors: FieldErrors<FieldValues>
}

const PopoverComponent: React.FC<PopoverComponentPropsType> = ({
	id,
	anchorEl,
	errors,
	handleClose,
	open,
}) => {

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			sx={{
				position: 'absolute',
				top: '50px',
				left: '-800px',
			}}>
			<Typography sx={{ p: 1, backgroundColor: '#fce4ec' }}>{errors.searchBar?.message as ReactNode}</Typography>
		</Popover>
	);
}

export default PopoverComponent;