const path = require('path')

module.exports = {
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