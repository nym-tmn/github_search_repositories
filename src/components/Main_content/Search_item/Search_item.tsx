import styles from './Search_item.module.scss'

type SearchItemPropsType = {
	name?: string
	description?: string
	license?: string
}


const SearchItem: React.FC<SearchItemPropsType> = (props) => {

	return (
		<div className={styles.searchItemContainer}>
			{Object.keys(props).length === 0 ?
				<h3 className={styles.changeRepoTitle}>Выберите репозитарий</h3> :
				<section>
					<h2>{props.name}</h2>
					<p>{props.description}</p>
					<small>{props.license}</small>
				</section>}
		</div>
	)
}

export default SearchItem;