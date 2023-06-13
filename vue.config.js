const { defineConfig } = require( '@vue/cli-service' )
module.exports = defineConfig( {
	transpileDependencies: true,
	lintOnSave: false,	// 关闭lint语法检查
	publicPath: './',	// 设置打包路径
} )
