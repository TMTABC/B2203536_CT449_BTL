<template>
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name:'home'}">Điều hướng</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar" aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="appNavbar">
      <ul  class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="isStaff" class="nav-item">
          <router-link :to = "{name:'admin'}" class="nav-link active" aria-current="page">Nhân viên</router-link>
        </li>
        <template v-else>
            <li  class="nav-item">
              <router-link :to = "{name:'home'}" class="nav-link active" aria-current="page">Trang chủ</router-link>
            </li>
        </template>
      </ul>
      <ul class="navbar-nav mx-2 mb-2 mb-lg-0">
        <li v-if="isAuthenticated" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ user.MSNV }}
          </a>
          <ul class="dropdown-menu">
            <li><router-link :to="{name : 'user'}" class="dropdown-item">Thông tin</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><button @click="logout" class="dropdown-item btn btn-danger">Đăng xuất</button></li>
            <li><hr class="dropdown-divider"></li>
          </ul>
        </li>
        <template v-else>
          <li v-if="isReader" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ reader.MaDocGia }}
            </a>
            <ul class="dropdown-menu">
              <li><router-link :to="{name : 'user'}" class="dropdown-item">Thông tin</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button @click="logout" class="dropdown-item btn btn-danger">Đăng xuất</button></li>
              <li><hr class="dropdown-divider"></li>
            </ul>
          </li>
          <template v-else>
            <li class="nav-item">
              <router-link :to = "{name:'login'}" class="nav-link active" aria-current="page">Đăng nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link :to = "{name:'loginReader'}" class="nav-link active" aria-current="page">Đăng nhập độc giả</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'register'}" class="nav-link active">Thêm nhân viên</router-link>
            </li>
          </template>
        </template>
      </ul>

    </div>
  </div>
</nav>
</template>

<script setup lang="ts">
    import { computed, reactive,ref } from "vue";
    import { useAuthStore} from '../stores/auth';
    import { useRouter } from "vue-router";
    import { useReaderStore, type LoginData } from '../stores/reader';

    const readerStore = useReaderStore();
    const router = useRouter()
    const authStore = useAuthStore()
    const user = computed(()=>{
        return authStore.userDetail
    })
    const reader = computed(()=>{
        return readerStore.userDetail
    })
    const isAuthenticated = computed(()=>{
      console.log(authStore.isAuthenticated)
      return authStore.isAuthenticated
    })
    const isReader = computed(()=>{
      return readerStore.isReader
    })
    const isStaff = computed(()=>{
      return authStore.isStaff
    })
    console.log(user)
    async function logout() {
      if(authStore.isStaff){
        await authStore.logout().then(res=>{
          router.replace({name:"home"})
        })
        .catch(err=>{
          console.log(err)
        })
      }else {
        await readerStore.logout().then(res=>{
          router.replace({name:"home"})
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
</script>
<style>
  .nav{
    width: 100vh;
  }
</style>