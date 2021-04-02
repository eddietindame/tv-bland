import React from 'react'

import { cleanup, render } from '@/testUtils'
import StarRating from './StarRating'
import * as T from './StarRating.types'

describe('StarRating', () => {
    it('renders', () => {
        const { getByRole } = render(<StarRating rating={3} />)
        const ratingElement = getByRole('img')

        expect(ratingElement).toBeDefined()
    })

    it('Shows correct text when no / invalid rating available', () => {
        const ratings = [null, -1, 11]

        ratings.forEach(rating => {
            const { getByText } = render(<StarRating rating={rating} />)
            const ratingText = getByText('Rating unavailable')

            expect(ratingText).toBeDefined()
            cleanup()
        })
    })

    it('Shows correct stars for rating', () => {
        const ratings = Array(11).map((_e, i) => i) // 0 to 10

        ratings.forEach(rating => {
            const { queryAllByTestId } = render(<StarRating rating={rating} />)
            const stars = queryAllByTestId(T.STAR_TEST_ID)
            const unfilledStars = queryAllByTestId(T.UNFILLED_STAR_TEST_ID)

            expect(stars).toHaveLength(Math.ceil(rating / 2))
            expect(unfilledStars).toHaveLength(5 - Math.ceil(rating / 2))
            cleanup()
        })
    })

    it('Shows correct text for rating', () => {
        const ratings = Array(11).map((_e, i) => i) // 0 to 10

        ratings.forEach(rating => {
            const { getByText } = render(<StarRating rating={rating} />)
            const text = getByText(` ${Math.ceil(rating / 2)}/5`)

            expect(text).toBeDefined()
            cleanup()
        })
    })

    it('Shows no text in compact mode', () => {
        const { getByText } = render(<StarRating rating={10} compact />)

        expect(() => getByText(' 5/5')).toThrow()
    })
})
