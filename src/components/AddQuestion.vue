<style lang="scss" scoped>
h2 {
	border-top: 1px solid #f8f8f8;
	padding-top: 20px;
	text-align: center;
}


.el-form--question-container {
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
			<el-button @click="openForm = true;">添加题目</el-button>
		</template>
		<template v-else>
			<el-form
				ref="Form"
				label-position="right"
				label-width="100px"
				class="el-form--question-container"
				:rules="propRule"
				:model="form">
				<h2>新增题目</h2>
				<el-form-item label="题目" prop="content">
					<el-input v-model="form.content"/>
				</el-form-item>
				<el-form-item label="题目类型" prop="type">
					<el-select v-model="form.type">
						<el-option
							v-for="(item, index) in questionType"
							:key="index"
							:label="item"
							:value="index + 1"
						/>
					</el-select>
				</el-form-item>
				<template v-for="(item, index) in form.options">
					<el-form-item :label="`选项${alphas[index]}`" :key="index" :prop="index === 0 ? 'options' : ''">
						<el-input v-model="form.options[index]"/>
					</el-form-item>
				</template>
				<el-form-item label="正确答案" prop="answer">
					<template v-if="form.type === 2">
						
						<el-select v-for="(item, index) in form.options" :key="index" v-model="form.answer[index]">
							<el-option
								v-for="(item, index) in form.options"
								:key="index"
								:label="'[' + alphas[index] + '] ' + item"
								:value="alphas[index]">
							</el-option>
						</el-select>
					
					</template>
					<template v-else>
						<el-select v-model="form.answer[0]">
							<el-option
								v-for="(item, index) in form.options"
								:key="index"
								:label="'[' + alphas[index] + '] ' + item"
								:value="alphas[index]">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="题库" prop="question_list_id">
					<el-select v-model="form.question_list_id">
						<el-option
							v-for="item in questionBankList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-button @click="submitForm('Form')" class="submit-button">确定</el-button>
			</el-form>
		</template>
	</section>
</template>

<script>

import { api_addQuestion } from '@/api/question'

export default {
	name: "AddQuestion",
	data() {
		return {
			alphas: [ 'A', 'B', 'C', 'D' ],
			openForm: false,
			questionType: [ '单选', '多选', '判断' ],
			form: {
				content: '',
				type: '',
				options: [
					'', '', '', '',
				],
				answer: [],
				question_list_id: '',
			},
			propRule: {
				content: [
					{ required: true, message: '请输入题目' }
				],
				type: [
					{ required: true, message: '请选择题目类型' }
				],
				options: [
					{ required: true, message: '请输入至少一个选项' }
				],
				answer: [
					{ required: true, message: '请选择正确答案' }
				],
				question_list_id: [
					{ required: true, message: '请选择题库' }
				],
			}
		}
	},
	computed: {
		questionBankList() {
			this.$store.state.questionBankList.forEach(
				questionBank => {
					questionBank.value = questionBank.question_list_id;
					questionBank.label = questionBank.question_list_name;
				}
			)
			return this.$store.state.questionBankList
		}
	},
	methods: {
		submitForm( formName ) {
			this.form.options = this.form.options.join( ',' );
			this.form.answer = this.form.answer.join( ',' );
			this.$refs[formName].validate( valid => {
				if ( valid ) {
					console.log( this.form );
					api_addQuestion( this.form ).then(
						res => {
							console.log( res );
							this.openForm = false;
							this.$message.success( '题目上传成功' );
							this.form = {};
						}
					).catch(
						error => {
							console.error( error );
						}
					);
				} else {
					console.log( 'error submit!!' )
					return false
				}
			} )
		},
	},
	watch: {
		'form.type'( newVal ) {
			console.log( newVal );
			if ( newVal === 3 ) {
				this.form.options[0] = '正确';
				this.form.options[1] = '错误';
			}
		}
	},
}
</script>
