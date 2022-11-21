<script setup lang="ts">
import { useDark } from '@/scripts/index'

const mode = useDark()

const change = function (mode1: string): void {
  mode.value = mode1
}

</script>

<template>
  <div> {{ mode }} 主题</div>
  <button @click="change('light')">修改 light 按钮</button>
  <button @click="change('dark')">修改 dark 按钮</button>
  <button @click="change('coffee')">修改 coffee 按钮</button>
  <button @click="change('auto')">修改 auto 按钮</button>

</template>

<style scoped>

</style>
