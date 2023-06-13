<style scoped>

</style>

<template>
	<el-menu
		mode="horizontal"
		@select="handleSelect"
		router
	>
		<el-menu-item index="/">个人中心</el-menu-item>
		<el-menu-item index="/question-bank">题库</el-menu-item>
		<el-menu-item index="/login">登录</el-menu-item>
		<el-menu-item index="/register">注册</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	name: "HeaderNav",
	
	methods: {
		handleSelect( key, keyPath ) {
			console.log( key, keyPath )
		}
	},
}
</script>
