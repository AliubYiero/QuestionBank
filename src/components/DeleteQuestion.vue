<style lang="scss" scoped>
h2 {
	border-top: 1px solid #f8f8f8;
	padding-top: 20px;
	text-align: center;
}
</style>

<template>
	<section>
		<template v-if="!openForm">
			<el-button @click="openForm = true; $store.state.showStatus = 'Delete'">删除题目</el-button>
		</template>
		<template v-else>
			<h2>删除题目</h2>
			<question-type/>
		</template>
	</section>
</template>

<script>
import QuestionType from '@/components/QuestionType.vue';

export default {
	name: "DeleteQuestion",
	components: { QuestionType },
	data() {
		return {
			openForm: false,
		}
	},
	methods: {},
}
</script>
