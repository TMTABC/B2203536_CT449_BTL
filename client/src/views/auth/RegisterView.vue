<script setup lang="ts">
</script>

<template>
  <div id="register">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Register</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="MSNV" class="form-label">MSNV :</label>
                    <input v-model="registerData.MSNV" type="text" class="form-control" id="MSNV" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="usename" class="form-label">Ho va Ten :</label>
                    <input v-model="registerData.HoTen" type="text" class="form-control" id="usename">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">password</label>
                    <input v-model="registerData.password" type="password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="pasword_confirm" class="form-label">password confirm:</label>
                    <input v-model="registerData.password_confirm" type="password" class="form-control" id="password_confirm">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">So Dien Thoai :</label>
                    <input v-model="registerData.SoDienThoai" type="text" class="form-control" id="phone">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Dia Chi :</label>
                    <input v-model="registerData.DiaChi" type="text" class="form-control" id="address">
                </div>
                <div class="mb-3">
                    <label for="ChucVu" class="form-label">Chuc Vu :</label>
                    <input v-model="registerData.ChucVu" type="text" class="form-control" id="ChucVu">
                </div>
                <button type="submit" class="btn btn-success">Register</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import { useAuthStore, type RegisterData } from '../../stores/auth';
    import { useRouter } from "vue-router";

    const authStore = useAuthStore();
    const router = useRouter();

    const registerData = reactive<RegisterData>({
        MSNV:"",
        HoTen:"",
        password : "",
        password_confirm:"",
        DiaChi:"",
        SoDienThoai:"",
        ChucVu:"",
    })
    const errorMessage = ref<string>("")
    
    async function submit(){
        console.log(registerData)
        await authStore.register(registerData)
        .then(res =>{
            router.replace({name:"login"})
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