import Head from 'next/head'
import { MoralisProvider } from "react-moralis";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <title>SabhyaServer</title>
        </Head>
        {/* everything inside next/head appears globally */}
        <MoralisProvider appId="fpWE8s0L7xJlxWvGFoPigHuor5m6racPnEKWZ5Y5" serverUrl="https://3zg6t8jupupr.usemoralis.com:2053/server">
        <Component {...pageProps} />
        </MoralisProvider>
    </>
}

export default MyApp
