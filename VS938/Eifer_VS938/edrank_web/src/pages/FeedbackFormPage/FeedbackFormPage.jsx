import { makeRequest } from 'services/api';
import { FormFieldGenerator, FormGenerator } from 'components';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import "./FeedbackFormPage.scss"

function FeedbackFormPage() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
	});
	// const [questions, setQuestions] = useState([]);
	// useEffect(() => {
	// 	async function fetchData() {
	// 		console.log('FeedbackFormPage');
	// 		const response = await makeRequest('feedback-questions/ST', 'GET');
	// 		console.log('response');
	// 		console.log(response?.data.data.questions);
	// 		setQuestions(response?.data.data.questions);
	// 	}
	// 	fetchData();
	// }, []);

	const [teachers, setteachers] = useState([]);
	const [feedbackQuestions, setFeedbackQuestions] = useState([]);
	const [driveId, setDriveId] = useState(0);
	// const [teacherId, setTeacherId] = useState(0);

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
				required: false,
				options: getRadioOptions(question),
			});
		});
		// console.log(formObject);
		formObject = [
			{
				inputType: 'select',
				inputKey: 'teacher',
				label: 'Select Teacher',
				required: false,
				options: teachers,
			},
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

	let formObjectArray = getFormObject();
	// const [driveid, setDriveId] = useState('1');

	const [feedbackForms, setFeedbackForms] = useState(formObjectArray);

	const handleAddForm = () => {
		// if (feedbackForms.length < teachers.length) {
		setFeedbackForms([...feedbackForms, feedbackForms.length + 1]);
		// } else {
		// toast('You can only add ' + teachers.length + ' forms', {
		// type: 'info',
		// });
		// }
	};
	const handleRemoveForm = index => {
		if (feedbackForms.length > 1) {
			setFeedbackForms(feedbackForms.filter((_, i) => i !== index));
			// console.log('form removed' + index);
		} else {
			toast('You can not remove the last form', { type: 'info' });
		}
	};

	useEffect(() => {
		// console.log('useEffect');
		async function fetchData() {
			const response = await makeRequest('feedback-questions/ST', 'POST');
			const response2 = await makeRequest('get-feedback-teachers', 'POST', {
				course_id: JSON.parse(localStorage.getItem('user_info')).course_id,
			});
			// console.log(response?.data.data);
			// console.log(response2?.data.data);
			setFeedbackQuestions(response?.data.data.questions);
			setDriveId(response?.data.data.drive_id);
			let teachersOpts = [];
			response2.data.data.teachers.forEach(t => {
				teachersOpts.push({
					value: t.id,
					label: t.name,
				});
			});
			setteachers(teachersOpts);
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
		let teacherId = data.teacher.value;
		// setTeacherId(data.teacher.value);
		questionIds.pop();
		// console.log('questionIds', questionIds);
		let questionIdsArray = [];
		questionIds.map(questionId => questionIdsArray.push(Number(questionId)));
		// console.log('questionIdsArray', questionIdsArray);

		let optionIds = Object.values(data);
		optionIds.pop();
		// console.log('OPTIONIDs');
		// console.log(optionIds);
		let optionIdsArray = [];
		optionIds.map(option => optionIdsArray.push(Number(option.slice(-1))));
		// console.log(optionIdsArray);

		const requestBody = {
			drive_id: driveId,
			teacher_id: teacherId,
			feedback: {
				mcq: createMcqResponse(questionIdsArray, optionIdsArray),
				text_feedback: data.text_feedback,
			},
		};
		// console.log('requestBody', JSON.stringify(requestBody));
		return requestBody;
		// console.log(requestBody);
	};
	const onSubmit = data => {
		// console.log('data');
		// console.log(data);

		const requestBody = changeToRequiredFormat(data);
		// console.log('requestBody');
		async function postData() {
			// console.log(requestBody);
			const response = await makeRequest(
				'android/submit-feedback/ST',
				'POST',
				requestBody,
			);
			toast('Feedback submitted successfully', { type: 'success' });
		}
		postData();
	};

	// const SubmitForms = e => {
	// 	e.preventDefault();
	// 	document.getElementById('feedback-form-0').submit();
	// 	document.getElementById('feedback-form-1').submit();
	// };

	return (
		<div className='feedback-form-page-main'>
			<p className="formHeading">{'Hi, ' + JSON.parse(localStorage.getItem('user_info')).name}</p>
			{/* <p className='formHeading'>Hi Rishi Dholkheria</p> */}
			<p className='formSubHeading'>Provide your true feedbacks for College and Teachers. Your feedback are anonymous and safe with us</p>
			<div class='hLine'></div>
			{/* <p className='formSubHeading'>We are happy to have your Feedback</p> */}
			<FormGenerator formObject={getFormObject()} onSubmit={onSubmit} />
		</div>
	);

	// return (
	// 	<div className='feedback-form-page-main'>
	// 		<h1 className='feedback-form-page-header'>
	// 			Please provide your valuable feedback
	// 		</h1>
	// 		<form id='feedback-form-1' onSubmit={handleSubmit(onSubmit)}>
	// 			<div className='feedback-form-page-body'>
	// 				{/* {feedbackForms.map((form, i) => (
	// 					<Fragment key={i}>
	// 						{/* <FormGenerator
	// 						key={i}
	// 						formIndex={i}
	// 						formClass='feedback-form-wrapper'
	// 						formId={'feedback-form-' + i}
	// 						onSubmit={onSubmit}
	// 						formObject={getFormObject()}
	// 						handleRemoveForm={() => handleRemoveForm(i)}
	// 						isFeedbackForm={true}
	// 						formRegister={'register' + i}
	// 						formControl={'control' + i}
	// 						formErrors={'errors' + i}
	// 						formHandleSubmit={'handleSubmit' + i}
	// 					/> */}

	// 						{/* <FormFieldGenerator
	// 							formObject={getFormObject()}
	// 							register={register}
	// 							control={control}
	// 							errors={errors}
	// 							formIndex={i}
	// 						/>

	// 						<div>
	// 							<h3>Form {i + 1}</h3>
	// 							<button
	// 								onClick={() => handleRemoveForm(i)}
	// 								className='remove-feedback-form'
	// 							>
	// 								Remove
	// 							</button>
	// 						</div>
	// 					</Fragment> */}
	// 				{/* ))} */}
	// 				<FormGenerator
	// 					// key={i}
	// 					// formIndex={i}
	// 					formClass='feedback-form-wrapper'
	// 					// formId={'feedback-form-' + i}
	// 					onSubmit={onSubmit}
	// 					formObject={getFormObject()}
	// 					// handleRemoveForm={() => handleRemoveForm(i)}
	// 					// isFeedbackForm={true}
	// 					// formRegister={'register' + i}
	// 					// formControl={'control' + i}
	// 					// formErrors={'errors' + i}

	// 					// formHandleSubmit={'handleSubmit' + i}
	// 				/>
	// 				{/* <div className='form-div'>
	// 					<button onClick={handleAddForm} className='add-feedback-form'>
	// 						Add another form
	// 					</button>
	// 				</div> */}

	// 				{/* <div className='form-div'>
	// 					<button onClick={e => SubmitForms(e)}>SUBMIT</button>
	// 				</div> */}
	// 			</div>
	// 			{/* <div className='form-div'>
	// 				<input type='submit' value='SUBMITTTT' />
	// 			</div> */}
	// 		</form>
	// 	</div>
	// );
}

export default FeedbackFormPage;
