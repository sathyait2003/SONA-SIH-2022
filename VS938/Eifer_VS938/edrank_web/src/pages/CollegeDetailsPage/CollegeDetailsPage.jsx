import { makeRequest } from 'services/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardMetricsCard, LeaderboardCard, SaGraph, STPListCard } from 'components';
import './CollegeDetailsPage.scss';

function CollegeDetailsPage() {
	const { collegeId } = useParams();
	const [college, setCollege] = useState({});
	const [nationalRank, setNationalRank] = useState(0);
	const [stateRank, setStateRank] = useState(0);
	const [regionalRank, setRegionalRank] = useState(0);
	const [topTeachers, setTopTeachers] = useState([]);
	const [saData, setSaData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await makeRequest('get-college', 'POST', {
				college_id: parseInt(collegeId),
			});
			const reponse1 = await makeRequest('get-my-colleges-rank', 'POST', {
				cid: parseInt(collegeId),
				request_type: 'NATIONAL',
			});
			const reponse2 = await makeRequest('get-my-colleges-rank', 'POST', {
				cid: parseInt(collegeId),
				request_type: 'STATE',
				state: response?.data.data.college.state,
			});
			const response3 = await makeRequest('get-my-colleges-rank', 'POST', {
				cid: parseInt(collegeId),
				request_type: 'REGIONAL',
				city: response?.data.data.college.city,
			});
			const response4 = await makeRequest('top-n-teachers', 'POST', {
				request_type: 'COLLEGE',
				cid: parseInt(collegeId),
				city: '',
				state: '',
				n: 3,
			});
			const response5 = await makeRequest('sa-graph/college', 'POST', {
				college_id: parseInt(collegeId),
			});
			// const data = await response.json();
			console.log('data');
			console.log(response?.data.data.college);
			setCollege(response?.data.data.college);
			setNationalRank(reponse1?.data.data.rank);
			setStateRank(reponse2?.data.data.rank);
			setRegionalRank(response3?.data.data.rank);
			setTopTeachers(response4?.data.data.teachers);
			setSaData(response5?.data.data.sa_graph);
		}
		fetchData();
	}, []);

	return (
		<div className='college-details-page-main'>
			<h2>{college.name}</h2>
			<STPListCard item={college} entityType='college' />
			<div className='college-rank-wrapper'>
				{/* <p className='national-rank'>National Rank: {nationalRank}</p>
				<p className='state-rank'>State Rank: {stateRank}</p>
				<p className='regional-rank'>City Rank: {regionalRank}</p> */}
				<DashboardMetricsCard
					digit={nationalRank}
					text="College's National Rank"
				/>
				<DashboardMetricsCard digit={stateRank} text="College's State Rank" />
				<DashboardMetricsCard digit={regionalRank} text="College's City Rank" />
			</div>
			<h3>
				Top teachers of {college.name}
			</h3>
			{topTeachers.map((teacher, index) => (
				<LeaderboardCard key={index} rank={teacher.rank} main={teacher.name} />
				// <STPListCard key={index} item={teacher} entityType='teachers' />
			))}
			<h3>Sentimental Analysis</h3>
			<div className="sa-graph-wrapper">
				<SaGraph saData={saData} chartType='Bar' />
			</div>
		</div>
	);
}

export default CollegeDetailsPage;
