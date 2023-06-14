<style scoped>
.question-type-container {
	display: flex;
	flex-flow: column;
	gap: 10px;
}

.el-button {
	margin-right: 20px;
}
</style>

<template>
	<div v-if="questionBankList" class="question-type-container">
		<div v-for="questionType in questionBankList" :key="questionType.question_list_id">
			<el-button @click="$router.push(`/question-bank/${questionType.question_list_id}`)">选择题库</el-button>
			<span>{{ questionType.question_list_name }}</span>
		</div>
	</div>
</template>

<script>

import { api_getQuestionListType } from '@/api/question'

export default {
	name: "QuestionType",
	
	data() {
		return {
			questionBankList: null,
		}
	},
	
	
	methods: {
		getAllQuestionType() {
			// todo fix 无法捕捉错误，会跳出报错
			api_getQuestionListType().then(
				res => {
					this.$store.state.questionBankList = res.data.data;
					this.questionBankList = this.$store.state.questionBankList;
				}
			).catch(
				error => {
					console.error( error );
				}
			)
		}
	},
	
	mounted() {
		this.getAllQuestionType();
	}
}
</script>
