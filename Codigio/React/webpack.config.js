const path = require('path');

module.exports = {
    //entrada do arquivo que será transpilado
    entry: path.resolve(__dirname, 'src', 'index.js'),
    //saida do file já transpilado
    output: {
        path: path.resolve(__dirname, 'public'),
        filename : 'bundle.js'
    },
    devServer:{
        static : {
            directory : path.join(__dirname, 'public')
        },
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            //não transpilar a nodemodules
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader'
            },
        },
        {
            test : /\.css$/,
            exclude : /node_modules/,
            use : [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
            ]
        }
    ]
    },
};