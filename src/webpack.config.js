const Path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
            path: Path.resolve(__dirname, "public"),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss', ".vue"]
        },
        plugins: [
            new HardSourceWebpackPlugin(),
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
            ],
        },
    }
];