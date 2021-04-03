import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { cache } from 'swr'

import { render, waitFor } from '@/testUtils'
import episodes from '@/data/episodes.json'
import ShowList from './ShowList'
import { SHOW_ITEM_TEST_ID, SHOW_ITEM_FALLBACK_TEST_ID } from './ShowList.types'

const server = setupServer(
    rest.get('https://api.tvmaze.com/schedule', (_req, res, ctx) => {
        return res(
            ctx.set('Access-Control-Allow-Origin', '*'),
            ctx.json(episodes)
        )
    })
)

beforeAll(() => server.listen())

afterEach(() => {
    cache.clear()
    server.resetHandlers()
})

afterAll(() => server.close())

describe('ShowList', () => {
    it('renders fallback items', () => {
        const { queryAllByTestId } = render(<ShowList />)
        expect(queryAllByTestId(SHOW_ITEM_FALLBACK_TEST_ID)).toHaveLength(18)
    })

    it('renders items on success', async () => {
        const { queryAllByTestId } = render(<ShowList />)
        expect(queryAllByTestId(SHOW_ITEM_FALLBACK_TEST_ID)).toHaveLength(18)
        await waitFor(() => {
            expect(
                queryAllByTestId(SHOW_ITEM_TEST_ID).length
            ).toBeGreaterThanOrEqual(1)
        })
    })

    it('renders error message on failure', async () => {
        server.use(
            rest.get('https://api.tvmaze.com/schedule', (_req, res, ctx) => {
                return res(
                    ctx.set('Access-Control-Allow-Origin', '*'),
                    ctx.status(500),
                    ctx.json({ message: 'Internal Server Error' })
                )
            })
        )
        const { queryAllByTestId, getByText } = render(<ShowList />)
        expect(queryAllByTestId(SHOW_ITEM_FALLBACK_TEST_ID)).toHaveLength(18)
        await waitFor(() => {
            expect(
                getByText('There was an error fetching tv shows.')
            ).toBeDefined()
        })
    })
})
