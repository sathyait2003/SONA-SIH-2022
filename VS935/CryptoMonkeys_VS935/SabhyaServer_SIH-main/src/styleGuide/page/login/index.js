import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useMoralis } from "react-moralis";
import { Icon } from "@iconify/react"
import Navbar from '../../components/navBar';
import Welcome from '../../components/welcome';
import Spinner from '../../components/spinner'

import styles from "./Login.module.css"

const Login = () => {
    const router = useRouter();
    const { authenticate, authError, isAuthenticated } = useMoralis();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        } else {
            setLoaded(true);
        }
    }, []);

    return (
        <>
            <Navbar />
            <Welcome />
            <div className={`${styles.login_center}`}>

                {(!loaded) ? (<Spinner />) : (<button type="button" onClick={() => authenticate()} class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                    <Image src="/metamask_icon.svg" height={15} width={25} /> Connect with MetaMask
                </button>)}

                {authError ? (<div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                    <Icon icon="bi:info" />
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">{authError.name}</span> {authError.message}
                    </div>
                </div>) : (<div></div>)}

            </div>

        </>
    )
}

export default Login