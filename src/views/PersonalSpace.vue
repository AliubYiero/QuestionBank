<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick" type="card">
			<el-tab-pane label="题库" name="bank">
				<!-- TODO 向后端请求当前题库组，并渲染按钮和对应集合 -->
				当前题库
			</el-tab-pane>
			<el-tab-pane label="个人数据" name="data">
				<!-- TODO 向后端请求答题记录 -->
				个人数据
			</el-tab-pane>
			<el-tab-pane label="个人信息" name="info">
				<LoginAndRegister status="Info"/>
			</el-tab-pane>
		</el-tabs>
	
	</div>
</template>

<script>
import LoginAndRegister from '@/components/LoginAndRegister.vue'

export default {
	name: "PersonalSpace",
	components: { LoginAndRegister },
	data() {
		return {
			activeName: 'data'
		};
	},
	methods: {
		handleClick( tab, event ) {
			console.log( tab, event );
		}
	}
}
</script>

<style scoped>

</style>
