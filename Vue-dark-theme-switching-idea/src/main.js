import { createApp } from 'vue'
import './style/style.css'
import App from './App.vue'

const app = createApp(App)
// 引入 pinia 状态管理插件
import { createPinia } from 'pinia'
app.use(createPinia())
// 引入 vue-router 路由
import router from './router/index.js'
app.use(router)

app.mount('#app')
