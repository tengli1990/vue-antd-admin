import { UserLayout } from '@/components/layouts'
const LoginRouter = {
  path: '/user',
  name: 'User',
  component: UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [
    {
      path: 'login',
      name: 'UserLogin',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      meta: {
        title: '登录',
        verification: false
      }
    }
  ]
}

export default LoginRouter
