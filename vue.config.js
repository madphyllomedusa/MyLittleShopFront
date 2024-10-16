const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')


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
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
            }),
        ],
    },
})
