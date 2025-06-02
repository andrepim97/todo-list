// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/auth/Login.vue'
import TodoList from '../components/TodoList.vue'
import TodoItemForm from '@/components/TodoItemForm.vue'
import TodoItemShow from '@/components/TodoItemShow.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: TodoList
  },
  {
    path: '/add',
    name: 'AddTodo',
    component: TodoItemForm
  },
  {
    path: '/show/:id',
    name: 'ShowTodo',
    component: TodoItemShow
  },

  {
    path: '/edit/:id',
    name: 'EditTodo',
    component: TodoItemForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
