import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddPlaylist from '@/components/AddPlaylist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-playlist',
      name: 'AddPlaylist',
      component: AddPlaylist
    }
  ]
})
