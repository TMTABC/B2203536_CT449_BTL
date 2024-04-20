import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import UserView from '@/views/auth/UserView.vue'
import { useAuthStore } from '@/stores/auth'
import AdminView from '@/views/auth/AdminView.vue'
import FormReader from '@/views/reader/FormReader.vue'
import ReaderView from '@/views/reader/ReaderView.vue'
import  BookView  from '@/views/books/BookView.vue'
import FormBook from '@/views/books/FormBook.vue';
import NXBView from '@/views/nxb/NXBView.vue';
import FormNXB from '@/views/nxb/FormNXB.vue';
import FormFollowBook from '@/views/followBook/FormFollowBook.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/admin',
      name:'admin',
      component: AdminView
    },
    {
      path:'/admin/nxb',
      name:'nxb',
      component: NXBView
    },
    {
      path:'/admin/nxb/createNXB',
      name:'createNXB',
      component: FormNXB
    },
    {
      path:'/admin/reader',
      name:'reader',
      component: ReaderView
    },
    {
      path:'/admin/reader/createReader',
      name:'createReader',
      component: FormReader
    },
    {
      path:'/admin/followbook',
      name:'followbook',
      component: FormReader
    },
    {
      path:'/admin/book',
      name:'book',
      component: BookView
    },
    {
      path:'/admin/book/createBook',
      name:'createBook',
      component: FormBook
    },
    {
      path:'/admin/book/borrow',
      name:'borrow',
      component: FormFollowBook
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{requiresGuest:true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta:{requiresGuest:true}
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta:{requiresAuth:true}
    }
  ]
})

router.beforeEach((to,from)=>{
  const store = useAuthStore()

  if(to.meta.requiresAuth && !store.isAuthenticated){
    return{name:"login",query:{redirect:to.fullPath}}
  }else if(to.meta.requiresGuest && store.isAuthenticated){
    return {name : "home"}
  }
})

export default router
