const Path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const GENERATE_SOURCE_MAPS = (process.env.NODE_ENV !== 'production');

module.exports = [
    {
        entry: [
            "./src/main/ts/index.ts",
            "./src/main/scss/index.sass"
        ],
        output: {
            path: Path.resolve(__dirname, "public"),
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
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: "babel-loader"
                        },
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
                    loader: "vue-loader",
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
                    exclude: /(node_modules)/
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
                    test: /\.woff$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "./fonts",
                            publicPath: item => "../fonts/" + item
                        }
                    },
                    exclude: /(node_modules)/
                },
            ],
        },
    }
];