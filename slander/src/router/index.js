import Home from '@/pages/home'
import Notice from '@/pages/notice'
import Search from '@/pages/search'
import Dm from '@/pages/dm'
import DmDynamic from '@/pages/dmDynamic'
import Post from '@/pages/post'
import TrendPage from '@/pages/trendPage'
import Call from '@/pages/call'
import Profile from '@/pages/profile'
import Logout from '@/pages/logout'


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
    },
    {
      path: '/call',
      component:Call
    },
    {
      path: '/profile',
      component:Profile
    },
    {
      path: '/logout',
      component:Logout
    },

]