import React from 'react';
import Image from 'next/image';
import styles from './Onboarding.module.css'

function PageOne({ accountTypeHandler, account }) {
    return (
        <div className={`${styles.pageOne}`}>
            <div>
                <Image src="/logo_large.svg" height="368" width="286" />
            </div>

            <div className={`${styles.vl}`}></div>

            <div className={`${styles.pageOneSecTwo}`}>

                <div className={`${styles.pageText}`}>Please choose an account type</div>
                <div className={`${styles.formDisplay}`}>
                    <div className={`${styles.formOption}`}>
                        <div className={`${styles.optionIcon} ${account == 'institute' ? styles['selected'] : ""}`}
                            onClick={() => { accountTypeHandler('institute'); }}>
                            <Image src="/institution_icon.svg" height="150" width="150" />
                        </div>
                        <div className={`${styles.pageText} ${account == 'institute' ? styles['selectedText'] : ""}`}>INSTITUTION</div>
                    </div>
                    <div className={`${styles.formOption}`}>
                        <div className={`${styles.optionIcon} ${account == 'user' ? styles['selected'] : ""}`}
                            onClick={() => { accountTypeHandler('user'); }}>
                            <Image src="/individual_icon.svg" height="150" width="150" />
                        </div>
                        <div className={`${styles.pageText} ${account == 'user' ? styles['selectedText'] : ""}`}>INDIVIDUAL</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageOne