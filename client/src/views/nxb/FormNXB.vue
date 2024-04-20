<script setup lang="ts">
</script>

<template>
  <div id="createNXB">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Tạo nhà xuất bản mới</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="ma" class="form-label">Mã nhà xuất bản:</label>
                    <input v-model="nxbData.maNXB" type="text" class="form-control" id="maDocGia" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ho" class="form-label">Tên nhà xuất bản:</label>
                    <input v-model="nxbData.nameNXB" type="text" class="form-control" id="hoLot" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ten" class="form-label">Địa chỉ nhà xuất bản:</label>
                    <input v-model="nxbData.addressNXB" type="text" class="form-control" id="ten" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-success">Tạo</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import { useNXBStore, type NXB } from '../../stores/nxb';
    import { useRouter } from "vue-router";

    const nxbStore = useNXBStore();
    const router = useRouter();
    const nxbData = reactive<NXB>({
        maNXB:"",
	nameNXB: "",
	addressNXB: ""
    })
    const errorMessage = ref<string>("")
    async function submit(){
        console.log(nxbData);
        await nxbStore.createNXB(nxbData)
        .then(res =>{
            router.replace({name:"nxb"})
        })
        .catch(err=>{
            errorMessage.value = err.message
        })
    }
</script>

<style scoped>
    #createNXB .card{
        max-width: 40vw;
        margin: auto
    }
</style>