import React from 'react'

import { render } from '@/testUtils'
import Footer from './Footer'

describe('Footer', () => {
    it('renders year', () => {
        const { getByText } = render(<Footer />)
        const regex = new RegExp(new Date().getFullYear() + '')
        expect(getByText(regex)).toBeDefined()
    })
})
