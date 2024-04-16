<script setup lang="ts">
</script>

<template>
  <div id="createReader">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Tạo người đọc mới</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="ma" class="form-label">Mã độc giả:</label>
                    <input v-model="readerData.MaDocGia" type="text" class="form-control" id="maDocGia" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ho" class="form-label">Họ Lót:</label>
                    <input v-model="readerData.HoLot" type="text" class="form-control" id="hoLot" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ten" class="form-label">Tên:</label>
                    <input v-model="readerData.Ten" type="text" class="form-control" id="ten" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ngaySinh" class="form-label">Ngày sinh:</label>
                    <input v-model="readerData.NgaySinh" type="text" class="form-control" id="ngaySinh" autocomplete="off">
                    <label for="example-datepicker">Choose a date</label>
                    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
                    <p>Value: '{{ value }}'</p>
                </div>
                <div class="mb-3">
                    <label for="phai" class="form-label">Phái:</label>
                    <input v-model="readerData.Phai" type="text" class="form-control" id="phai" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="diaChi" class="form-label">Địa chỉ:</label>
                    <input v-model="readerData.DiaChi" type="text" class="form-control" id="diaChi" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ma" class="form-label">Điện thoại:</label>
                    <input v-model="readerData.DienThoai" type="text" class="form-control" id="dienThoai" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-success">Tạo</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import { useReaderStore, type Reader } from '../../stores/reader';
    import { useRouter } from "vue-router";

    const readerStore = useReaderStore();
    // const authStore = useAuthStore();
    const router = useRouter();
    const readerData = reactive<Reader>({
        MaDocGia:"",
        HoLot:"",
        Ten:"",
        NgaySinh:"",
        Phai:"",
        DiaChi:"",
        DienThoai:"",
    })
    // const loginData = reactive<LoginData>({
    //     MSNV:"",
    //     password : "",
    // })
    const errorMessage = ref<string>("")
    async function submit(){
        console.log(readerData);
        await readerStore.createReader(readerData)
        .then(res =>{
            router.replace({name:"admin"})
        })
        .catch(err=>{
            errorMessage.value = err.message
        })
    }
</script>

<style scoped>
    #createReader .card{
        max-width: 40vw;
        margin: auto
    }
</style>