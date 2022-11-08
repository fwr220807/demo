import { createRouter, createWebHashHistory } from 'vue-router'
import Content from '@/components/Content/index.vue'
const Home = () => import('@/pages/Home/index.vue')
const Article = () => import('@/pages/Article/index.vue')

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: Content,
			redirect: '/home',
			children: [
				// 首页
				{
					path: 'home',
					name: 'Home',
					component: Home,
					meta: { title: 'home', describe: '' },
				},

				// 文章页
				{
					path: 'article',
					name: 'Article',
					component: Article,
					meta: { title: 'article', message: '文章' },
				},
			],
		},
	],
})

export default router
