import { makeRequest } from 'services/api';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './FeedbackDrives.scss';

function FeedbackDrives() {
	const [teacherFeedbackDrives, setTeacherFeedbackDrives] = useState([]);
	const [collegeFeedbackDrives, setCollegeFeedbackDrives] = useState([]);
	// const [driveId, setDriveId] = useState(0);
	// const [driveType, setDriveType] = useState('');

	useEffect(() => {
		async function fetchData() {
			const response = await makeRequest('get-college-drives', 'GET');
			setTeacherFeedbackDrives(response.data.data.drives);
			console.log('RESPONSE');
			console.log(response.data.data.drives);

			const response2 = await makeRequest('get-college-drives', 'GET');
			setCollegeFeedbackDrives(response2.data.data.drives);
		}
		fetchData();
	}, []);

	const getDeactivateConfirmation = () => {
		const confirmAlertMessage =
			'Are you sure you want to deactivate this drive?';

		return new Promise((resolve, reject) => {
			confirmAlert({
				title: 'Confirm to deactivate',
				message: confirmAlertMessage,
				buttons: [
					{
						label: 'Deactivate',
						onClick: resolve,
					},
					{
						label: 'Go Back',
						onClick: () => reject(),
					},
				],
				// promises only resolve/reject once
				// if Yes button click resolved it, willUnmount won't reject it after that
				// needed cause modal can be closed by other means(clicking outside)
				willUnmount: () => reject(),
			});
		});
	};

	const deactivateDrive = async (driveId, driveType) => {
		try {
			await getDeactivateConfirmation();
			const response = await makeRequest('toggle-feedback-drive', 'POST', {
				drive_id: driveId,
				drive_type: driveType,
				toggle: 'disable',
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='feedback-drives-main'>
			<h3>Teacher Feedback Drives</h3>
			{/* <p>{JSON.stringify(feedbackDrives)}</p> */}
			{/* {console.log(feedbackDrives[0].drive_type)} */}
			{teacherFeedbackDrives.map((drive, index) => {
				return (
					<div key={index} className='feedback-drive-card'>
						<h3>{drive.type + ' drive'}</h3>
						<h4>{'Created on: ' + drive.created_at.slice(0, 10)}</h4>

						<div className='drive-toggle-btn-wrapper'>
							{drive.is_active ? (
								<button onClick={() => deactivateDrive(drive.id, drive.type)}>
									Deactivate
								</button>
							) : (
								<button disabled>Activate</button>
							)}
						</div>
					</div>
				);
			})}

			<h3>College Feedback Drives</h3>
			{collegeFeedbackDrives.map((drive, index) => {
				return (
					<div key={index} className='feedback-drive-card'>
						<h3>{drive.type + ' drive'}</h3>
						<h4>{'Created on: ' + drive.created_at.slice(0, 10)}</h4>

						<div className='drive-toggle-btn-wrapper'>
							{drive.is_active ? (
								<button onClick={() => deactivateDrive(drive.id, drive.type)}>
									Deactivate
								</button>
							) : (
								<button disabled>Activate</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FeedbackDrives;
