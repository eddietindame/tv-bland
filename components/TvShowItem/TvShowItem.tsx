import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import StarRating from '@/components/StarRating'
import { classList } from '@/helpers/util'
import * as T from './TvShowItem.types'
import * as S from './TvShowItem.module.scss'

const TvShowItem: React.FunctionComponent<T.TvShowItemProps> = (
    props: T.TvShowItemProps
): JSX.Element => {
    if (!props.episode)
        return (
            <div
                className={classList([props.className, S['tv-show-item']])}
                data-testid={props.testId}
            >
                <div
                    className={classList([
                        S['tv-show-item__thumbnail'],
                        'aspect-ratio'
                    ])}
                >
                    <Skeleton />
                </div>
                <div
                    className={classList([
                        S['tv-show-item__rating'],
                        S['tv-show-item__rating--fallback']
                    ])}
                >
                    <Skeleton />
                </div>
                <p className={S['tv-show-item__title']}>
                    <Skeleton count={2} />
                </p>
            </div>
        )

    return (
        <div
            className={classList([props.className, S['tv-show-item']])}
            data-testid={props.testId}
        >
            <Link href={'/shows/' + props.episode.show.id}>
                <a className={S['tv-show-item__anchor']}>
                    <Image
                        className={S['tv-show-item__thumbnail']}
                        src={
                            props.episode.show.image?.medium ||
                            props.episode.show.image?.original ||
                            '/img/placeholder.jpg'
                        }
                        alt={props.episode.show.name}
                        width={210}
                        height={295}
                    />
                    <StarRating
                        className={S['tv-show-item__rating']}
                        rating={props.episode.show.rating.average}
                        compact
                    />
                    <p className={S['tv-show-item__title']}>
                        {props.episode.show.name}
                    </p>
                </a>
            </Link>
        </div>
    )
}

export default TvShowItem
