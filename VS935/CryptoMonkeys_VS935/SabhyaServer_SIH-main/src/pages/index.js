import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useMoralis } from "react-moralis";
import axios from "axios";
// import hei from '../../ethereum/hei';
import SideNavLayout from '../styleGuide/layout/sidenav';
import Link from 'next/link';
import DisplayCard from '../styleGuide/components/displayCard';
import styles from "./index.module.css";
import Spinner from "../styleGuide/components/spinner";

const Home = (props) => {
    const router = useRouter();
    const { isAuthenticated } = useMoralis();

    // useEffect(() => {
    //     if (!isAuthenticated || window.localStorage.getItem("token") == null || window.localStorage.getItem("token").length == 0) {
    //         router.push('/login')
    //     }
    // }, []);
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, []);


    const data = props.campaigns.map(
        heiData => {
            console.log(`hei/${heiData.hash}`);
            return {
                id: heiData._id,
                link: `hei/${heiData.hash}`,
                imageLink: heiData.img.length == 0 ? "https://qph.cf2.quoracdn.net/main-qimg-d46f4d8813a9553d2cdc13f8a98d0aaf.webp" : heiData.img,
                instituteName: heiData.name,
                subscriptionRate: heiData.Wei,
                subscriberCount: heiData.subscriberUser.length + heiData.subscriptionInsti.length,
                resourceCount: "12"

            }
        }
    );

    function onClickHandler(link, id, name, imgLink) {
        router.push({
            pathname: link,
            query: {
                id: id,
                name: name,
                imgLink: imgLink
            },

        });
    }
    // console.log(props.campaigns, "data data");


    return (
        <>
            <SideNavLayout
                activeTab="home"
                pageHeader="Home"

            // userAddress={isAuthenticated ? user.attributes.ethAddress : ""}
            >
                {
                    (!props.campaigns) ?
                        <div className={`${styles.spinner}`}>
                            <Spinner />
                        </div>
                        :
                        <div className={`${styles.gridContainer}`}>
                            {data.map(function (d, idx) {
                                return (
                                    <div href={d.link} onClick={() => onClickHandler(d.link, d.id, d.instituteName, d.imageLink)}>
                                        <div className={`${styles.gridItem}`}>
                                            <DisplayCard
                                                key={d.link}
                                                cardType="institute"
                                                imgLink={d.imageLink}
                                                cardName={d.instituteName}
                                                subscriptionRate={d.subscriptionRate}
                                                subscriberCount={d.subscriberCount}
                                                resourceCount={d.resourceCount}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                }

            </SideNavLayout>
        </>
    )


}


export async function getStaticProps() {
    // Pre defind by next js which it calls whle pre-rendering
    //static re-rendering
    // use for api or read files
    //Data Could be outDated without revalidate so if we set revalidate:10 then we could revalidate data after 10 second
    var config = {
        method: 'get',
        url: 'https://gentle-lowlands-02621.herokuapp.com/institutes',
        headers: {
            'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDI2MDUzMTdiNzZmNDJjODA2NjIwNyIsImlhdCI6MTY2MTEwMDExNn0.70C7CzNfye7xpct5KoLbuNEHWCzOIPEK-MDGs5cnnOI',
            'type': 'institute'
        },
    };

    const res = await axios(config);
    // const HeiList = await hei.methods.getResources().call();
    const HeiData = await axios(config);
    // console.log(HeiList);

    return {
        props: {
            campaigns: HeiData.data
        },
        revalidate: 10
    }

}

export default Home;
