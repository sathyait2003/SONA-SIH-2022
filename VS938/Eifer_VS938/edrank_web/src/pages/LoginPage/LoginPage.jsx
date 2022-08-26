import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { restUrl } from 'constants/endpoints';
// import { useState } from 'react';
import './LoginPage.scss';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tenantTypeKeyPairMap } from 'constants/tenantTypeKeyPairMap';
import { FormGenerator } from 'components';
import { makeRequest } from 'services/api';

export default function LoginPage() {
	// const [tenantType, setTenantType] = useState(null);
	let navigate = useNavigate();
	// const {
	// 	register,
	// 	handleSubmit,
	// 	control,
	// 	formState: { errors },
	// } = useForm();

	const onSubmit = data => {
		console.log('data');
		console.log(data);
		const { email, password, tenantType } = data;
		const requestBody = {
			email: email,
			password: password,
		};

		console.log(tenantTypeKeyPairMap['COLLEGE_ADMIN']);

		async function postData() {
			console.log('tenantType: 12345678', '99', tenantType.value);
			const response = await makeRequest('login', 'POST', requestBody, {
				'x-edrank-tenant-type': tenantType.value,
			});
			console.log('RESPONSE');
			console.log(response);
			localStorage.setItem('token', response.data.data.access_token);
			localStorage.setItem('tenant_type', response.data.data.tenant_type);
			localStorage.setItem('user_info', JSON.stringify(response.data.data.user))
			console.log('tenant_type', response.data.data.tenant_type);
			// if (response.data.data.user.onboarding_status && response.data.data.user.onboarding_status === "ON_GOING") {
			// 	navigate(`/onboarding`);
			// } else {
			// }
			navigate(`/${tenantTypeKeyPairMap[response.data.data.tenant_type]}`);
			
		}
		postData();
	};

	const loginOptions = [
		{ value: 'STUDENT', label: 'Student' },
		{ value: 'TEACHER', label: 'Teacher' },
		{ value: 'PARENT', label: 'Parent' },
		{ value: 'COLLEGE_ADMIN', label: 'College Admin' },
		// { value: 'HEI', label: 'Regulator' },
		{ value: 'SUPER_ADMIN', label: 'Regulator' },
	];

	const formObject = [
		{
			inputType: 'email',
			inputKey: 'email',
			label: 'Email: ',
			required: true,
		},
		{
			inputType: 'password',
			inputKey: 'password',
			label: 'Password: ',
			required: true,
		},
		{
			inputType: 'select',
			inputKey: 'tenantType',
			label: 'Login as: ',
			required: true,
			options: loginOptions,
		},
	];

	return (
		<div className='login-page-main form-page-main-wrapper'>
			<FormGenerator
				formClass='form-wrapper'
				onSubmit={onSubmit}
				formObject={formObject}
				heading = 'Edrank Login'
			/>
			{/* <form className='form-wrapper' onSubmit={handleSubmit(onSubmit)}>
				<div className='form-div'>
					<h1>Enter you details</h1>
				</div>
				<div className='form-div'>
					<label htmlFor='email'>
						Email
						<input
							type='email'
							name='email'
							id='email'
							{...register('email', {
								required: 'This is a required field',
							})}
						/>
					</label>
					<div className='form-validation-error'>{errors.email?.message}</div>
				</div>
				<div className='form-div'>
					<label htmlFor='password'>
						Password
						<input
							type='password'
							name='password'
							id='password'
							{...register('password', {
								required: 'This is a required field',
							})}
						/>
						<div className='form-validation-error'>
							{errors.password?.message}
						</div>
					</label>
				</div>
				<div className='form-div'>
					<label htmlFor='loginAs'>
						Login as:
						<Controller
							name='tenantType'
							control={control}
							rules={{ required: 'This field is required' }}
							render={({ field }) => (
								<Select
									name='tenantType'
									inputId='tenantType'
									options={loginOptions}
									{...field}
								/>
							)}
						/>
						<div className='form-validation-error'>
							{errors.tenantType?.message}
						</div>
					</label>
				</div>
				<div className='form-div'>
					<input type='submit' value='Proceed' />
				</div>
			</form> */}
		</div>
	);
}
