import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '审批'
      }
    }

  ]
}
