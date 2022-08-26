import React, { useState } from 'react';
import styles from "./FloatingButton.module.css";

function FloatingButton(props) {
    return (
        <div className={`${styles.btn}`} style={{ width: "162px" }}>
            {props.btnText}
        </div>
    )
}

export default FloatingButton