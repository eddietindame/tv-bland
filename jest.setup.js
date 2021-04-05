const React = require('react')

jest.mock('next/image', () => ({ src, alt }) =>
    React.createElement('img', { src, alt })
)

jest.mock('next/router', () => ({
    basePath: '/',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
    reload: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve()),
    back: jest.fn(() => Promise.resolve(true)),
    beforePopState: jest.fn(() => Promise.resolve(true)),
    isFallback: false,
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn()
    },
    useRouter: jest.fn(() => ({ route: '/' }))
}))
