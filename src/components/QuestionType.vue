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
	<div v-if="questionListType" class="question-type-container">
		<div v-for="questionType in questionListType" :key="questionType.question_list_id">
			<el-button @click="$router.push(`/question-bank/${questionType.question_list_id}`)">选择题库</el-button>
			<span>{{ questionType.question_list_name }}</span>
		</div>
	</div>
</template>

<script>
import { api_getQuestionListType } from '@/api/question'

export default {
	name: "HeaderNav",
	
	data() {
		return {
			questionListType: null,
		}
	},
	
	methods: {
		getAllQuestionType() {
			// api_getQuestionListType().then(
			//     res => {
			//         this.questionListType = res.data
			//     }
			// )
			console.log( 1 );
			this.questionListType = [
				{
					"question_list_id": 1,
					"question_list_name": "测试"
				},
				{
					"question_list_id": 2,
					"question_list_name": "测试2"
				}
			]
		}
	},
	
	mounted() {
		this.getAllQuestionType();
	}
}
</script>
