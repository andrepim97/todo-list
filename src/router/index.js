// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Login from '@/components/auth/Login.vue'
import TodoList from '../components/TodoList.vue'
import TodoItemForm from '@/components/TodoItemForm.vue'
import TodoItemShow from '@/components/TodoItemShow.vue'
import Register from '@/components/auth/Register.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  const checkAuth = () => {
    const user = auth.currentUser
    if (requiresAuth && !user) {
      next('/login')
    } else {
      next()
    }
  }

  if (auth.currentUser !== null) {
    // Já sabemos o estado do utilizador
    checkAuth()
  } else {
    // Esperamos até o Firebase confirmar o estado
    onAuthStateChanged(auth, () => {
      checkAuth()
    })
  }
})


export default router
