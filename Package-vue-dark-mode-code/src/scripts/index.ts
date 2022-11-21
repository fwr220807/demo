import { unref, watch, watchEffect, ref } from 'vue';
import type { Ref } from 'vue';

type MaybeRef<T> = Ref<T> | T

/**
 * 检测系统是否是黑暗主题的响应式
 * 返回一个值，如果当前系统是黑暗主题，则返回 true，否则返回 false
*/
export const usePreferredDark = function (): Ref<boolean> {
    const matches = ref(false)
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    matches.value = mediaQueryList.matches

    mediaQueryList.addEventListener('change', (value) => {
        matches.value = value.matches
    })

    return matches
}

/**
 * 持久化存储并进行响应式处理
 * 返回一个值，可以通过它获取或修改 localStorage 中对应的值
*/
export const useStorage = function (key: MaybeRef<string>, value: MaybeRef<string>): Ref<string> {
    const refValue = ref(value)

    localStorage.setItem(unref(key), refValue.value)

    watch(refValue, (value) => {
        localStorage.setItem(unref(key), value)
    })

    // 暴露 refValue，使得可以获取，也可以修改
    return refValue
}

/**
 * 设置系统主题响应式化
 * 通过 mode 来控制主题的切换
 * 通过 isDark 控制在 auto 主题下的自动切换
 * 有 auto，light，dark 主题
*/
export const useDark = function (): Ref<string> {
    const value = localStorage.getItem('color-scheme')
    // 检测持久化存储是否已经存储模式，如果有，则使用
    const mode = useStorage('color-scheme', value ? value : 'auto')
    const isDark = usePreferredDark()
    // 用于存储上一次的结果，初始化为空字符串
    let oldMode: string = ''

    watchEffect(() => {
        // 清除上一次添加的主题样式
        if (oldMode) {
            document.documentElement.classList.remove(oldMode)
        }

        if (mode.value === 'auto') {
            if (isDark.value) {
                document.documentElement.classList.add('dark')
                oldMode = 'dark'
            } else {
                document.documentElement.classList.remove('dark')
                oldMode = 'light'
            }
        } else {
            document.documentElement.classList.add(mode.value)
            oldMode = mode.value
        }
    })

    return mode
}