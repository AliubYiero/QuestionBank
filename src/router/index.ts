import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


Vue.use( VueRouter )

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'personalSpace',
		component: () => import('../views/PersonalSpace.vue')
	},
	{
		path: '/question-bank',
		name: 'questionBank',
		component: () => import('../views/QuestionBank.vue')
	},
	{
		path: '/login',
		name: 'userLogin',
		component: () => import('../views/UserLogin.vue')
	},
	{
		path: '/register',
		name: 'userRegister',
		component: () => import('../views/UserRegister.vue')
	},
]

const router = new VueRouter( {
	mode: 'history',
	base: process.env.BASE_URL,
	routes
} )

export default router
