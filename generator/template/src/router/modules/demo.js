import { PageView } from '@/components/layouts'
import * as PERMISSION from '@/utils/constant/permission'

const VisualRouter = {
  name: 'Visual',
  path: '/visual',
  component: PageView,
  redirect: '/visual/data',
  meta: {
    title: '大屏展示',
    icon: 'fund',
    permission: true
  },
  children: [
    {
      name: '数据大屏',
      path: '/visual/data',
      component: () => import('@/views/visual/Data'),
      meta: {
        title: '数据大屏',
        permission: PERMISSION.VISUAL_DATA.id
      }
    }
  ]
}

export default VisualRouter
