import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/dashboard', // Ruta padre (LayoutDash)
    name: 'LayoutDash',
    component: () => import('@/views/LayoutDash.vue'),
    children: [
      {
        path: '', // Ruta predeterminada para /dashboard
        name: 'DashboardHome',
        component: () => import('@/views/prueba.vue'),
      },
      {
        path: 'profile', // Ruta hija relativa (se convierte en /dashboard/profile)
        name: 'Profile',
        component: () => import('@/views/session/ProfileView.vue'),
      },
      {
        path: 'booklist',
        name: 'BookList',
        component: () => import('@/views/books/BookList.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
