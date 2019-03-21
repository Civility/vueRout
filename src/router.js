import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'

import AuthGuard from './auth-guard'
import Home from '@/components/Home'
// import About from '@/views/About'
import Product from '@/views/Product/Product'
import NewProduct from '@/views/Product/NewProduct'
import ProductList from '@/views/Product/ProductList'
import Checkout from '@/views/User/Checkout'
import Login from '@/views/Auth/Login'
import Register from '@/views/Auth/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/product/:id',
      props: true, // передача id  как параметра в компонент
      name: 'product',
      component: Product
    },
    {
      path: '/list',
      name: 'list',
      component: ProductList,
      beforeEnter: AuthGuard // защита роутинга 
    },
    {
      path: '/new',
      name: 'new',
      component: NewProduct,
      beforeEnter: AuthGuard
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },     
  ]
})
