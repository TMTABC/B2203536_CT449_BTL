<template>
    <div id="user">
        <div class="container">
            <div v-if="user" class="card card-body mt-4">
                <h5 class="card-title">MSNV : {{ user.MSNV }}</h5>
                <h6 class="card-subtitle mt-2 text-muted">Ho va ten :{{ user.HoTen }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Chuc vu : {{ user.ChucVu }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">So dien thoai : {{ user.SoDienThoai }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Dia chi: {{ user.DiaChi }}</h6>
            </div>
        </div>
    </div>
</template>

<script async setup lang="ts">
    import { computed, onMounted } from "vue";
    import { useAuthStore} from '../../stores/auth';

    const authStore = useAuthStore()
    const user = computed(()=>{
        return authStore.userDetail
    })
    console.log(user)
    async function getUser() {
        await authStore.getUser()
    }
    onMounted(async()=>{
        await getUser()
    })
    
</script>
<style scoped>
    #user .card{
        max-width: 40vw;
        margin: auto;
    }
</style>