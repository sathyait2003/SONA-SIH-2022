import React from 'react';
import styles from './SideNav.module.css';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

function SideNav({ activeTab, userAddr, userName, imgLink }) {

    return (<div className={`${styles.sideNavLayout}`}>
        <div className={`${styles.sideNav}`}>
            <div className={`${styles.profileInfo}`}>
                <div className={`${styles.coverPhoto}`}>
                    <img
                        src={imgLink}
                        alt="Cover Photo" />
                </div>
                <div className={`${styles.regularSmBlack}`}>
                    {userName}
                </div>
            </div>
            <div className={`${styles.navigationTabs}`}>
                <Link href="/explore">
                    <a>
                        <div className={`${activeTab === "explore" ? styles['active'] : ""} ${styles.regularMGrey} ${styles.tab}`}>
                            <div className={`${styles.tabIcon}`}>
                                <Icon icon="ic:outline-travel-explore" width="30" height="30" />
                            </div>
                            <div>Explore</div>
                        </div>
                    </a>
                </Link>

                <Link href="/">
                    <a>
                        <div className={`${activeTab === "home" ? styles['active'] : ""} ${styles.regularMGrey} ${styles.tab}`}>
                            <div className={`${styles.tabIcon}`}>
                                <Icon icon="ant-design:home-filled" width="30" height="30" />
                            </div>
                            <div>Home</div>
                        </div>
                    </a>
                </Link>

                <Link href="/hei/0x2337cB6278CC4ACf7027597665481f0D157D007b/new">
                    <a>
                        <div className={`${styles.addButton}`}>
                            {activeTab == "newResource" ?
                                <Image src="/addButton_active.svg" height="70" width="70" />
                                :
                                <Image src="/addButton_inactive.svg" height="70" width="70" />
                            }

                        </div>
                    </a>
                </Link>

                <Link href="/profile">
                    <a>
                        <div className={`${activeTab === "profile" ? styles['active'] : ""} ${styles.regularMGrey} ${styles.tab}`}>
                            <div className={`${styles.tabIcon}`}><Icon icon="carbon:user-avatar-filled-alt" width="30" height="30" /> </div>
                            <div>Profile</div>
                        </div>
                    </a>
                </Link>

                <Link href="/settings">
                    <a>
                        <div className={` ${activeTab === "settings" ? styles['active'] : ""} ${styles.regularMGrey} ${styles.tab}`}>
                            <div className={`${styles.tabIcon}`}><Icon icon="ci:settings-filled" width="30" height="30" /> </div>
                            <div>Settings</div>
                        </div>
                    </a>
                </Link>
            </div>
            <div className={`${styles.logo}`}>
                <Link href="/">
                    <Image src="/logo.svg" height="50" width="128" />
                </Link>
            </div>
        </div>
        {activeTab == "newResource" ?
            <div className={`${styles.blueVertical}`}></div>
            :
            <></>
        }
    </div>
    )
}

export default SideNav;