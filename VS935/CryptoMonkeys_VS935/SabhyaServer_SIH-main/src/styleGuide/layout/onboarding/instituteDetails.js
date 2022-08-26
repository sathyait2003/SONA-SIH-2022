import React from 'react';
import InputBox from '../../components/inputBox';
import ImgDnD from '../../components/imageDnD'
import styles from "./Onboarding.module.css";

const InstituteDetails = ({ instituteName, changeHandler, instituteID, locationPIN, coverPhoto, subcriptionRate }) => {
    return (
        <div>
            <div className={`${styles.pageContent}`}>
                <div className={`${styles.pageText} `} style={{ marginLeft: "20vw" }}>
                    <b>Please enter the following details</b>
                </div>
                <div className={`${styles.row}`}>
                    <InputBox
                        inputType="text"
                        label="Name of Institution"
                        value={instituteName}
                        name="instituteName"
                        width="60vw"
                        changeHandler={changeHandler}
                    />
                </div>
                <div className={`${styles.rowType2} ${styles.row}`}>
                    <div>
                        <InputBox
                            inputType="text"
                            label="Institute ID"
                            value={instituteID}
                            name="instituteID"
                            width="29vw"
                            changeHandler={changeHandler}
                        />
                    </div>
                    <div className={`${styles.secondInput}`}>
                        <InputBox
                            inputType="text"
                            label="Location PIN Code"
                            value={locationPIN}
                            name="locationPIN"
                            width="29vw"
                            changeHandler={changeHandler}
                        />
                    </div>
                </div>
                <div className={`${styles.row} ${styles.image_form}`}>
                   <ImgDnD />
                </div>
                <div className={`${styles.rowType2} ${styles.row}`}>
                    <div>
                        <InputBox
                            inputType="number"
                            label="Subscription Rate"
                            value={subcriptionRate}
                            name="subscriptionRate"
                            width="10vw"
                            changeHandler={changeHandler}
                        />
                    </div>
                    <div className={`${styles.secondInputText}`}>WEI per month </div>
                </div>
            </div>
        </div>
    )
}

export default InstituteDetails