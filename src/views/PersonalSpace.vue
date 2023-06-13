<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick" type="card">
			<el-tab-pane label="题库" name="bank">
				<!-- TODO 向后端请求当前题库组，并渲染按钮和对应集合 -->
				<question-type/>
			</el-tab-pane>
			<!--			<el-tab-pane label="个人数据" name="data">-->
			<!--				&lt;!&ndash; TODO 向后端请求答题记录 &ndash;&gt;-->
			<!--				个人数据-->
			<!--			</el-tab-pane>-->
			<el-tab-pane label="个人信息" name="info">
				<login-and-register status="Info" :uid="$route.query.uid"/>
			</el-tab-pane>
		</el-tabs>
	
	</div>
</template>

<script>
import LoginAndRegister from '@/components/LoginAndRegister.vue'
import QuestionType from '@/components/QuestionType.vue';

export default {
	name: "PersonalSpace",
	components: { LoginAndRegister, QuestionType },
	data() {
		return {
			activeName: 'bank'
		};
	},
	methods: {
		handleClick( tab, event ) {
			console.log( tab, event );
		}
	},
	mounted() {
		console.log( this.$route.query.uid );
	},
}
</script>

<style scoped>

</style>
