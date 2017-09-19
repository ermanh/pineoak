import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Projects from '@/components/Projects'
import Texts from '@/components/Texts'
import Sentences from '@/components/Sentences'
import Editor from '@/components/Editor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/projects/:name',
      name: 'Texts',
      component: Texts
    },
    {
      path: '/projects/:name/:text',
      name: 'Sentences',
      component: Sentences
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    }
  ]
})
