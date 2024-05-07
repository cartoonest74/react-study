const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports={
    name: 'word-relay-setting',
    mode: 'development', // 실서비스:production
    devtool:'eval',
    resolve:{
        extensions:['.js','.jsx']
    },
    entry:{
        app:['./client'],
    },// 입력

    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['> 5% in KR','last 2 chrome versions'],
                        },
                        debug:true,
                    }],'@babel/preset-react',
                ],
                plugins:[
                    'react-refresh/babel',
                ],
            }
        }],
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true}), 
        new RefreshWebpackPlugin()
    ],
    output:{
        path: path.join(__dirname, 'dist'), // 실제경로
        filename: 'app.js',
        publicPath:'/dist/' // 가상의 경로 app.use('/dist',express.static(__dirname,'dist'));
    },// 출력
    devServer:{
        devMiddleware:{publicPath:'/dist/'}, // webpack 이 생성해주는 경로
        static:{directory:path.resolve(__dirname)},
        hot:true,
    },
};