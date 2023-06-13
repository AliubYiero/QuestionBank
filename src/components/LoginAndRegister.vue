<template>
	<el-form
		:rules="rules"
		:model="form"
		ref="loginForm"
	>
		<!-- 傻逼for判断 -->
		<template v-if="status === 'Login'">
			<el-form-item
				label="用户名"
				prop="username"
			>
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				prop="password"
			>
				<el-input
					type="password"
					v-model="form.password"
				></el-input>
			</el-form-item>
			<el-button @click="submitFormToLogin('loginForm')">登录</el-button>
			<el-button @click="$router.push('/register')">没有账号，前往注册</el-button>
		</template>
		<template v-else-if="status === 'Register'">
			<el-form-item
				label="用户名"
				prop="username"
			>
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				prop="password"
			>
				<el-input
					type="password"
					v-model="form.password"
				></el-input>
			</el-form-item>
			<el-form-item
				label="手机"
				prop="telephone"
			>
				<el-input v-model="form.telephone"></el-input>
			</el-form-item>
			<el-form-item
				label="邮箱"
				prop="email"
			>
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-button @click="submitFormToRegister('loginForm')">注册</el-button>
		</template>
		<template v-else-if="status === 'Info'">
			<el-form-item
				label="用户名"
				prop="username"
			>
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				prop="password"
			>
				<el-input
					type="password"
					v-model="form.password"
				></el-input>
			</el-form-item>
			<el-form-item
				label="手机"
				prop="telephone"
			>
				<el-input v-model="form.telephone"></el-input>
			</el-form-item>
			<el-form-item
				label="邮箱"
				prop="email"
			>
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item
				label="权限"
				prop="right"
			>
				<el-input
					type="email"
					v-model="form.rights"
					disabled
				></el-input>
			</el-form-item>
		</template>
	
	</el-form>
</template>

<script>
import { api_login, api_register } from '@/api/user'

export default {
	name: 'LoginAndRegister',
	
	props: {
		status: {
			require: true,
			title: 'Login' | 'Register' | 'Info'
		},
		uid: {
			title: String,
		}
	},
	data() {
		return {
			// 表单验证项
			rules: {
				username: [
					{ required: true, message: '请输入用户名' },
					{ max: 10, message: '最长为10个字符' }
				],
				password: [ { required: true, message: '请输入密码' } ],
				telephone: [ { min: 11, max: 11, message: '请输入11位手机号' } ],
				email: []
			},
			form: {
				username: '',
				password: '',
				telephone: undefined,
				email: undefined,
				rights: undefined
			}
		}
	},
	
	methods: {
		submitFormToLogin( formName ) {
			this.$refs[formName].validate( valid => {
				if ( valid ) {
					api_login( {
						username: this.form.username,
						password: this.form.password
					} ).then(
						res => {
							console.log( res );
							this.$store.state.userInfo = res.data.data
							console.warn( this.$store.state.userInfo );
							this.$message.success( '登录成功' );
							this.$router.push( {
								path: `/`,
								query: {
									uid: this.$store.state.userInfo.user_id,
								}
							} )
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
		submitFormToRegister( formName ) {
			this.$refs[formName].validate( valid => {
				if ( valid ) {
					api_register( {
						username: this.form.username,
						password: this.form.password,
						telephone: this.form.telephone,
						email: this.form.email
					} ).then( res => {
						console.log( res );
						this.submitFormToLogin( formName );
					} ).catch(
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
	},
	mounted() {
		if ( this.uid ) {
			console.log( this.uid );
			console.log( this.$store.state.userInfo );
			if ( this.uid === this.$store.state.userInfo.user_id ) {
				this.form = this.$store.state.userInfo;
			}
		}
		
	},
}
</script>
