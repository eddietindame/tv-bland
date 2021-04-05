const path = require('path')

module.exports = {
    env: {
        DEV: process.env.NODE_ENV !== 'production',
        HOST: process.env.HOST
    },
    images: {
        domains: ['static.tvmaze.com']
    },
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'styles'),
            path.join(__dirname, 'node_modules')
        ],
        prependData: `
            @import "bootstrap/scss/functions";
            @import "bootstrap/scss/variables";
            @import "bootstrap/scss/mixins";
            @import "variables";
        `
    }
}
