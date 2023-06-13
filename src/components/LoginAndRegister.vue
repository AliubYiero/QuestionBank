<template>
	<el-form :rules="rules" :model="form" ref="loginForm">
		<!-- 傻逼for判断 -->
		<template v-if="status === 'Login'">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-button @click="submitForm('loginForm')">登录</el-button>
			<el-button @click="$router.push('/register')">没有账号，前往注册</el-button>
		</template>
		<template v-else-if="status === 'Register'">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="telephone">
				<el-input v-model="form.telephone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-button @click="submitForm('registerForm')">注册</el-button>
		</template>
		<template v-else-if="status === 'Info'">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="telephone">
				<el-input v-model="form.telephone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="权限" prop="right">
				<el-input type="email" v-model="form.rights" disabled></el-input>
			</el-form-item>
		</template>
	
	</el-form>
</template>

<script>
export default {
	name: "LoginAndRegister",
	
	props: {
		status: {
			title: 'Login' | 'Register' | 'Info'
		},
	},
	data() {
		return {
			// 表单验证项
			rules: {
				username: [
					{ required: true, message: '请输入用户名' },
					{ max: 10, message: '最长为10个字符' },
				],
				password: [
					{ required: true, message: '请输入密码' },
				],
				telephone: [
					{ min: 11, max: 11, message: '请输入11位手机号' },
				],
				email: [],
			},
			form: {
				username: '',
				password: '',
				telephone: '',
				email: '',
				rights: '',
			}
		}
	},
	
	methods: {
		submitForm( formName ) {
			this.$refs[formName].validate( ( valid ) => {
				if ( valid ) {
					alert( 'submit!' );
					// todo 后端返回的nanoid
					let user_id = '1234567';
					this.$router.push( `/personal-space?${ user_id }` );
				} else {
					console.log( 'error submit!!' );
					return false;
				}
			} );
		},
		
	},
	
	
}
</script>

<style scoped>

</style>
