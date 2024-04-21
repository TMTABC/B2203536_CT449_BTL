<template>
  <div id="login">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Đăng nhập độc giả</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="msnv" class="form-label">Mã độc giả :</label>
                    <input v-model="loginData.MaDocGia" type="text" class="form-control" id="msnv" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu</label>
                    <input v-model="loginData.password" type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-success">Đăng nhập</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import { useReaderStore, type LoginData } from '../../stores/reader';
    import { useRouter } from "vue-router";

    const readerStore = useReaderStore();
    const router = useRouter();

    const loginData = reactive<LoginData>({
        MaDocGia:"",
        password : "",
    })
    const errorMessage = ref<string>("")
    async function submit(){
        await readerStore.login(loginData)
        .then(res =>{
            router.replace({name:"home"})
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