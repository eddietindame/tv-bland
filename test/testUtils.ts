import { render } from '@testing-library/react'

const Providers = ({ children }) => children

const customRender = (ui, options = {}) =>
    render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
