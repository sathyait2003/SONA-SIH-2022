import { useForm } from 'react-hook-form';
import axios from 'axios';
import { restUrl } from 'constants/endpoints';

function ChangePassword() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		console.log(data);
		try {
			axios
				.post(restUrl + '/change-password', data, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then(response => {
					console.log(response);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='change-password-main form-page-main-wrapper'>
			<form onSubmit={handleSubmit(onSubmit)} className='form-wrapper'>
				<div className='form-div'>
					<h1>Change Password</h1>
				</div>
				<div className='form-div'>
					<label htmlFor='old_password'>
						Please enter your old password
						<input
							type='text'
							name='old_password'
							id='old_password'
							{...register('old_password', {
								required: 'This is a required field',
							})}
						/>
					</label>
					<div className='form-validation-error'>
						{errors.old_password?.message}
					</div>
				</div>
				<div className='form-div'>
					<label htmlFor='new_password'>
						Please enter your new password
						<input
							type='text'
							name='new_password'
							id='new_password'
							{...register('new_password', {
								required: 'This is a required field',
							})}
						/>
					</label>
					<div className='form-validation-error'>
						{errors.new_password?.message}
					</div>
				</div>
				<div className='form-div'>
					<input type='submit' value='Proceed' />
				</div>
			</form>
		</div>
	);
}

export default ChangePassword;
