import React from 'react'

import { render } from '@/testUtils'
import { ShowWithCast } from '@/typings/tvmaze'
import episodes from '@/data/episodes.json'
import TVShowPage from '@/pages/shows/[id]'

describe('TVShowPage page', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(
            <TVShowPage show={episodes[0].show as ShowWithCast} />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
