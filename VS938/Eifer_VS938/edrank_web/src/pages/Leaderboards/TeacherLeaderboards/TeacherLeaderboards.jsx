import { useState, useEffect } from 'react';
import { makeRequest } from 'services';
import { LeaderboardCard, LeaderboardCardTopThree } from 'components';
import './TeacherLeaderboards.scss';

function TeacherLeaderBoards() {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		console.log('useEffect');
		async function fetchData() {
			const response = await makeRequest('top-n-teachers', 'POST', {
				request_type: 'NATIONAL',
				n: -1,
			});
			setLeaderboard(response?.data.data.teachers);
		}
		fetchData();
		console.log('leaderboard');
		console.log(leaderboard);
	}, []);

	const separateTopThree = arr => {
		const topThree = arr.slice(0, 3);
		const rest = arr.slice(3);
		return [topThree, rest];
	};
	const [topThree, rest] = separateTopThree(leaderboard);
	return (
		<>
			{/* <Navbar /> */}
			<div className='teacher-leaderboard-main'>
				<h1 className='teacher-leaderboard-header'>Leaderboard</h1>
				<div className='teacher-leaderboard-top-3'>
					{topThree.map((lb, i) => {
						return (
							<LeaderboardCardTopThree
								key={i}
								name={lb.name}
								rank={lb.rank}
								college_name={lb.college_name}
								isCollegeLeaderboard={false}
							/>
						);
					})}
				</div>
				{rest.map((lb, i) => {
					return (
						<LeaderboardCard
							key={i}
							rank={lb.rank}
							main={lb.name}
							submain={lb.college_name}
							isCollegeLeaderboard={false}
						/>
					);
				})}
			</div>
		</>
	);
}

export default TeacherLeaderBoards;
