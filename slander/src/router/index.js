import Home from '@/pages/home'
import Notice from '@/pages/notice'
import Search from '@/pages/search'
import Dm from '@/pages/dm'
import DmDynamic from '@/pages/dmDynamic'
import Post from '@/pages/post'
import TrendPage from '@/pages/trendPage'


export default [
    {
      path: '/',
      component: Home
    },
    {
      path: '/notice',
      component: Notice
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/trend/:id',
      component: TrendPage
    },
    {
      path: '/dm',
      component: Dm
    },
    {
      path: '/dm/:id',
      component: DmDynamic
    },
    {
      path: '/post',
      component: Post
    }
]