const path = require("path");
const webpack = require("webpack");
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// process.env.NODE_ENV = 'production';

module.exports={
    name:"numBaseball-setting",
    mode:"development", // 실서비스: production
    devtool:"eval", // 실서비스: hidden-source-map
    resolve:{
        extensions:['.js','.jsx']
    },
    entry:{
        app:['./client'],
    },
    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['> 5% in KR','last 2 chrome version']
                        },
                    }],'@babel/preset-react',
                ],
                plugins:[
                  'react-refresh/babel',  
                ],
            }
        }]
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true}),
        new RefreshWebpackPlugin()
    ],
    output:{
        path:path.join(__dirname, 'dist'),
        filename:'app.js',
        publicPath:'/dist'
    },
    devServer:{
        devMiddleware:{publicPath:'/dist'},
        static:{directory:path.resolve(__dirname)},
        hot:true,
    }

};