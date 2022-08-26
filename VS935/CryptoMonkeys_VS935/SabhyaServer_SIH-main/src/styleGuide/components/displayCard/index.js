import React from 'react';
import styles from "./DisplayCard.module.css";
import { Icon } from '@iconify/react';
import FloatingButton from '../floatingButton';


function DisplayCard({ displaySubscribeButton, cardType, imgLink, cardName, subscriptionRate, subscriberCount, resourceCount, universityName, viewCount }) {
    return (
        <div className={`${styles.instituteCard}`} >
            <div className={`${styles.image}`}>
                <img src={imgLink} />
            </div>
            <div className={`${styles.infoSection}`}>
                <div className={`${styles.instituteName}`}>{cardName}</div>
                <div className={`${styles.instituteInfo}`}>
                    {cardType == "institute" ?
                        <>
                            <div className={`${styles.info}`}>
                                <Icon icon="akar-icons:money" width="25" height="25" />
                                <div className={`${styles.infoText}`}>{subscriptionRate} WEI per month</div>
                            </div>
                            <div className={`${styles.info}`}>
                                <Icon icon="ant-design:user-outlined" width="25" height="25" />
                                <div className={`${styles.infoText}`}>{subscriberCount} subscribers</div>
                            </div>
                            <div className={`${styles.info}`}>
                                <Icon icon="ion:documents-outline" width="25" height="25" />
                                <div className={`${styles.infoText}`}>{resourceCount} resources</div>
                            </div>
                        </>
                        :
                        <>
                            <div className={`${styles.info}`}>
                                <Icon icon="uil:university" width="25" height="25" />
                                <div className={`${styles.infoText}`}>{universityName}</div>
                            </div>
                            <div className={`${styles.info}`}>
                                <Icon icon="ant-design:user-outlined" width="25" height="25" />
                                <div className={`${styles.infoText}`}>{subscriberCount} subscribers</div>
                            </div>
                            <div className={`${styles.info}`}>
                                <Icon icon="ant-design:eye-filled" width="25" height="25" />
                                <div className={`${styles.infoText}`}>{viewCount} views</div>
                            </div>
                        </>
                    }

                </div>
                {displaySubscribeButton == "1" ?
                    <div className={`${styles.subscribeButton}`}>
                        <FloatingButton
                            btnText="Subscribe"
                        />
                    </div>
                    :
                    <></>
                }

            </div>

        </div>
    )
}

export default DisplayCard;