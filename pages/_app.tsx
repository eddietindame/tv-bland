import React from 'react'
import App from 'next/app'

import '@/styles/index.scss'

class MyApp extends App<any, any> {
    render() {
        const { Component, router, pageProps } = this.props
        return <Component key={router.route} {...pageProps} />
    }
}

export default MyApp
