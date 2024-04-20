<template>
  <div id="createBook">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Tạo sách mới</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="ma" class="form-label">Mã sách:</label>
                    <input v-model="bookData.MaSach" type="text" class="form-control" id="maDocGia" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="ten" class="form-label">Tên sách:</label>
                    <input v-model="bookData.TenSach" type="text" class="form-control" id="hoLot" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="gia" class="form-label">Đơn giá:</label>
                    <input v-model="bookData.DonGia" type="text" class="form-control" id="ten" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="soquyen" class="form-label">Sổ quyển:</label>
                    <input v-model="bookData.SoQuyen" type="number" class="form-control" id="ngaySinh" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="namxb" class="form-label">Năm xuất bản:</label>
                    <input v-model="bookData.NamXuatBan" type="text" class="form-control" id="phai" autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="maNXB" class="form-label">Mã nhà xuất bản:</label>
                    <v-select :items="dataNXB" v-model="bookData.MaNXB" ></v-select>
                </div>
                <div class="mb-3">
                    <label for="tacgia" class="form-label">Tác giả:</label>
                    <input v-model="bookData.TacGia" type="text" class="form-control" id="dienThoai" autocomplete="off">
                </div>
                <!-- <div>
                    <v-file-input
                    v-model="bookData.Anh"
                        density="compact"
                        label="Chọn file ảnh sách"
                    ></v-file-input>
                </div> -->
                <button type="submit" class="btn btn-success">Tạo</button>
            </form>
        </div>
        <div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, onMounted } from "vue";
import { useBookStore } from '../../stores/book';
import { useNXBStore } from "../../stores/nxb";
import { useRouter } from "vue-router";

export default {
    components: {},
    props: {},
    name:"FileUpload",
    setup() {
        const bookStore = useBookStore();
        const router = useRouter();
        const dataNXB = ref([]);
        const bookData = ref({ 
            MaSach: "",
            TenSach: "",
            DonGia: "",
            SoQuyen: "",
            NamXuatBan: "",
            MaNXB: "",
            TacGia: "",
            Anh:""
        });
        const errorMessage = ref("");

        const submit = async () => {
            console.log(bookData.value);
            await bookStore.createBook(bookData.value)
                .then(res => {
                    router.replace({ name: "book" });
                })
                .catch(err => {
                    errorMessage.value = err.message;
                });
        };

        const getDataNXB = async () => {
            const nxbStore = useNXBStore();
            const nxbData = await nxbStore.getNXB();
            nxbData.forEach(element => {
                dataNXB.value.push(element.maNXB);
            });
            console.log("check nxb", dataNXB.value);
            return dataNXB.value;
        };

        onMounted(() => {
            getDataNXB();
        });
        //upload File
        const file = ref<File | null>();
        const form = ref<HTMLFormElement>();

        function onFileChanged($event: Event) {
            const target = $event.target as HTMLInputElement;
            if (target && target.files) {
                file.value = target.files[0];
            }
        }

        async function saveImage() {
            if (file.value) {
                try {
                // save file.value
                } catch (error) {
                    console.error(error);
                    form.value?.reset();
                    file.value = null;
                }
            }
        };

        return { bookData, errorMessage, submit, getDataNXB, dataNXB,saveImage,
            onFileChanged, };
    }
};

</script>

<style scoped>
    #createBook .card{
        max-width: 40vw;
        margin: auto
    }
</style>