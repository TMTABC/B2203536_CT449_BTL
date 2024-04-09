import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import UserView from '@/views/auth/UserView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
