import React from 'react';
import styles from './MultipleSelectButton.module.css';

function MultipleSelectButton({ text, selected }) {

    return (
        <div className={`${selected == "true" ? styles['selected'] : styles['btn']}`}>
            {text}
        </div>
    )
}

export default MultipleSelectButton;