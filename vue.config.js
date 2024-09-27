const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },

    devServer: {
        port: 5173,
        open: false,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        }
    }
})
