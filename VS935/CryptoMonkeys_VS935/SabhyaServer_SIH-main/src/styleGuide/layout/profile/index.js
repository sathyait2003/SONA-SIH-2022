import React, { useState } from 'react'
import Dashboard from '../../components/dashboard';
import styles from "./Profile.module.css";
import Resources from '../../components/profileResource';
import LoaderButton from '../../components/loaderButton';
import Link from 'next/link';

const ProfileLayout = ({ amount, imgLink, resources, subscribers, universityName, displaySubscribeButton, contractAddress, heiData }) => {
    const [active, setActive] = useState("Software");
    console.log(heiData);
    return (
        <div>
            <div className={styles.container}>
                <img src={imgLink} alt="" />
                <div className={styles.img_overlay}>
                    <div className={styles.item_col}>
                        <div className={styles.item_num}>{resources}</div>
                        <div className={styles.item_small}>Resources</div>
                    </div>
                    <div className={styles.item_col}>
                        <div className={styles.item_num}>{subscribers}</div>
                        <div className={styles.item_small}>Subscribers</div>
                    </div>
                    <div className={styles.item_col}>
                        <div className={styles.item_num}>23</div>
                        <div className={styles.item_small}>Resources</div>
                    </div>
                </div>
                <div className={styles.col_name}>{universityName}</div>
            </div>
            {displaySubscribeButton == "1" ?
                <div className={`${styles.subscribeBtn}`}>
                    <LoaderButton
                        btnText={`Subscribe @ ${amount} WEI per month`}
                        width="60vw"
                        contractAddress={contractAddress}
                        amount={amount}
                    />
                </div>
                : <></>
            }

            <section className={styles.main_sec}>
                <div className={styles.sec_header}>
                    <div className={`${styles.item} ${active === "Software" ? styles.active : ""}`} onClick={() => setActive("Software")}>Software</div>
                    <div className={`${styles.item} ${active === "Hardware" ? styles.active : ""}`} onClick={() => setActive("Hardware")}>Hardware</div>
                </div>

                {active === "Hardware" && <Dashboard />}
                {active === "Software" && heiData &&
                    <div className={`${styles.gridContainer}`}>
                        {heiData.map(function (d, idx) {
                            return (
                                <Link href={`/resource/${d._id}`}>
                                    <div className={`${styles.gridItem}`}>
                                        <Resources
                                            key={d.link}
                                            imgLink={d.thumbnail}
                                            cardName={d.name}
                                            viewCount={d.viewCount}
                                            hash={d.file}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                }
            </section>
        </div>
    )
}

export default ProfileLayout