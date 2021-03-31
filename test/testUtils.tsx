import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'

const Providers = ({ children }) => (
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
)

const customRender = (ui, options = {}) =>
    render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
