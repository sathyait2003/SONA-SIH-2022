import { makeRequest } from 'services/api';
import { useEffect, useState } from 'react';
import { FormGenerator } from 'components/';
import Select from 'react-select';

function ProvidePCFeedback() {
	const [feedbackQuestions, setFeedbackQuestions] = useState([]);
	const [driveId, setDriveId] = useState(0);
	const [students, setStudents] = useState([]);
	const [cid, setCid] = useState(1);

	const handleStudentChange = e => {
		console.log('handleStudentChange', e.value);
		setCid(e.value);
	};

	const getStudentOptions = () => {
		let optionsArray = [];
		students.forEach(student => {
			optionsArray.push({
				value: student.id,
				label: student.name,
			});
		});
		return optionsArray;
	};

	useEffect(() => {
		async function fetchData() {
			const response = await makeRequest('feedback-questions/PC', 'POST', {
				cid: cid,
			});
			console.log('response', response);
			setFeedbackQuestions(response?.data.data.questions);
			setDriveId(response?.data.data.drive_id);

			const response1 = await makeRequest('get-my-students', 'GET');
			console.log('response1', response1);
			setStudents(response1?.data.data.students);
		}

		fetchData();
	}, [cid]);

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
		console.log(formObject);
		formObject = [
			...formObject,
			{
				inputType: 'textarea',
				inputKey: 'text_feedback',
				label: 'Feedback',
				required: true,
			},
		];
		return formObject;
	};

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
				// college_id: ,
				mcq: createMcqResponse(questionIdsArray, optionIdsArray),
				text_feedback: data.text_feedback,
			},
		};
		console.log('requestBody', JSON.stringify(requestBody));
		return requestBody;
		// console.log(requestBody);
	};

	const onSubmit = data => {
		// console.log('data', data);
		const requestBody = changeToRequiredFormat(data);
		// console.log('requestBody', requestBody);
		async function postData() {
			const response = await makeRequest('submit-feedback/PC', 'POST', requestBody)
			if (response?.status === 200) {
				document.getElementById('provide-pc-feedback-form').reset();
			}

		}
		postData();
	};

	return (
		<div className='provide-pc-feedback-main'>
			<div className='provide-pc-feedback-body'>
				<div className='provide-pc-feedback-body-form'>
					<h3 style={{ marginBottom: '20px' }}>
						Please provide your valuable feedback
					</h3>
					<Select
						options={getStudentOptions()}
						onChange={e => handleStudentChange(e)}
					/>
					<FormGenerator
						formObject={getFormObject()}
						onSubmit={onSubmit}
						formId='provide-pc-feedback-form'
						// heading='Please provide your valuable feedback'
					/>
				</div>
			</div>
		</div>
	);
}

export default ProvidePCFeedback;
