const Path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const GENERATE_SOURCE_MAPS = (process.env.NODE_ENV !== 'production');

module.exports = [
    {
        mode: process.env.NODE_ENV,
        context: Path.resolve(__dirname),
        entry: [
            "./app/ts/index.ts",
            "./app/scss/index.scss"
        ],
        output: {
            path: Path.resolve(__dirname, "../docs"),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss', ".vue"]
        },
        plugins: [
            // new HardSourceWebpackPlugin(),
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                appendTsSuffixTo: [/\.vue$/]
                            }
                        },
                    ],
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(vue|md)$/,
                    use: [
                        {
                            loader: "vue-loader"
                        },
                        {
                            loader: 'markdown-to-vue-loader',
                            options: {
                                exportSource: true
                            },
                        },
                    ]
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "./img",
                            publicPath: item => "../img/" + item
                        }
                    },
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(sc|c|sa)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: GENERATE_SOURCE_MAPS
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: GENERATE_SOURCE_MAPS
                            }
                        },
                    ],
                },
                {
                    test: /\.woff$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "./fonts"
                        }
                    },
                    exclude: /(vendor|node_modules)/
                },
            ],
        },
    }
];