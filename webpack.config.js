const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bamboo.js',
        path: path.resolve(__dirname, 'widget_dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.join(__dirname, './tsconfig.json')
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 8192,
                        },
                    },
                ]
            },
            {
                test: /card\.html$/i,
                use: ['raw-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'src/index.html'),
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 9000,
        publicPath: '/',
        hot: true
    },
    externals: {
        Web3: 'Web3',
        web3: 'web3'
    }
};
