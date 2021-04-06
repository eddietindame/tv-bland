import Head from 'next/head'
import { useTrail, animated } from '@react-spring/web'

import { HOST } from '@/config'
import ShowList from '@/components/ShowList'
import Footer from '@/components/Footer'

export const Home = (): JSX.Element => {
    const fadeTrail = useTrail(3, {
        from: { opacity: 0 },
        opacity: 1
    })

    return (
        <>
            <Head>
                <link rel="canonical" href={HOST} />
                <meta key="og:url" property="og:url" content={HOST} />
            </Head>

            <section className="home-layout-top">
                <div className="home-layout-top__inner">
                    <animated.h1
                        className="home-layout-top__heading"
                        style={fadeTrail[0]}
                    >
                        TV Bland
                    </animated.h1>
                    <animated.p
                        className="home-layout-top__blurb"
                        style={fadeTrail[1]}
                    >
                        TV Show and web series database.
                        <br />
                        Create personalised schedules. Episode guide, cast, crew
                        and character information.
                    </animated.p>
                </div>
            </section>

            <animated.section
                className="home-layout-bottom"
                style={fadeTrail[2]}
            >
                <div className="home-layout-bottom__inner">
                    <h2 className="home-layout-bottom__heading">
                        Last Added Shows
                    </h2>
                    <ShowList />
                </div>
            </animated.section>

            <Footer />
        </>
    )
}

export default Home
