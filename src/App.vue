<style lang="scss">
.main-container {
	// 设置基础宽高: width & height
	@mixin baseSize {
		$width: 60%;
		$height: null;
		width: $width or auto;
		height: $height or auto;
	}
	// 设置位置坐标: position
	@mixin position {
		margin: 0 auto;
	}
	/* 设置位置坐标: position */
	@include position;
	/* 设置基础宽高: width & height */
	@include baseSize;
}

</style>

<template>
	<el-container>
		<el-header>
			<header-nav/>
		</el-header>
		
		<el-main class="main-container">
			<router-view/>
		</el-main>
	</el-container>
</template>

<script>
import HeaderNav from '@/components/HeaderNav.vue'

export default {
	components: { HeaderNav },
}
</script>
