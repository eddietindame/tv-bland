import React from 'react'
import App from 'next/app'
import NProgress from 'next-nprogress/component'

import '@/styles/index.scss'

class MyApp extends App<any, any> {
    render() {
        const { Component, router, pageProps } = this.props

        return (
            <>
                <NProgress color="#000000" />
                <Component key={router.route} {...pageProps} />
            </>
        )
    }
}

export default MyApp
