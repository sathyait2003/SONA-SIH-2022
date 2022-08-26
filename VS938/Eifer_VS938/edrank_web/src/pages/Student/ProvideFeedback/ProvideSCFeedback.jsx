import { FormGenerator } from 'components';
import { makeRequest } from 'services/api';
import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import './ProvideFeedbackForm.scss';

function ProvideSCFeedback() {
	const [feedbackQuestions, setFeedbackQuestions] = useState([]);
	const [driveId, setDriveId] = useState(0);

	const getRadioOptions = question => {
		let optionsArray = [];
		let index = 1;
		for (index = 1; index <= 5; index++) {
			optionsArray.push(question?.['option_' + index]);
		}
		return optionsArray;
	};

	const getFormObject = () => {
		let formObject = [];
		feedbackQuestions.forEach(question => {
			formObject.push({
				inputType: 'radio',
				inputKey: question.id,
				label: question.title,
				required: true,
				options: getRadioOptions(question),
			});
		});

		// const question = {
		// 	id: 1,
		// 	title: "How was teacher's subject knowledge",
		// 	option_1: 'Excellent',
		// 	option_2: 'Very good',
		// 	option_3: 'Fair',
		// 	option_4: 'Poor',
		// 	option_5: 'Very Poor',
		// 	type: 'ST',
		// 	is_active: '1',
		// };
		console.log(formObject);
		formObject = [
			...formObject,
			// {
			// 	inputType: 'radio',
			// 	inputKey: question.id,
			// 	label: question.title,
			// 	required: true,
			// 	options: getRadioOptions(question),
			// },
			{
				inputType: 'textarea',
				inputKey: 'text_feedback',
				label: 'Feedback',
				required: true,
			},
		];

		return formObject;
	};

	useEffect(() => {
		async function fetchData() {
			const response = await makeRequest('feedback-questions/SC', 'POST');
			setFeedbackQuestions(response?.data.data.questions);
			setDriveId(response?.data.data.drive_id);
		}
		fetchData();
	}, []);

	const createMcqResponse = (questionIdsArray, optionIdsArray) => {
		let mcqResponse = [];
		questionIdsArray.forEach((questionId, index) => {
			mcqResponse.push({
				question_id: questionId,
				answer_id: optionIdsArray[index],
			});
		});

		// mcqResponse = [...mcqResponse, { text_feedback: '' }];
		return mcqResponse;
	};

	const changeToRequiredFormat = data => {
		let questionIds = Object.keys(data);
		questionIds.pop();
		console.log('questionIds', questionIds);
		let questionIdsArray = [];
		questionIds.map(questionId => questionIdsArray.push(Number(questionId)));
		console.log('questionIdsArray', questionIdsArray);

		let optionIds = Object.values(data);
		optionIds.pop();
		console.log('OPTIONIDs');
		console.log(optionIds);
		let optionIdsArray = [];
		optionIds.map(option => optionIdsArray.push(Number(option.slice(-1))));
		console.log(optionIdsArray);

		const requestBody = {
			feedback: {
				drive_id: driveId,
				mcq: createMcqResponse(questionIdsArray, optionIdsArray),
				text_feedback: data.text_feedback,
			},
		};
		console.log('requestBody', JSON.stringify(requestBody));
		return requestBody;
		// console.log(requestBody);
	};

	const onSubmit = data => {
		console.log('data');
		console.log(data);
		const requestBody = changeToRequiredFormat(data);
		async function postData() {
			console.log('requestBODY: ', requestBody);
			const response = await makeRequest(
				'submit-feedback/SC',
				'POST',
				requestBody,
			);

			if (response?.status === 200) {
				document.getElementById('provide-sc-feedback-form').reset();
			}

			console.log('RESPONSE');
			console.log(response);
		}
		postData();
	};

	return (
		<div className='provide-sc-feedback-main'>
			<div className='provide-sc-feedback-body'>
				<div className='provide-sc-feedback-body-form'>
					{/* <form id='feedback-form-1' onSubmit={handleSubmit(onSubmit)}> */}
					<FormGenerator
						formObject={getFormObject()}
						onSubmit={onSubmit}
						formIndex={0}
						heading='Please provide your valuable feedback'
						formId='provide-sc-feedback-form'
					/>
					{/* <input type='submit' value='SUBMITTTT' /> */}
					{/* </form> */}
				</div>
			</div>
		</div>
	);
}

export default ProvideSCFeedback;

// import endpoints from 'constants/endpoints';
// import { Navbar } from 'components';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { makeRequest } from 'services';
// import { FormGenerator, QuestionCard } from 'components';

// function StudentProvideSCFeedback() {
// 	const [feedbackQUestions, setFeedbackQuestions] = useState([]);
// 	const [driveid, setDriveId] = useState("1");

// 	useEffect(() => {
// 		console.log('useEffect');
// 		async function fetchData() {
// 			const response = await makeRequest('feedback-questions/SC', 'GET');
// 			setFeedbackQuestions(response?.data.data.questions);
// 		}
// 		fetchData();
// 	}, []);

// 	const onSubmit = () => {

// 	}

// 	const addFeedback = () => {

// 	}

// 	return (
// 		<>
// 			<Navbar />
// 			<div className='st-feedback-form-main'>
// 				<div>
// 					{
// 						feedbackQUestions.map((fbq, i) => {
// 							return (
// 								<QuestionCard
// 									key={i}
// 									question={fbq.title}
// 									options={[fbq.option_1, fbq.option_2, fbq.option_3, fbq.option_4, fbq.option_5]}
// 								/>
// 							)
// 						})
// 					}
// 				</div>
// 				<button onClick={onSubmit}>Submit Feedback</button>
// 			</div>
// 		</>
// 	);
// }

// export default StudentProvideSCFeedback;
