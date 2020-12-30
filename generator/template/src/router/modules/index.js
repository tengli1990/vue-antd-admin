const IndexRouter = {
  name: 'Welcome',
  path: '/welcome',
  component: () => import('@/views/index/Welcome'),
  meta: {
    title: '首页',
    icon: 'desktop',
    permission: true
  }
}

export default IndexRouter
