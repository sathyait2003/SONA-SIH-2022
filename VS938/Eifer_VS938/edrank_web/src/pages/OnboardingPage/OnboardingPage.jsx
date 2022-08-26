import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { restUrl } from 'constants/endpoints';
// import { useState } from 'react';
// import './LoginPage.scss';
// import axios from 'axios';
import {ThreeDots} from "react-loader-spinner"
import { useNavigate } from 'react-router-dom';
import { tenantTypeKeyPairMap } from 'constants/tenantTypeKeyPairMap';
import { FormGenerator } from 'components';
import { makeRequest } from 'services/api';

export default function OnboardingPage() {
    let navigate = useNavigate();

    const formObject = [
        {
            inputType: 'text',
            inputKey: 'collegname',
            label: 'College Name: ',
            required: true,
        },
        {
            inputType: 'email',
            inputKey: 'email',
            label: 'Email: ',
            required: true,
        },
        {
            inputType: 'tel',
            inputKey: 'mobileno',
            label: 'Mobile Number: ',
            required: true,
        },
        {
            inputType: 'text',
            inputKey: 'url',
            label: 'Website URL: ',
            required: true,
        },
        {
            inputType: 'text',
            inputKey: 'univ_name',
            label: 'University Name: ',
            required: true,
        },
        {
            inputType: 'text',
            inputKey: 'address',
            label: 'College Address : ',
            required: true,
        },
        {
            inputType: 'select',
            inputKey: 'college_type',
            label: 'College Type : ',
            required: true,
            options: [
                { value: 'SEMI_GOVT', label: 'Semi Government' },
                { value: 'GOVT', label: 'Government' },
                { value: 'PRIVATE', label: 'Private' },
            ],
        },
        {
            inputType: 'file',
            inputKey: 'file1',
            label: 'Student Onboarding File (.csv)'
        },
        {
            inputType: 'file',
            inputKey: 'file2',
            label: 'Teacher Onboarding File (.csv)'
        }

    ];


    const onSubmit = data => {
        console.log('data');
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
         />
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