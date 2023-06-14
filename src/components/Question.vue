<style lang="scss" scoped>
.question {
	@mixin position() {
		margin: 10px 0;
	}
	@include position();
}

.content {
	@mixin position() {
		margin: 0 0 10px 0;
	}
	@include position();
}

.options {
	display: flex;
	flex-flow: column;
	gap: 10px;
}

.delete-btn {
	margin: 10px 0;
}
</style>

<template>
	<div class="question" v-show="isDisplay">
		<div class="content">
			{{ questionObj.question_id }}. [{{ questionType }}]{{ questionObj.content }}
		</div>
		<div class="options">
			<el-radio
				v-model="answer"
				v-for="(option, index) in options"
				:key="index"
				:label="index"
			>{{ option }}
			</el-radio>
		</div>
		
		<template v-if="$store.state.showStatus === 'Delete'">
			<el-button @click="deleteQuestion" size="small" class="delete-btn">
				删除当前题目
			</el-button>
		</template>
	</div>
</template>

<script>

import { api_deleteQuestion } from '@/api/question'

export default {
	props: [ 'questionObj' ],
	data() {
		return {
			answer: '',
			isDisplay: true,
			allAnswerList: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
			typeList: [ '', '单选', '多选', '判断' ]
		}
	},
	computed: {
		options() {
			return this.questionObj.options.split( ',' )
		},
		questionType() {
			console.log( this.questionObj.type );
			if ( !isNaN( this.questionObj.type ) ) {
				return this.typeList[parseInt( this.questionObj.type )];
			}
			return this.questionObj.type
		}
	},
	methods: {
		deleteQuestion() {
			api_deleteQuestion( { question_id: this.questionObj.question_id } ).then(
				res => {
					this.$message.success( '删除题目成功' );
					this.isDisplay = false;
					console.log( res );
				}
			).catch(
				error => {
					console.error( error );
				}
			)
		}
	},
	watch: {
		answer( newValue ) {
			this.$store.state.answerList.set( this.questionObj.question_id, {
				question_id: this.questionObj.question_id,
				answer: this.allAnswerList[newValue],
			} )
		}
	},
}
</script>
