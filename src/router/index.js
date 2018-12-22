import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddPlaylist from '@/components/AddPlaylist'
import EditPlaylist from '@/components/EditPlaylist'

import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'

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
      component: AddPlaylist,
      props: true
    },
    {
      path: '/edit-playlist/:playlist_slug',
      name: 'EditPlaylist',
      component: EditPlaylist
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
