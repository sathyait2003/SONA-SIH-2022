import { Controller } from 'react-hook-form';
import Select from 'react-select';

function FormFieldGenerator({
	formObject,
	register,
	control,
	errors,
	formIndex,
}) {
	return (
		<>
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
											// name='tenantType'
											inputId='tenantType'
											options={formField.options}
											{...field}
										/>
									)}
								/>
							) : (
								<Controller
									name={`${formField.inputKey}${formIndex}`}
									control={control}
									render={({ field }) => (
										<Select
											name={`${formField.inputKey}${formIndex}`}
											inputId={`${formField.inputKey}${formIndex}`}
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
							{formField.options.map((option, index) => (
								<label
									key={index}
									htmlFor={`form${formIndex}-question${formField.inputKey}-option${index}`}
								>
									<input
										type='radio'
										value={option}
										// name={formField.inputKey}
										id={`form${formIndex}-question${formField.inputKey}-option${index}`}
										{...register(inputKey, { required: formField.required })}
									/>
									{option}
								</label>
							))}
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
				) : (
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
		</>
	);
}

export default FormFieldGenerator;
