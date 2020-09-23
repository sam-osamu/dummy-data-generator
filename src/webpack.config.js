const Path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const zopfli = require("node-zopfli");

const PRODUCTION = (process.env.NODE_ENV === 'production');
const GENERATE_SOURCE_MAPS = !PRODUCTION;

module.exports = [
    {
        mode: process.env.NODE_ENV,
        context: Path.resolve(__dirname),
        entry: [
            "./app/ts/index.ts",
            "./app/scss/index.scss"
        ],
        output: {
            path: Path.resolve(__dirname, (PRODUCTION) ? "../docs" : "./docs-dev"),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss', ".vue"]
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
            new CompressionPlugin({
                test: /\.(css)|(js)$/,
                algorithm(input, compressionOptions, callback) {
                    return zopfli.gzip(input, compressionOptions, callback);
                }
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
                    test: /\.vue$/,
                    use: [
                        {
                            loader: "vue-loader"
                        }
                    ]
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "./img"
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
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'raw-loader',
                            options: {
                                esModule: true,
                            },
                        },
                    ],
                },
            ],
        },
    }
];