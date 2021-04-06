import React from 'react'

import { render, fireEvent, waitFor } from '@/testUtils'
import ItemList from './ItemList'

describe('ItemList', () => {
    it('renders keys and values', () => {
        const items = [
            {
                key: 'Streamed on',
                value: 'Test streamed on'
            },
            {
                key: 'Schedule',
                value: 'Test schedule'
            },
            {
                key: 'Status',
                value: 'Test status'
            },
            {
                key: 'Genres',
                value: 'Test genres'
            }
        ]
        const { getByText } = render(<ItemList items={items} />)
        items.forEach(item => {
            expect(getByText(item.key)).toBeDefined()
            expect(getByText(item.value)).toBeDefined()
        })
    })

    it('renders images including fallback', () => {
        const baseUrl = 'http://localhost'
        const items = Array(4)
            .fill('')
            .map((_e, i) => ({
                image: {
                    src: 'https://via.placeholder.com/210x295?text=nofallback',
                    alt: 'fallback'
                },
                key: 'fallback key ' + i,
                value: 'fallback value ' + i
            }))
        items[2] = {
            image: {
                src: undefined,
                alt: 'fallback'
            },
            key: 'fallback key 2',
            value: 'fallback value 2'
        }
        const { queryAllByRole } = render(<ItemList items={items} />)
        const images = queryAllByRole('img') as HTMLImageElement[]
        expect(images).toHaveLength(4)
        images.forEach((image, i) => {
            if (i === 2)
                expect(image.src).toBe(baseUrl + '/img/placeholder.jpg')
            else
                expect(image.src).toBe(
                    'https://via.placeholder.com/210x295?text=nofallback'
                )
        })
    })

    it('shows more on button click', async () => {
        const items = Array(9)
            .fill('')
            .map((_e, i) => ({
                key: 'Test key' + i,
                value: 'Test value' + i
            }))
        const { queryAllByText, getByRole } = render(<ItemList items={items} />)
        const button = getByRole('button')
        expect(button).toBeDefined()
        await waitFor(() => expect(queryAllByText(/Test key/i)).toHaveLength(4))
        fireEvent.click(button)
        await waitFor(() => expect(queryAllByText(/Test key/i)).toHaveLength(8))
        fireEvent.click(button)
        await waitFor(() => expect(queryAllByText(/Test key/i)).toHaveLength(9))
        expect(() => getByRole('button')).toThrow()
    })
})
