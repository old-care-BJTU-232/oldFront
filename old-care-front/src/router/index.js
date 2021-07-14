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
        component:()=>import('@c/screen/screen.vue')
      },
      {
        path:'/index/screen2',
        component:()=>import('@c/screen/screen2.vue')
      },
      {
        path:'/index/screen3',
        component:()=>import('@c/screen/screen3.vue')
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
        path:'/index/event/:type',
        component:()=>import('@c/detection/event.vue')
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
