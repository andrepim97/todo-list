// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TodoItemForm from '@/components/TodoItemForm.vue'
import TodoItemShow from '@/components/TodoItemShow.vue'

const routes = [
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
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
