// vue.config.js is automatically respected when you use the vue-cli
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3333',
            },
        },
    },
};