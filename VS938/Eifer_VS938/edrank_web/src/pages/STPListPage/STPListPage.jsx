import { STPListCard } from 'components';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './STPListPage.scss';
import { makeRequest } from 'services';
import { collegeAdminEndpoints } from 'constants/endpoints';

function STPListPage() {
	var { entityType } = useParams();
	console.log('params: ' + entityType);
	const location = useLocation().pathname;
	console.log(location);
	// const viewEntity = params;

	const [data, setData] = useState([]);

	useEffect(() => {
		setData([]);
		async function fetchData() {
			const response = await makeRequest(
				'my-college-entity/' + entityType + '?page=1&size=100',
				'GET',
			);
			console.log(response?.data.data[entityType]);
			setData(response?.data.data[entityType]);
		}
		fetchData();
	}, [entityType]);

	return (
		<>
			<div className='stp-list-page-main'>
				<h3>
					All
					<span>
						{entityType === 'college_admins' ? ' College Admins ' : entityType}
					</span>
					of your College
				</h3>
				{data.length === 0 && <div>Loading</div>}
				{data?.map((item, index) => {
					return (
						// <Link to={ 	collegeAdminEndpoints.viewDetails + 	'/' + 	entityType + 	'/' + 	item.id } >
						// </Link>
						<STPListCard key={index} item={item} entityType={entityType} />
					);
				})}
			</div>
		</>
	);
}

export default STPListPage;
