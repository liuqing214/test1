import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>import('@/components/Login')
const Home = () => import('@/components/Home')

  const routes = [
    {
      path: '/', 
      redirect: '/login' 
    },
    {
      path: '/login', 
      name: 'Login',
      component: Login,
      meta: { 
        title: '登录' 
      } 
    },
    { 
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { 
        title: '首页' 
      } 
    }
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path = '/login') {
//     return next()
//   }
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   } else{
//     return next()
//   }
// })

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})

export default router
