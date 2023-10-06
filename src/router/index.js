import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/DashBoard.vue')
  },
  {
    path: '/demo01',
    name: 'demo01',
    component: () =>
      import(/* webpackChunkName: "demo01" */ '../views/Demo01.vue')
  },
  {
    path: '/demo02',
    name: 'demo02',
    component: () =>
      import(/* webpackChunkName: "demo02" */ '../views/Demo02.vue')
  },
  {
    path: '/clip',
    name: 'CLIP',
    component: () =>
      import(/* webpackChunkName: "demo02" */ '../views/Clip.vue')
  }
  //demo03
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
