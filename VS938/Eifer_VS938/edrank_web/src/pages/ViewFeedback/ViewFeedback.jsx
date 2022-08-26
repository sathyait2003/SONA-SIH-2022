import { makeRequest } from 'services/api';
import { useEffect, useState } from 'react';
import './ViewFeedback.scss';

function ViewFeedback() {
	const [feedbacks, setFeedbacks] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const response = await makeRequest('get-my-text-feedbacks', 'GET');
			setFeedbacks(response.data.data.feedbacks);
		}

		fetchData();
	}, []);

	function GetSentimentByScore(score) {
		if (score >= 0 && score < 35) {
			return 'Negative';
		} else if (score >= 35 && score < 66) {
			return 'Neutral';
		} else if (score >= 66) {
			return 'Positive';
		} else {
			return 'Neutral';
		}
	}
	function getSentimentColor(sentiment) {
		if (sentiment === 'Negative') {
			return '#ff0000';
		} else if (sentiment === 'Positive') {
			return '#00ff00';
		} else {
			return '#fcff41';
		}
	}

	return (
		<div className='view-feedback-main'>
			<div className='view-feedback-header'>
				<h1>My Feedbacks</h1>
				<p>These are the feedbacks provided to you which can help you improve your performance and identify your weakness</p>
				{feedbacks?.map((feedback, index) => {
					let sentiment = GetSentimentByScore(feedback.sa_score);
					return (
						<div key={index} className='view-feedback-item'>
							<span style={{ backgroundColor: getSentimentColor(sentiment) }}>
								{sentiment}
							</span>
							<p>{feedback.text_feedback}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ViewFeedback;
