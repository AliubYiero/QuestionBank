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
</style>

<template>
	<div class="question">
		<div class="content">
			{{ questionObj.question_id }}. [{{ questionObj.type }}]{{ questionObj.content }}
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
	</div>
</template>

<script>

export default {
	props: [ 'questionObj' ],
	data() {
		return {
			answer: '',
			allAnswerList: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]
		}
	},
	computed: {
		options() {
			return this.questionObj.options.split( ',' )
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
