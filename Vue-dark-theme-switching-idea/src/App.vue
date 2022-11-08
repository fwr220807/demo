<template>
	<Navbar></Navbar>
	<Content></Content>
</template>

<script setup>
import Navbar from '@/components/Navbar/index.vue'
import Content from '@/components/Content/index.vue'
import { useThemesStore } from '@/store/themes'

// 主题切换
const ThemesStore = useThemesStore()
// 初始添加主题
ThemesStore.initCurrentTheme()
// 如果初始化回调函数有值，才添加监听器
ThemesStore.$state.callback && ThemesStore.addListener()
// 初始添加主题样式
ThemesStore.initThemeCSS(document.documentElement)
// 监听仓库中的 currentTheme 值，通过它改变总主题
ThemesStore.$subscribe(({ events }) => {
	document.documentElement.classList.remove(events.oldValue)
	document.documentElement.classList.add(events.newValue)
})
</script>

<style scoped></style>
