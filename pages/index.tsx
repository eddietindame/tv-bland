import Head from 'next/head'
import Image from 'next/image'

export const Home = (): JSX.Element => (
    <div className="container">
        <Head>
            <title>TV Bland</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>TV Bland</h1>
        <Image src="/tv.svg" alt="TV Bland Logo" height={'512'} width={'512'} />
    </div>
)

export default Home
