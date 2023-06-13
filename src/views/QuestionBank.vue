<style scoped>
</style>

<template>
	<div v-if="question_list">
		<div
			v-for="(question, index) in question_list"
			:key="index"
		>
			<question :questionObj="question"/>
		</div>
		
		<el-button @click="submitAnswers">提交答案</el-button>
		
		<section v-if="displayAnswerList.length !== 0">
			<el-divider/>
			
			<div v-for="(content, index) in displayAnswerList" :key="index">
				{{ content }}
			</div>
		</section>
	</div>
</template>

<script>
import Question from '@/components/Question.vue'
import { api_checkAnswerAll, api_getQuestionList } from '@/api/question'

export default {
	components: { Question },
	name: 'QuestionBank',
	
	data() {
		return {
			question_list: null,
			displayAnswerList: [],
		}
	},
	
	methods: {
		getQuestions( typeId ) {
			api_getQuestionList( { question_list_id: typeId } ).then( res => {
				this.question_list = res.data.data
			} )
		},
		
		submitAnswers() {
			let params = [];
			const mapIterator = this.$store.state.answerList.values();
			let i = 0;
			while ( i < this.$store.state.answerList.size ) {
				params.push( mapIterator.next().value )
				i++;
			}
			console.log( params );
			api_checkAnswerAll( params ).then(
				res => {
					console.log( res );
					res.data.data.forEach( result => {
						this.displayAnswerList.push( `第${ result.question_id }题，${ result.isRight ? '正确' : '错误' }` );
					} )
				}
			).catch(
				error => {
					console.error( error );
				}
			)
		}
	},
	
	mounted() {
		this.getQuestions( this.$route.params.questions_id )
	}
}
</script>
