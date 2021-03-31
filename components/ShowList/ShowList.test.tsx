import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { cache } from 'swr'

import { render, waitFor } from '@/testUtils'
import episodes from '@/data/episodes.json'
import ShowList from './ShowList'
import { SHOW_LIST_TESTING_ID } from './ShowList.types'

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
    it('renders loading text', () => {
        const { getByText } = render(<ShowList />)
        expect(getByText('Loading tv shows...')).toBeDefined()
    })

    it('renders items', async () => {
        const { getByText, getByTestId } = render(<ShowList />)
        expect(getByText('Loading tv shows...')).toBeDefined()
        await waitFor(() => {
            expect(getByTestId(SHOW_LIST_TESTING_ID)).toBeDefined()
        })
    })

    it('renders error message', async () => {
        server.use(
            rest.get('https://api.tvmaze.com/schedule', (_req, res, ctx) => {
                return res(
                    ctx.set('Access-Control-Allow-Origin', '*'),
                    ctx.status(500),
                    ctx.json({ message: 'Internal Server Error' })
                )
            })
        )
        const { getByText } = render(<ShowList />)
        expect(getByText('Loading tv shows...')).toBeDefined()
        await waitFor(() => {
            expect(
                getByText('There was an error fetching tv shows.')
            ).toBeDefined()
        })
    })
})
