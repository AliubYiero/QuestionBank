<style lang="scss" scoped>
h2 {
	border-top: 1px solid #f8f8f8;
	padding-top: 20px;
	text-align: center;
}

.el-form--question-bank-container {
	// 设置位置坐标: position
	@mixin position {
		position: relative;
		margin-bottom: 100px;
	}
	/* 设置位置坐标: position */
	@include position;
}

.submit-button {
	// 设置位置坐标: position
	@mixin position {
		position: absolute;
		right: 0;
	}
	/* 设置位置坐标: position */
	@include position;
}
</style>

<template>
	<section>
		<template v-if="!openForm">
			<el-button @click="openForm = true;">添加题库</el-button>
		</template>
		<template v-else>
			<el-form
				label-position="right"
				label-width="100px"
				class="el-form--question-bank-container"
				ref="form"
				:model="form"
				:rules="propRule"
			>
				<h2>新增题库</h2>
				<el-form-item label="新增题库名" class="form-item--question-bank" prop="questionBankName">
					<el-input v-model="form.questionBankName"/>
				</el-form-item>
				<el-button @click="submitForm('form');" class="submit-button">确定</el-button>
			</el-form>
		</template>
	</section>
</template>

<script>
import { api_addQuestionList } from '@/api/question'

export default {
	name: "AddQuestionBank",
	data() {
		return {
			openForm: false,
			form: {
				questionBankName: '',
			},
			propRule: {
				questionBankName: [
					{ required: true, message: '请输入新建题库名称' },
				]
			},
		}
	},
	methods: {
		submitForm( formName ) {
			this.$refs[formName].validate( valid => {
				if ( valid ) {
					console.log( this.form );
					api_addQuestionList( {
						question_list_name: this.form.questionBankName
					} ).then(
						res => {
							this.$message.success( '成功新建题库' );
							this.openForm = false;
							// TODO 无法使用vuex更新状态
							// api_getQuestionListType().then(
							// 	res => {
							// 		this.$store.commit( 'changQuestionBank', res.data.data )
							// 	}
							// ).catch(
							// 	error => {
							// 		console.error( error );
							// 	}
							// );
							location.reload();
						}
					).catch(
						error => {
							console.error( error );
						}
					)
					
				} else {
					console.log( 'error submit!!' )
					return false
				}
			} )
		},
	}
}
</script>
