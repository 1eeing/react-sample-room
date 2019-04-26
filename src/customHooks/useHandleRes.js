import { useState, useEffect } from 'react';

const useHandleRes = (err, json) => {
	const [resArr, setResArr] = useState([null, {}]);

	useEffect(() => {
		if(err) {
			setResArr([err, {}]);
		}else if(json){
			if(json.result !== 100){
				setResArr([json.message, {}]);
			}else{
				setResArr([null, json.data]);
			}
		}else{
			setResArr([null, {}]);
		}
	}, [err, json]);

	return resArr;
}

export default useHandleRes;
