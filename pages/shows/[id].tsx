import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'

import { getShowWithCastById, formatSchedule } from '@/helpers/tvmaze'
import { ShowWithCast } from '@/typings/tvmaze'
import StarRating from '@/components/StarRating'
import ItemList from '@/components/ItemList'
import Footer from '@/components/Footer'

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps<{ show: ShowWithCast }> = async ({
    params
}) => {
    const id = typeof params.id === 'string' ? params.id : params.id[0]

    if (!id.match(/^[0-9]+$/)) return { notFound: true }

    try {
        const show = await getShowWithCastById(parseInt(id))
        return show ? { props: { show } } : { notFound: true }
    } catch (error) {
        console.error(error)
        return { notFound: true }
    }
}

export const ShowPage = ({
    show
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { isFallback } = useRouter()
    const HOST = 'http://localhost:3000'

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

                <title>Fetching show... | TV Bland</title>
                <link rel="icon" href="/favicon.ico" />

                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <meta name="referrer" content="always" />
                <meta
                    name="keywords"
                    content="tv bland maze tvmaze television show shows series web"
                />

                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_gb" />
                <meta property="og:title" content="TV Bland" />
                <meta
                    property="og:description"
                    content="Get info on your favourite TV shows!"
                />
                <meta property="og:site_name" content="TV Bland" />
            </Head>

            {show && (
                <Head>
                    <title>{show.name} | TV Bland</title>
                    <meta
                        name="description"
                        content={`TV Bland page for ${show.name}`}
                    />
                    <link rel="canonical" href={HOST} />

                    <meta
                        property="og:url"
                        content={`${HOST}/shows/${show.id}`}
                    />
                    <meta
                        property="og:title"
                        content={show.name + ' | TV Bland'}
                    />
                    <meta
                        property="og:description"
                        content={`TV Bland page for information on ${show.name}`}
                    />
                    <meta property="og:image" content={show.image.original} />
                    <meta property="og:image:type" content="image/jpeg" />
                </Head>
            )}

            <section className="show-layout-top bg">
                <div className="show-layout-top__inner">
                    <h1 className="show-layout-top__heading">
                        <Link href="/">
                            <a className="show-layout-top__heading__anchor">
                                TV Bland
                            </a>
                        </Link>
                    </h1>

                    <div className="grid-row">
                        <div className="show-layout-top__image-wrap">
                            {isFallback ? (
                                <div className="aspect-ratio">
                                    <Skeleton />
                                </div>
                            ) : (
                                <Image
                                    src={
                                        show.image?.original ||
                                        '/img/placeholder.jpg'
                                    }
                                    alt={show.name}
                                    layout="responsive"
                                    width={680}
                                    height={1000}
                                />
                            )}
                        </div>
                        <div className="show-layout-top__info-wrap">
                            {isFallback ? (
                                <>
                                    <div className="show-layout-top__rating show-layout-top__rating--fallback">
                                        <Skeleton />
                                    </div>
                                    <h2 className="show-layout-top__show-title show-layout-top__show-title--fallback">
                                        <Skeleton />
                                    </h2>
                                    <div className="show-layout-top__summary">
                                        <Skeleton count={5} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <StarRating
                                        className="show-layout-top__rating"
                                        rating={show.rating.average}
                                    />
                                    <h2 className="show-layout-top__show-title">
                                        {show.name}
                                    </h2>
                                    <div
                                        className="show-layout-top__summary"
                                        dangerouslySetInnerHTML={{
                                            __html: show.summary
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="show-layout-bottom">
                <div className="show-layout-top__inner">
                    <div className="grid-row">
                        <div className="show-layout-bottom__col">
                            {isFallback ? (
                                <h3 style={{ width: '40%' }}>
                                    <Skeleton />
                                </h3>
                            ) : (
                                <h3>Show info</h3>
                            )}
                            <ItemList
                                key={show ? 'show' : 'fallback'}
                                items={[
                                    {
                                        key: 'Streamed on',
                                        value:
                                            show?.network.name ||
                                            'Not available'
                                    },
                                    {
                                        key: 'Schedule',
                                        value: show?.schedule.days.length
                                            ? formatSchedule(show?.schedule)
                                            : 'Not available'
                                    },
                                    {
                                        key: 'Status',
                                        value: show?.status || 'Not available'
                                    },
                                    {
                                        key: 'Genres',
                                        value: show?.genres.length
                                            ? show?.genres.join(', ')
                                            : 'Not available'
                                    }
                                ]}
                                fallback={isFallback}
                                mobileGrid
                            />
                        </div>
                        <div className="show-layout-bottom__col">
                            {isFallback ? (
                                <h3 style={{ width: '40%' }}>
                                    <Skeleton />
                                </h3>
                            ) : show._embedded.cast.length ? (
                                <h3>Starring</h3>
                            ) : (
                                ''
                            )}
                            <ItemList
                                key={show ? 'show' : 'fallback'}
                                items={
                                    show
                                        ? show._embedded.cast.map(cast => ({
                                              image: {
                                                  src:
                                                      cast.person.image?.medium,
                                                  alt: cast.person.name
                                              },
                                              key: cast.person.name,
                                              value: cast.character.name
                                          }))
                                        : Array(4).fill({
                                              image: {
                                                  src: '/img/placeholder.jpg',
                                                  alt: 'fallback'
                                              },
                                              key: 'fallback',
                                              value: 'fallback'
                                          })
                                    // A fallback array is passed to give structure to the loading skeletons
                                    // This functionality could be refactored to not need the fallback array
                                }
                                fallback={isFallback}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default ShowPage
