import { makeRequest } from 'services/api';
import { FormFieldGenerator, FormGenerator } from 'components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

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
		console.log(formObject);
		formObject = [
			{
				inputType: 'select',
				inputKey: 'teacher',
				label: 'Select Teacher',
				required: true,
				options: teachers,
			},
			...formObject,
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
			console.log('form removed' + index);
		} else {
			toast('You can not remove the last form', { type: 'info' });
		}
	};

	useEffect(() => {
		console.log('useEffect');
		async function fetchData() {
			const response = await makeRequest('feedback-questions/ST', 'GET');
			const response2 = await makeRequest('get-feedback-teachers', 'POST', {
				course_id: JSON.parse(localStorage.getItem('user_info')).course_id,
			});
			console.log(response?.data.data);
			console.log(response2?.data.data);
			setFeedbackQuestions(response?.data.data.questions);
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

	const onSubmit = data => {
		console.log('data');
		console.log(data);
	};

	const SubmitForms = e => {
		e.preventDefault();
		document.getElementById('feedback-form-0').submit();
		document.getElementById('feedback-form-1').submit();
	};

	return (
		<div className='feedback-form-page-main'>
			<h1 className='feedback-form-page-header'>
				Please provide your valuable feedback
			</h1>
			<div className='feedback-form-page-body'>
				{feedbackForms.map((form, i) => (
					// <FormGenerator
					// 	key={i}
					// 	formIndex={i}
					// 	formClass='feedback-form-wrapper'
					// 	formId={'feedback-form-' + i}
					// 	onSubmit={onSubmit}
					// 	formObject={getFormObject()}
					// 	handleRemoveForm={() => handleRemoveForm(i)}
					// 	isFeedbackForm={true}
					// />

					<form onSubmit={handleSubmit(onSubmit)}>
						<FormFieldGenerator
							formObject={getFormObject()}
							register={register}
							control={control}
							errors={errors}
							formIndex={i}
						/>
					</form>

					// <div>
					// 	<h3>Form {i + 1}</h3>
					// 	<button
					// 		onClick={() => handleRemoveForm(i)}
					// 		className='remove-feedback-form'
					// 	>
					// 		Remove
					// 	</button>
					// </div>
				))}
				<div className='form-div'>
					<button onClick={handleAddForm} className='add-feedback-form'>
						Add another form
					</button>
				</div>

				<div className='form-div'>
					<button onClick={SubmitForms}>SUBMIT</button>
				</div>
			</div>
		</div>
	);
}

export default FeedbackFormPage;
