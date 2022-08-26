import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DisplayCard from '../../styleGuide/components/displayCard';
import SideNavLayout from '../../styleGuide/layout/sidenav';
import styles from "./Explore.module.css";
import axios from "axios";
import Spinner from "../../styleGuide/components/spinner";

function Explore() {
    const data = [
        {
            imageLink: "https://images.penguinrandomhouse.com/cover/700jpg/9780593211519",
            resourceName: "BREATH - The New Science of a Lost Art",
            universityName: "University of Cambridge",
            subscriberCount: "215",
            viewCount: "2.5k"
        },
        {
            imageLink: "https://images.penguinrandomhouse.com/cover/700jpg/9780593211519",
            resourceName: "BREATH - The New Science of a Lost Art",
            universityName: "University of Cambridge",
            subscriberCount: "215",
            viewCount: "2.5k"
        },
        {
            imageLink: "https://images.penguinrandomhouse.com/cover/700jpg/9780593211519",
            resourceName: "BREATH - The New Science of a Lost Art",
            universityName: "University of Cambridge",
            subscriberCount: "215",
            viewCount: "2.5k"
        }
    ]
    const [dataList, setDataList] = useState([]);
    useEffect(async () => {
        try {
            var config = {
                method: 'get',
                url: 'https://gentle-lowlands-02621.herokuapp.com/constents',
                headers: {
                    'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDI2MDUzMTdiNzZmNDJjODA2NjIwNyIsImlhdCI6MTY2MTEwMDExNn0.70C7CzNfye7xpct5KoLbuNEHWCzOIPEK-MDGs5cnnOI',
                    'type': 'institute'
                },
                data: data
            };

            const res = await axios(config);
            console.log(res.data);
            setDataList(res.data);

        } catch (err) {
            console.log(err)
        }

    }, []);

    return (
        <SideNavLayout
            activeTab="explore"
            pageHeader="Explore"
        >
            {dataList.length == 0 ?
                <div className={`${styles.spinner}`}>
                    <Spinner />
                </div>
                :
                <div className={`${styles.gridContainer}`}>
                    {dataList.map(function (d, idx) {
                        return (
                            <Link href={`/resource/${d._id}`}>
                                <div className={`${styles.gridItem}`}>
                                    <DisplayCard
                                        key={idx}
                                        cardType="resource"
                                        imgLink={d.thumbnail}
                                        cardName={d.name}
                                        universityName={d.intiId.name}
                                        subscriberCount={d.subscriberUser.length + d.subscriberInsti.length}
                                        viewCount={d.viewCount}
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            }


            {/* <div>
                <DisplayCard
                    // key={d.link}
                    cardType="resource"
                    imgLink="https://images.penguinrandomhouse.com/cover/700jpg/9780593211519"
                    cardName="BREATH - The New Science of a Lost Art"
                    universityName="University of Cambridge"
                    subscriberCount="215"
                    viewCount={"2.5k"}
                />
            </div> */}
        </SideNavLayout>

    )
}

export default Explore