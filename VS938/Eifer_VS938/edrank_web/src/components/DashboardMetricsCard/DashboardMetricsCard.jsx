function DashboardMetricsCard({ digit, text }) {
	return (
		<div className='top-3-card-main-wrapper'>
			<div className='top-3-card-main'>
				<div className='circle'>
					<div className='inner-circle'>
						<p className='leaderboard-rank'>{digit}</p>
					</div>
				</div>
				<div className='top-3-card-main-text'>
					<p className='leaderboard-name'>{text}</p>
				</div>
			</div>
		</div>
	);
}

export default DashboardMetricsCard;
