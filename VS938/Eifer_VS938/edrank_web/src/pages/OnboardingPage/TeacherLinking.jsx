import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { restUrl } from 'constants/endpoints';
// import { useState } from 'react';
// import './LoginPage.scss';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tenantTypeKeyPairMap } from 'constants/tenantTypeKeyPairMap';
import { FormGenerator } from 'components';
import { makeRequest } from 'services/api';

export default function OnboardingPage() {
    let navigate = useNavigate();

    const formObject = [
        {
            inputType: 'select',
            inputKey: 'year',
            label: 'College Year : ',
            required: true,
            options: [
                { value: '1', label: 'Semi 2' },
            ],
        },
        {
            inputType: 'select',
            inputKey: 'college_type',
            label: 'College Type : ',
            required: true,
            options: [
                { value: 'BCA', label: 'BCA' },
               
            ],
        },
        {
            inputType: 'select',
            inputKey: 'teachers',
            label: 'Teachers : ',
            required: true,
            options: [
                { value: 'SEMI_GOVT', label: 'Semi Government' },``
            ],
        },
    ];


    const onSubmit = data => {
        console.log('data');
        // console.log(data);
        // const { email, password, tenantType } = data;
        // const requestBody = {
        // 	email: email,
        // 	password: password,
        // };

        // console.log(tenantTypeKeyPairMap['COLLEGE_ADMIN']);

        // async function postData() {
        // 	console.log('tenantType: 12345678', '99', tenantType.value);
        // 	const response = await makeRequest('login', 'POST', requestBody, {
        // 		'x-edrank-tenant-type': tenantType.value,
        // 	});
        // 	console.log('RESPONSE');
        // 	console.log(response);
        // 	localStorage.setItem('token', response.data.data.access_token);
        // 	localStorage.setItem('tenant_type', response.data.data.tenant_type);
        // 	localStorage.setItem('user_info', JSON.stringify(response.data.data.user))
        // 	console.log('tenant_type', response.data.data.tenant_type);
        // 	if (response.data.data.user.onboarding_status && response.data.data.user.onboarding_status === "ON_GOING") {
        // 		navigate(`/onboarding`);
        // 	} else {
        // 		navigate(`/${tenantTypeKeyPairMap[response.data.data.tenant_type]}`);
        // 	}

        // }
        // postData();
    };

    return (
        <div className='onboarding-page-main form-page-main-wrapper'>
            <FormGenerator
                formClass='form-wrapper'
                onSubmit={onSubmit}
                formObject={formObject}
                heading='Please enter college details'
            />
        </div>
    )
}