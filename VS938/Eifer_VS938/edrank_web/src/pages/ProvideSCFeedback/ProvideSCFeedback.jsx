// import { FormFieldGenerator } from 'components';
// import { makeRequest } from 'services/api';
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// function ProvideSCFeedback() {
// 	const {
// 		register,
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();
// 	const [feedbackQuestions, setFeedbackQuestions] = useState([]);

// 	const getRadioOptions = question => {
// 		let optionsArray = [];
// 		let index = 1;
// 		for (index = 1; index <= 5; index++) {
// 			optionsArray.push(question?.['option_' + index]);
// 		}
// 		return optionsArray;
// 	};

// 	const getFormObject = () => {
// 		let formObject = [];
// 		feedbackQuestions.forEach(question => {
// 			formObject.push({
// 				inputType: 'radio',
// 				inputKey: question.id,
// 				label: question.title,
// 				required: false,
// 				options: getRadioOptions(question),
// 			});
// 		});
// 		console.log(formObject);
// 		// formObject = [
// 		// 	{
// 		// 		inputType: 'select',
// 		// 		inputKey: 'teacher',
// 		// 		label: 'Select Teacher',
// 		// 		required: false,
// 		// 		options: teachers,
// 		// 	},
// 		// 	...formObject,
// 		// ];

// 		return formObject;
// 	};

// 	useEffect(() => {
// 		async function fetchData() {
// 			const response = await makeRequest('feedback-questions/ST', 'GET');
// 			setFeedbackQuestions(response?.data.data.questions);
// 		}
// 		fetchData();
// 	}, []);

// 	const onSubmit = data => {
// 		console.log(data);
// 	};

// 	return (
// 		<div className='provide-sc-feedback-main'>
// 			<h1 className='provide-sc-feedback-header'>
// 				Please provide your valuable feedback
// 			</h1>
// 			<div className='provide-sc-feedback-body'>
// 				<div className='provide-sc-feedback-body-form'>
// 					<form id='feedback-form-1' onSubmit={handleSubmit(onSubmit)}>
// 						<FormFieldGenerator
// 							formObject={getFormObject()}
// 							register={register}
// 							control={control}
// 							errors={errors}
// 							formIndex={0}
// 						/>
// 						<input type='submit' value='SUBMITTTT' />
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ProvideSCFeedback;
