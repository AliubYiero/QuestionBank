<style scoped>

</style>

<template>
	<!-- TODO 当没有登录时，跳转到登录界面 -->
	<LoginAndRegister status="Login"/>
</template>

<script>
import LoginAndRegister from '@/components/LoginAndRegister.vue'

export default {
	name: "UserLogin",
	components: { LoginAndRegister },
}
</script>
