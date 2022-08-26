import React from 'react';
import MultipleSelectButton from '../../components/multipleSelectButton';
import styles from "./Onboarding.module.css";

function PageTwo({ interestList, interestToggler, shrink }) {

    const interests = [
        "Ethics",
        "Machine Learning",
        "Deep Learning",
        "AI",
        "DSA",
        "Business",
        "Science",
        "Cryptography",
        "CS Fundamentals",
        "Web Dev",
        "App Dev",
        "Technology",
        "Others"
    ]
    return (
        <div className={`${styles.pageTwo}`}>
            {shrink == "1" ?
                <></>
                :
                <div className={`${styles.pageText} `}>
                    <b>Pick the subjects that suit your interests (any 5)</b>
                </div>

            }



            <div className={`${shrink == "1" ? styles['shrunkGridContainer'] : styles['gridContainer']}`}>
                {interests.map(function (i, idx) {
                    return (

                        <div
                            onClick={() => interestToggler(i)}
                            className={`${shrink == "1" ? styles['shrunkGridItem'] : styles['gridItem']}`}
                            key={idx}
                        >
                            <MultipleSelectButton
                                text={i}
                                selected={`${interestList.indexOf(i) == -1 ? false : true}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PageTwo