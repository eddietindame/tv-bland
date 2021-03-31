import React from 'react'

import { render } from '@/testUtils'
import episodes from '@/data/episodes.json'
import TvShowItem from './TvShowItem'

describe('TvShowItem', () => {
    const episode = episodes[0]

    it('renders title', () => {
        const { getByText } = render(<TvShowItem episode={episode} />)
        const componentText = getByText(episode.show.name)
        expect(componentText).toBeDefined()
    })

    it('renders image', () => {
        const { getByAltText } = render(<TvShowItem episode={episode} />)
        const img = getByAltText(episode.show.name) as HTMLImageElement
        expect(img.src).toBe(episode.show.image.medium)
    })
})
