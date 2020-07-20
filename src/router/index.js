import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>import('@/components/Login')
const Home = () => import('@/components/Home')
const Welcome = () => import('@/components/Welcome')
const User = () => import('@/components/user/User')


  const routes = [
    {
      path: '/', 
      redirect: '/login' 
    },
    {
      path: '/login', 
      name: 'Login',
      component: Login,
      // meta: { 
      //   title: '登录' 
      // } 
    },
    { 
      path: '/home',
      name: 'Home',
      redirect: '/welcome',
      component: Home,
      // meta: { 
      //   title: '首页' 
      // },
      children: [
        {
          path: '/welcome', 
          component: Welcome, 
          name: 'Welcome'
        },
        {
          path: '/user',
          component: User,
          name: 'User'
        }
      ] 
    }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//导航守卫 > 在地址栏不能直接输入地址跳转页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  } else{
    return next()
  }
})
//导航守卫 > 在标题栏显示对应名称
// router.beforeEach((to, from, next) => {
//   document.title = to.matched[0].meta.title
//   next()
// })

export default router
