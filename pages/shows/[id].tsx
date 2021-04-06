import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { useTrail, animated } from '@react-spring/web'

import { HOST, TITLE, KEY_WORDS } from '@/config'
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
    const fadeTrail = useTrail(5, {
        from: { opacity: 0 },
        opacity: 1
    })

    return (
        <>
            {show && (
                <Head>
                    <title>
                        {show.name} | {TITLE}
                    </title>
                    <meta
                        name="description"
                        content={`TV Bland page for information on ${show.name}.`}
                    />
                    <meta
                        name="keywords"
                        content={[
                            ...KEY_WORDS,
                            show.name,
                            ...show.genres,
                            show.network.name,
                            show.language
                        ].join(' ')}
                    />
                    <link rel="canonical" href={`${HOST}/shows/${show.id}`} />

                    <meta
                        key="og:url"
                        property="og:url"
                        content={`${HOST}/shows/${show.id}`}
                    />
                    <meta
                        key="og:title"
                        property="og:title"
                        content={`${show.name} | ${TITLE}`}
                    />
                    <meta
                        key="og:description"
                        property="og:description"
                        content={`TV Bland page for information on ${show.name}.`}
                    />
                    <meta
                        key="og:image"
                        property="og:image"
                        content={show.image.original}
                    />
                    <meta
                        key="og:image:type"
                        property="og:image:type"
                        content="image/jpeg"
                    />
                </Head>
            )}

            <section className="show-layout-top">
                <div className="show-layout-top__inner">
                    <animated.h1
                        className="show-layout-top__heading"
                        style={fadeTrail[0]}
                    >
                        <Link href="/">
                            <a className="show-layout-top__heading__anchor">
                                TV Bland
                            </a>
                        </Link>
                    </animated.h1>

                    <div className="grid-row">
                        <animated.div
                            className="show-layout-top__image-wrap"
                            style={fadeTrail[1]}
                        >
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
                        </animated.div>
                        <animated.div
                            className="show-layout-top__info-wrap"
                            style={fadeTrail[2]}
                        >
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
                        </animated.div>
                    </div>
                </div>
            </section>

            <section className="show-layout-bottom">
                <div className="show-layout-top__inner">
                    <div className="grid-row">
                        <animated.div
                            className="show-layout-bottom__col"
                            style={fadeTrail[3]}
                        >
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
                                        key:
                                            show?.genres.length > 1
                                                ? 'Genres'
                                                : 'Genre',
                                        value: show?.genres.length
                                            ? show?.genres.join(', ')
                                            : 'Not available'
                                    }
                                ]}
                                fallback={isFallback}
                                mobileGrid
                            />
                        </animated.div>
                        <animated.div
                            className="show-layout-bottom__col"
                            style={fadeTrail[4]}
                        >
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
                                        : Array(4)
                                              .fill('')
                                              .map((_e, i) => ({
                                                  image: {
                                                      src:
                                                          '/img/placeholder.jpg',
                                                      alt: 'fallback'
                                                  },
                                                  key: 'fallback key ' + i,
                                                  value: 'fallback value ' + i
                                              }))
                                    // A fallback array is passed to give structure to the loading skeletons
                                    // This functionality could be refactored to not need the fallback array
                                }
                                fallback={isFallback}
                            />
                        </animated.div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default ShowPage
