import React, { useState, useCallback, } from 'react';
import { useEffect } from 'react';
import InputBox from '../../styleGuide/components/inputBox'
import SideNavLayout from '../../styleGuide/layout/sidenav';
import ImageDnD from '../../styleGuide/components/imageDnD';
import axios from "axios";
import { Icon } from '@iconify/react';
import styles from "./Settings.module.css";
import Spinner from '../../styleGuide/components/spinner';

function Settings() {
    const [state, setState] = useState({
        instituteName: "",
        instituteID: "",
        locationPin: "",
        subscriptionRate: null
    })

    useEffect(() => {
        // const token = window.localStorage.getItem("token");
        var axios = require('axios');
        var data = '';

        var config = {
            method: 'get',
            url: 'https://gentle-lowlands-02621.herokuapp.com/hei/profile',
            headers: {
                'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDI2MDUzMTdiNzZmNDJjODA2NjIwNyIsImlhdCI6MTY2MTEwMDExNn0.70C7CzNfye7xpct5KoLbuNEHWCzOIPEK-MDGs5cnnOI',
                'type': 'institute'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setState(prevState => ({
                    ...prevState,
                    instituteName: response.data.name,
                    instituteID: response.data.instiID,
                    locationPin: response.data.pin,
                    subscriptionRate: response.data.Wei
                }));
                setImgLink((response.data.img));
                console.log(state);
                console.log(imgLink);

            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(config);

    }, [])


    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [imgLink, setImgLink] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
        imageUpload(acceptedFiles[0]);
    }, []);

    const imageUpload = async (imgFile) => {
        try {
            if (imgFile) {
                const formInfo = new FormData();
                formInfo.append("file", imgFile);
                formInfo.append("upload_preset", "upload_img");
                formInfo.append("cloud_name", "sih-testing");

                const imgUploaded = await axios.post("https://api.cloudinary.com/v1_1/sih-testing/image/upload", formInfo)
                setImgLink(imgUploaded.data.url)
                console.log(imgLink)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <SideNavLayout
            activeTab="settings"
            pageHeader="Settings"
        >
            {
                state.instituteName === "" ?
                    <div className={`${styles.spinner}`}>
                        <Spinner />
                    </div>
                    :
                    <div className={`${styles.pageContent}`}>
                        <div className={`${styles.row}`}>
                            <InputBox
                                inputType="text"
                                label="Name of Institution"
                                value={state.instituteName}
                                name="instituteName"
                                width="60vw"
                                disabled="disabled"
                            />
                        </div>
                        <div className={`${styles.rowType2} ${styles.row}`}>
                            <div>
                                <InputBox
                                    inputType="text"
                                    label="Institute ID"
                                    value={state.instituteID}
                                    name="instituteID"
                                    width="29vw"
                                    disabled="disabled"
                                />
                            </div>
                            <div className={`${styles.secondInput}`}>
                                <InputBox
                                    inputType="text"
                                    label="Location PIN Code"
                                    value={state.locationPin}
                                    name="locationPin"
                                    width="29vw"
                                    disabled="disabled"
                                />
                            </div>
                        </div>
                        <div className={`${styles.row} ${styles.inputTailwind}`}>
                            {imgLink != null ?

                                (<div className='h-62 w-full rounded-lg mb-6'>
                                    <button type="button" onClick={() => { setImgLink(null) }} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <Icon icon="akar-icons:cross" />
                                    </button>
                                    <img src={imgLink} className="object-fill w-full h-62 rounded-lg" /> </div>)

                                : <ImageDnD onDrop={onDrop} accept={"image/*"} />
                            }
                        </div>

                        <div className={`${styles.rowType2} ${styles.row}`}>
                            <div>
                                <InputBox
                                    inputType="number"
                                    label="Subscription Rate"
                                    value={state.subscriptionRate}
                                    name="subscriptionRate"
                                    width="10vw"
                                    changeHandler={handleChange}
                                />
                            </div>
                            <div className={`${styles.secondInput}`}>WEI per month</div>
                        </div>
                    </div>


            }

        </SideNavLayout>
    )
}

export default Settings