import * as React from 'react'
import Image from 'next/image'

import StarRating from '@/components/StarRating'
import { classList } from '@/helpers/util'
import * as T from './TvShowItem.types'
import * as S from './TvShowItem.module.scss'

const TvShowItem: React.FunctionComponent<T.TvShowItemProps> = (
    props: T.TvShowItemProps
): JSX.Element => {
    return (
        <div className={classList([props.className, S['tv-show-item']])}>
            <Image
                className={S['tv-show-item__thumbnail']}
                src={
                    props.episode.show.image?.medium ||
                    props.episode.show.image?.original ||
                    'https://via.placeholder.com/210x295'
                }
                alt={props.episode.show.name}
                width={210}
                height={295}
            />
            <StarRating
                className={S['tv-show-item__rating']}
                rating={props.episode.show.rating.average}
                data-testid={'poop'}
            />
            <p className={S['tv-show-item__title']}>
                {props.episode.show.name}
            </p>
        </div>
    )
}

export default TvShowItem
