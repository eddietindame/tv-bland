const React = require('react')

jest.mock('next/image', () => ({ src, alt }) =>
    React.createElement('img', { src, alt })
)
