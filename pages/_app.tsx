import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import NProgress from 'next-nprogress/component'

import { HOST, TITLE, DESC, KEY_WORDS } from '@/config'
import '@/styles/index.scss'

class MyApp extends App<any, any> {
    render() {
        const { Component, router, pageProps } = this.props

        return (
            <>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

                    <title>{TITLE}</title>
                    <link rel="icon" href="/favicon.ico" />

                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <meta name="referrer" content="always" />
                    <meta name="keywords" content={KEY_WORDS.join(' ')} />

                    <meta key="og:type" property="og:type" content="website" />
                    <meta
                        key="og:locale"
                        property="og:locale"
                        content="en_gb"
                    />
                    <meta key="og:title" property="og:title" content={TITLE} />
                    <meta
                        key="og:description"
                        property="og:description"
                        content={DESC}
                    />
                    <meta
                        key="og:site_name"
                        property="og:site_name"
                        content={TITLE}
                    />
                    <meta
                        key="og:image"
                        property="og:image"
                        content={`${HOST}/img/placeholder.jpg`}
                    />
                    <meta
                        key="og:image:type"
                        property="og:image:type"
                        content="image/jpeg"
                    />
                </Head>
                <NProgress color="#000000" />
                <Component key={router.route} {...pageProps} />
            </>
        )
    }
}

export default MyApp
