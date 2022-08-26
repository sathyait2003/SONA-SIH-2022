import SideNav from "../../components/sideNav";
import styles from "./SideNavLayout.module.css";
import react, { useEffect, useState } from "react";
import axios from 'axios';

const SideNavLayout = (props) => {

    const [instituteName, setInstituteName] = useState("");
    const [instituteImg, setInstituteImg] = useState(null);
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        var axios = require('axios');
        var data = '';

        var config = {
            method: 'get',
            url: 'https://gentle-lowlands-02621.herokuapp.com/hei/profile',
            headers: {
                'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDI2MDUzMTdiNzZmNDJjODA2NjIwNyIsImlhdCI6MTY2MTEwMDExNn0.70C7CzNfye7xpct5KoLbuNEHWCzOIPEK-MDGs5cnnOI',
                'type': 'institute'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                setInstituteName((response.data.name))
                setInstituteImg((response.data.img));
                setUserAddress((response.data.hash))
                console.log(instituteName);
                console.log(instituteImg);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(config);
    }, []);
    return (
        <div className={`${styles.page}`}>

            <SideNav
                activeTab={props.activeTab}
                userAddr={userAddress}
                userName={instituteName}
                imgLink={instituteImg}
            />

            <div className={`${styles.screen}`} >
                <div className={`${styles.pageHeader}`}>{props.pageHeader}</div>
                {props.children}
            </div>

        </div>
    )
}
export default SideNavLayout;