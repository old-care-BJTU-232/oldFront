import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('@v/login.vue')
  },
  {
    path: '/index',
    component:()=>import('@v/layout.vue'),
    children:[
      {
        path:'/index/screen',
        component:()=>import('@c/screen.vue')
      },
      {
        path:'/index/oldpeople',
        component:()=>import('@c/information/oldPeople.vue')
      },
      {
        path:'/index/worker',
        component:()=>import('@c/information/worker.vue')
      },
      {
        path:'/index/volunteer',
        component:()=>import('@c/information/volunteer.vue')
      },
      {
        path:'/index/emotion',
        component:()=>import('@c/detection/emotion.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
