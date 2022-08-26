import React from 'react'
import styles from "../../layout/profile/Profile.module.css";

const Dashboard = () => {
    return (
        <div className={styles.sec_body}>
            <div className={styles.item} style={{ backgroundColor: '#62B6CB' }}>
                <div className={styles.item_high}>Subscription fee</div>
                <div className={styles.item_low}>
                    <span>Rs. 250</span>
                    per month
                </div>
            </div>

            <div className={styles.item} style={{ backgroundColor: '#5FA8D3' }}>
                <div className={styles.item_high}>Total Monthly Income</div>
                <div className={styles.item_low}>
                    <span>Rs. 2,36,057</span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard