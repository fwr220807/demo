<template>
	<nav>
		<a @click="changeTheme">切换主题按钮1</a>
		<router-link to="/home">主页</router-link>
		<router-link to="/article">文章</router-link>
	</nav>
</template>

<script setup>
import { useThemesStore } from '@/store/themes'
// 控制深色模式的开关
// 逻辑: 默认跟随系统变化 -> 如果点击，则实现手动切换，以后每次打开都会按照这个切换的来
const ThemesStore = useThemesStore()
const changeTheme = function () {
	// 如果有回调函数，则取消监听
	ThemesStore.$state.callback && ThemesStore.removeListener()
	ThemesStore.changeTheme()
}
</script>

<style scoped>
nav {
	position: fixed;
	left: 0;
	top: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

nav a {
	flex: 1;
	cursor: pointer;
	user-select: none;
}
</style>
