import React from 'react'
import { FormGenerator } from 'components';
import { makeRequest } from 'services/api';
import { toast } from 'react-toastify';

function GrievancePortal() {

    const complaintOptions = ["college", "teacher"];

    const isCcOptions = ["true", "false"];
    

    const formObject = [
		{
			inputType: 'radio',
			inputKey: 'complaint_for',
			label: 'Complaint Regarding: ',
			required: true,
			options: complaintOptions,
		},
	
		{
			inputType: 'radio',
			inputKey: 'is_cc',
			label: 'Did you report this issue to your Class Coordinator ? : ',
			required: true,
			options: isCcOptions,
		},
        {
			inputType: 'text',
			inputKey: 'cc_response',
			label: 'If yes then what action was taken : ',
		},
        {
			inputType: 'text',
			inputKey: 'is_cc',
			label: 'Subject of your Application (max 50 words) : ',
			required: true,
		},
        {
			inputType: 'textarea',
			inputKey: 'description',
			label: 'Explain Issue (max 300 words) : ',
			required: true,
		},
	];
    const extra = (<h1>Hi</h1>)

    const onSubmit= (data) => {
        console.log('data');
        console.log(data)
        data = {...data, proof_file_id: 0}
        console.log(data)

        const response = makeRequest('submit-gc', 'POST',data);

        toast('Success', {type: 'success'})
    }

  return (
    <div className='grievancePortal'>
            <FormGenerator
				formClass='form-wrapper'
				formObject={formObject}
				heading = 'Please enter your details'
                onSubmit={onSubmit}
                // extraChild = {extra}
			/>
                {/* <h3>Hello</h3> */}
            {/* </FormGenerator> */}
    </div>
  )
}

export default GrievancePortal