const path = require('path');

module.exports = {
    mode: 'development',  // 개발 모드 설정
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']  // .jsx 확장자 파일도 처리
    },
    devtool: 'inline-source-map',  // 개발자 도구를 위한 소스 맵
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        publicPath: '/',
        hot: true
    }
};