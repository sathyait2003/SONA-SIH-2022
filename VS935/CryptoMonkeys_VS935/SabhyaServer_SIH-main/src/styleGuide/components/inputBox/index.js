import React from 'react';
import styles from "./InputBox.module.css";

function InputBox({ inputType, value, name, placeholder, width, label, changeHandler, disabled, height }) {
    const list = [
        "Ethics",
        "Machine Learning",
        "Deep Learning",
        "Artificial Intelligence",
        "DSA",
        "Business",
        "Science",
        "Cyoptography",
        "CS Fundamentals",
        "Web Dev",
        "App Dev",
        "Technology",
        "Others"
    ]
    return (
        <div>
            <label>
                <div className={`${styles.label} ${disabled == "disabled" ? styles['disabledText'] : ''}`}>{label}</div>
                <input
                    type={inputType}
                    name={name}
                    className={`${styles.inputField}`}
                    value={value}
                    placeholder={placeholder}
                    style={{ width: `${width}`, height: `${height}` }}
                    onChange={changeHandler}
                    disabled={disabled}
                    list={list}
                />
            </label>
        </div>
    )
}

export default InputBox