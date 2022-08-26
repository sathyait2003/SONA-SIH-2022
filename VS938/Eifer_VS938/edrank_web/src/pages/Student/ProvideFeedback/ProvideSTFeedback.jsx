import endpoints from 'constants/endpoints';
import { Navbar } from 'components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { makeRequest } from 'services';
import { FormGenerator, QuestionCard } from 'components';

function StudentProvideSTFeedback() {
	const [teachers, setteachers] = useState([]);
	const [feedbackQuestions, setFeedbackQuestions] = useState([]);
	const [driveid, setDriveId] = useState("1");

	useEffect(() => {
		console.log('useEffect');
		async function fetchData() {
			const response = await makeRequest('feedback-questions/ST', 'GET');
			const response2 = await makeRequest('get-feedback-teachers', 'POST', {
				course_id: JSON.parse(localStorage.getItem('user_info')).course_id
			})
			console.log(response?.data.data);
			console.log(response2?.data.data);
			setFeedbackQuestions(response?.data.data.questions);
			let teachersOpts = []
			response2.data.data.teachers.forEach(t => {
				teachersOpts.push({
					value: t.id,
					label: t.name
				})
			})
			setteachers(teachersOpts)
		}
		fetchData();
	}, []);


	const formObject = [
		{
			inputType: 'select',
			inputKey: 'teacher',
			label: 'Select Teacher',
			required: true,
			options: teachers,
		}
	]

	const onSubmit = () => {

	}

	const addFeedback = () => {

	}

	return (
		<>
			{/* <Navbar /> */}
			<div className='st-feedback-form-main'>
				<div>
					<FormGenerator
						formClass='form-wrapper'
						onSubmit={onSubmit}
						formObject={formObject}
					/>
					{
						feedbackQuestions.map((fbq, i) => {
							return (
								<QuestionCard
									key={i}
									question={fbq.title}
									options={[fbq.option_1, fbq.option_2, fbq.option_3, fbq.option_4, fbq.option_5]}
								/>
							)
						})
					}
				</div>
				<button onClick={addFeedback}>Add +</button>
			</div>
		</>
	);
}

export default StudentProvideSTFeedback;