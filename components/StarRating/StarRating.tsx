import * as React from 'react'

import { classList } from '@/helpers/util'
import * as T from './StarRating.types'
import * as S from './StarRating.module.scss'

const StarRating: React.FunctionComponent<T.StarRatingProps> = (
    props: T.StarRatingProps
): JSX.Element => {
    if (!props.rating && props.rating !== 0) return <>Rating unavailable</>
    if (props.rating < 0 || props.rating > 10) return <>Rating unavailable</>

    const rating = Math.ceil(props.rating / 2)
    const stars = Array(rating).fill('★')
    const unfilledStars = Array(5 - rating).fill('★')

    return (
        <div
            className={classList([props.className, S['star-rating']])}
            role="img"
            aria-label={`${rating} out of 5 stars`}
        >
            {stars.map((star, i) => (
                <span
                    key={i}
                    className={S['star-rating__star']}
                    aria-hidden="true"
                    data-testid={T.STAR_TEST_ID}
                >
                    {star}
                </span>
            ))}
            {unfilledStars.map((star, i) => (
                <span
                    key={'unfilled ' + i}
                    className={classList([
                        S['star-rating__star'],
                        S['star-rating__star--unfilled']
                    ])}
                    aria-hidden="true"
                    data-testid={T.UNFILLED_STAR_TEST_ID}
                >
                    {star}
                </span>
            ))}
            {!props.compact && (
                <span className={S['star-rating__text']}> {rating}/5</span>
            )}
        </div>
    )
}

export default StarRating
