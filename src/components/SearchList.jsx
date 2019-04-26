import React from 'react';
import { Table } from 'antd';
import styles from '@assets/common.module.scss';

const SearchList = ({searchForm, ...rest}) => (
	<React.Fragment>
		{searchForm}
		<Table className={styles.mt20} {...rest} />
	</React.Fragment>
);

export default SearchList;
