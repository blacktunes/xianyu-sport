import Vue from 'vue'
import VueRouter from 'vue-router'
import Sport from '../views/Sport'
import Login from '../views/Login'
import List from '../views/List'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Sport
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/list',
    component: List
  }
]

const router = new VueRouter({
  routes
})

export default router
