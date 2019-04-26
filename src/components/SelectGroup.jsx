import React from 'react';
import { Select } from 'antd';

const SelectGroup = ({ dataSource, ...rest }) => (
	<Select {...rest}>
		{dataSource.map(item => (
			<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
		))}
	</Select>
);

export default SelectGroup;
