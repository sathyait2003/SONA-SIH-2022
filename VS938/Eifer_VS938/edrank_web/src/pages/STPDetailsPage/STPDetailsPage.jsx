import { makeRequest } from 'services/api';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function STPDetailsPage() {
	var { entityId } = useParams();
	console.log('entityId', typeof entityId);

	var { entityType } = useParams();
	console.log('params: ' + entityType);
	const location = useLocation().pathname;
	console.log(location);
	// const viewEntity = params;

	const [data, setData] = useState([]);
	const [entityDetails, setEntityDetails] = useState({});

	useEffect(() => {
		setData([]);
		async function fetchData() {
			const response = await makeRequest(
				'my-college-entity/' + entityType,
				'GET',
			);
			console.log(response?.data.data[entityType]);
			setData(response?.data.data[entityType]);
			const entity = response?.data.data[entityType].find(
				item => item?.id == entityId,
			);
			setEntityDetails(entity);
			console.log('entity', entity);
		}
		fetchData();
		// getEntityDetails();
	}, []);

	// function getEntityDetails() {
	// 	const entity = data.find(item => item.id == entityId);
	// 	console.log('entity', entity);
	// 	// data.forEach(entity => {
	// 	// 	if (entity?.id == entityId) {
	// 	// 		console.log('ENTITY FOUND', entity);
	// 	// 		setEntityDetails(entity);
	// 	// 		// return entity;
	// 	// 	}
	// 	// 	console.log(entity);
	// 	// });
	// 	setEntityDetails(entity);
	// }

	console.log('ENITTY DETAILS', entityDetails);

	return (
		<div className='entity-details-page-main'>
			<div className="entity-details-page-inner">
				<div className="entity-details-page-inner-inner">
					<div className="thead"></div>
					<div className="tbody"></div>
				</div>
			</div>
		</div>
	);
}

export default STPDetailsPage;
