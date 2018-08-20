const webpack=require("webpack");
const WebpackDevServer=require("webpack-dev-server");
const config=require("./webpack.config.debug");
new WebpackDevServer(webpack(config),{
    publicPath:config.output.publicPath,
    hot:true,
    historyApiFallback:true,
	disableHostCheck: true,
    proxy: {
        '/api': {
            target: '',//代理配置
            secure: false,
            changeOrigin: true,
            // pathRewrite: {'^/manhour' : ''},
        },
        '/image': {
            target: '',//
            secure: false,
            changeOrigin: true,
            // pathRewrite: {'^/manhour' : ''},
        }
    }
}).listen(8080,"10.122.251.58",function (err,result) {
    if(err){
        console.log(err)
    }
    console.log("Listening at localhost:3000")
});
