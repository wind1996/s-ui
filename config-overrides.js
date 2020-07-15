// 修改webpack默认配置，目的：按需引入antdesign
// 、、customize-cra包含很多api
const {override, fixBabelImports, addWebpackAlias, removeModuleScopePlugin, addLessLoader,addPostcssPlugins, overrideDevServer,} = require('customize-cra');
const path = require("path")

const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false

    return config
}

const devServerConfig = () => config => {
    console.error('1111111111111111',config)
    config.open = false;
    config.compress = false;
    config.proxy={
        '/api': {
            target: 'xxx',
                changeOrigin: true,
                pathRewrite: {
                '^/api': '/api',
            },
        }
    };
    return config
}


module.exports = {
    webpack: override(
        addLessLoader(),
        addPostcssPlugins([
            /*require('postcss-normalize')({
                forceImport: true
            }),
            require('postcss-preset-env')({
                stage: 0
            })*/
        ]),
        rewiredMap(),
        removeModuleScopePlugin(),
        addWebpackAlias({ //路径别名
            '@': path.resolve(__dirname, 'src'),
        }),
        // rewiredMap(),
        (config) => {
            if (process.env.BUILD_DOC === "true") {
                //暴露webpack的配置 config ,evn
                console.log(config.pluins)
                const paths = require('react-scripts/config/paths');

                // 配置打包目录输出到dist/web 目录中
                paths.appBuild = path.join(path.dirname(paths.appBuild), 'docs');
                config.output.path = paths.appBuild

                // 配置访问子目录/web/
                // paths.publicUrlOrPath = '/s-ui/'
                config.output.publicPath = "/s-ui/"
            }

            return config
        }
    ),
    devServer: overrideDevServer(
        devServerConfig()
    )
}