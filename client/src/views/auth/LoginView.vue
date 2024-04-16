<script setup lang="ts">
</script>

<template>
  <div id="login">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Login</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="msnv" class="form-label">MSNV :</label>
                    <input v-model="loginData.MSNV" type="text" class="form-control" id="msnv" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">password</label>
                    <input v-model="loginData.password" type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-success">Login</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import { useAuthStore, type LoginData } from '../../stores/auth';
    import { useRouter } from "vue-router";

    const authStore = useAuthStore();
    const router = useRouter();

    const loginData = reactive<LoginData>({
        MSNV:"",
        password : "",
    })
    const errorMessage = ref<string>("")
    async function submit(){
        await authStore.login(loginData)
        .then(res =>{
            router.replace({name:"admin"})
        })
        .catch(err=>{
            errorMessage.value = err.message
        })
    }
</script>

<style scoped>
    #login .card{
        max-width: 40vw;
        margin: auto
    }
</style>