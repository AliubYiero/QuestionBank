<style lang="scss" scoped>
.add-new {
	// 设置布局: display
	@mixin display {
		display: flex;
		flex-flow: column;
		gap: 30px;
	}
	/* 设置布局: display */
	@include display;
}
</style>

<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick" type="card">
			<el-tab-pane label="题库" name="bank">
				<!-- TODO 向后端请求当前题库组，并渲染按钮和对应集合 -->
				<question-type/>
				<el-divider/>
				<section class="add-new">
					<add-question-bank/>
					<add-question/>
					<delete-question/>
				</section>
			</el-tab-pane>
			
			<el-tab-pane label="个人信息" name="info">
				<login-and-register status="Info" :uid="$route.query.uid"/>
			</el-tab-pane>
		</el-tabs>
	
	</div>
</template>

<script>
import LoginAndRegister from '@/components/LoginAndRegister.vue'
import QuestionType from '@/components/QuestionType.vue';
import AddQuestion from '@/components/AddQuestion.vue'
import AddQuestionBank from '@/components/AddQuestionBank.vue'
import DeleteQuestion from '@/components/DeleteQuestion.vue'

export default {
	name: "PersonalSpace",
	components: { DeleteQuestion, AddQuestionBank, AddQuestion, LoginAndRegister, QuestionType },
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
