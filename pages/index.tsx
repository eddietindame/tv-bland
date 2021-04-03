import Head from 'next/head'

import ShowList from '@/components/ShowList'

export const Home = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>TV Bland</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="home-layout-top bg">
                <div className="home-layout-top__inner">
                    <h1 className="home-layout-top__heading">TV Bland</h1>
                    <p className="home-layout-top__blurb">
                        TV Show and web series database.
                        <br />
                        Create personalised schedules. Episode guide, cast, crew
                        and character information.
                    </p>
                </div>
            </section>

            <section className="home-layout-bottom">
                <div className="home-layout-bottom__inner">
                    <h2 className="home-layout-bottom__heading">
                        Last Added Shows
                    </h2>
                    <ShowList />
                </div>
            </section>

            <footer>
                <div className="grid-container text-center">
                    &copy; TV Bland {new Date().getFullYear()} |{' '}
                    <a href="#">Cookies</a> | <a href="#">Privacy</a>
                </div>
            </footer>
        </>
    )
}

export default Home
