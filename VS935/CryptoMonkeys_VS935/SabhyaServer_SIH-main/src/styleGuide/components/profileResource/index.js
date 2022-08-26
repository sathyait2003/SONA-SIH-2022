import React from 'react'
import styles from "./ProfileResourceCard.module.css";
import { Icon } from "@iconify/react";

const Resources = ({ key, imgLink, cardName, viewCount, hash }) => {
    return (
        <div className={`${styles.card}`}>
            <div className={`${styles.thumbnail}`}>
                <img src={imgLink} />
            </div>
            <div className={`${styles.fileInfo}`}>
                <div className={`${styles.fileName}`}>{cardName}</div>
                <div className={`${styles.views}`}>
                    <div><Icon icon={"ant-design:eye-filled"} height="30" width="30" /></div>
                    {viewCount} views
                </div>
            </div>

        </div>
    )
}

export default Resources