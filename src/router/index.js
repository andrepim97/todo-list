// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Login from '@/components/auth/Login.vue'
import TodoList from '../components/TodoList.vue'
import TodoItemForm from '@/components/TodoItemForm.vue'
import TodoItemShow from '@/components/TodoItemShow.vue'
import Register from '@/components/auth/Register.vue'
import Profile from '@/components/Profile.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: TodoList,
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'AddTodo',
    component: TodoItemForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/show/:id',
    name: 'ShowTodo',
    component: TodoItemShow,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'EditTodo',
    component: TodoItemForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthPage = ['Login', 'Register'].includes(to.name)

  const user = auth.currentUser

  if (user !== null) {
    if (requiresAuth && !user) {
      next('/login')
    } else if (user && isAuthPage) {
      next('/')
    } else {
      next()
    }
  } else {
    // Se ainda não sabemos se está autenticado, aguardamos evento uma vez
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe() // para não ouvir mais vezes

      if (requiresAuth && !firebaseUser) {
        next('/login')
      } else if (firebaseUser && isAuthPage) {
        next('/')
      } else {
        next()
      }
    })
  }
})

export default router
