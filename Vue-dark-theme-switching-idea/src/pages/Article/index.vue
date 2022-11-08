<template>
	<div v-html="md" class="markdown-body" ref="markdown"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 引入主题仓库
import { useThemesStore } from '@/store/themes'
// md 为具有 html 结构的文本
const md = ref(`<h2>这是文章标题<h2>
    <p>我是文章的内容，用于示例展示</p>`)
// 获取 dom
const markdown = ref(null)
// 仓库
const ThemesStore = useThemesStore()
// 挂载后才能获取 dom
onMounted(() => {
	// 初始添加主题样式
	ThemesStore.initThemeCSS(markdown.value)
	// 监听仓库中的 currentTheme 值，通过它改变 markdown 主题
	ThemesStore.$subscribe(({ events }) => {
		markdown.value.classList.remove(events.oldValue)
		markdown.value.classList.add(events.newValue)
	})
})
</script>

<style scoped>
.markdown-body {
	background-color: transparent;
}
</style>
