import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { Children } from 'react';

function FormGenerator({
	formClass,
	onSubmit,
	formObject,
	isFeedbackForm,
	handleRemoveForm,
	formIndex,
	formId,
	heading
}) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
	});

	console.log('FORM OBJECT LENGTH: ' + formObject.length);
	return (
		<form
			key={formIndex}
			className={formClass}
			id={formId}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='form-div'>
				<h3>{heading}</h3>
				{isFeedbackForm && (
					<button onClick={handleRemoveForm} className='remove-feedback-form'>
						Remove
					</button>
				)}
			</div>
			{formObject?.map((formField, index) => {
				const inputKey = String(formField.inputKey);
				return formField.inputType === 'select' ? (
					<div key={index} className='form-div'>
						<label htmlFor={formField.inputKey}>
							{formField.label}

							{formField.required ? (
								<Controller
									name={formField.inputKey}
									control={control}
									rules={{ required: 'This field is required' }}
									render={({ field }) => (
										<Select
											name='tenantType'
											inputId='tenantType'
											options={formField.options}
											{...field}
										/>
									)}
								/>
							) : (
								<Controller
									name={formField.inputKey}
									control={control}
									render={({ field }) => (
										<Select
											name='tenantType'
											inputId='tenantType'
											options={formField.options}
											{...field}
										/>
									)}
								/>
							)}
						</label>
						<div className='form-validation-error'>
							{errors[formField.inputKey]?.message}
						</div>
					</div>
				) : formField.inputType === 'radio' ? (
					<div key={index} className='form-div'>
						<label htmlFor={formField.inputKey}>
							{formField.label}
							<div className="form-div-container">
							{formField.options.map((option, index) => (
								<div className='form-div-inner'>
									<input
										type='radio'
										value={`option_${index + 1}`}
										// name={formField.inputKey}
										id={`form${formIndex}-question${formField.inputKey}-option${index}`}
										{...register(inputKey, { required: formField.required })}
									/>
									<label
										key={index}
										htmlFor={`form${formIndex}-question${formField.inputKey}-option${index}`}
									>
										{option}
									</label>
								</div>
							))}
							</div>
							{/* {formField.required ? (
								<input
									type={formField.inputType}
									{...register(formField.inputKey, {
										required: 'This is a required field',
									})}
								/>
							) : (
								<input
									type={formField.inputType}
									{...register(formField.inputKey)}
								/>
							)} */}
						</label>
						<div className='form-validation-error'>
							{errors.inputKey?.message}
						</div>
					</div>
				) : formField.inputType === 'textarea' ? (
					<div key={index} className='form-div'>
						<label htmlFor={formField.inputKey}>
							{formField.label}
							<textarea
								name={formField.inputKey}
								id={formField.inputKey}
								{...register(formField.inputKey, {
									required: formField.required,
								})}
								cols='30'
								rows='10'
							></textarea>
						</label>
					</div>
				) : formField.inputType === 'file' ?(
					<div className="form-div"><label htmlFor={formField.inputKey}>{formField.label}<input type="file" required name={formField.inputKey} id={formField.inputKey} /></label></div>
				) :(
					<div key={index} className='form-div'>
						<label htmlFor={formField.inputKey}>
							{formField.label}
							{formField.required ? (
								<input
									type={formField.inputType}
									{...register(formField.inputKey, {
										required: 'This is a required field',
									})}
									id={formField.inputKey}
								/>
							) : (
								<input
									type={formField.inputType}
									{...register(formField.inputKey)}
									id={formField.inputKey}
								/>
							)}
						</label>
						<div className='form-validation-error'>
							{errors[formField.inputKey]?.message}
						</div>
					</div>
				);
			})}

			{/* {extraChild} */}
{/* <Children /> */}
			<div className='form-div'>
				<input type='submit' value='PROCEED' />
			</div>
		</form>
	);
}

export default FormGenerator;
