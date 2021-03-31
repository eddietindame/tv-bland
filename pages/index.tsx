import Head from 'next/head'

import ShowList from '@/components/ShowList'

export const Home = (): JSX.Element => {
    return (
        <div className="container-fluid">
            <Head>
                <title>TV Bland</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>TV Bland</h1>
            <p>TV Show and web series database.</p>
            <p>
                Create personalised schedules. Episode guide, cast, crew and
                character information.
            </p>

            <h2>Last Added Shows</h2>
            <ShowList />
        </div>
    )
}

export default Home
