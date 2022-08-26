import { Link } from 'react-router-dom';
import './LeaderboardCard.scss';

// import './STPListCard.scss';
function LeaderboardCard({ rank, main, submain, path }) {
	return (
		<Link to={path ?? ''}>
			<div className='leaderboard-card-main'>
				<p className='leaderboard-rank'>{rank}</p>
				<p>
					{main}
					{submain && <span className='leadercard-submain'>({submain})</span>}
				</p>
				{/* <p>{submain}</p> */}
			</div>
		</Link>
	);
}

export default LeaderboardCard;
