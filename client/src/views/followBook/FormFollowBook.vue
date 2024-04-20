<template>
  <div id="createBorrow">
    <div class="container">
        <div class="card card-body my-4">
            <h5 class="card-title">Mượn sách</h5>
            <form @submit.prevent="submit">
                <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
                    <label for="ma" class="form-label">Mã độc giả:</label>
                    <v-select :items="dataReader" v-model="borrowData.MaDocGia" ></v-select>
                    
                </div>
                <div class="mb-3">
                    <label for="ho" class="form-label">Mã Sách:</label>
                    <v-select :items="dataBook" v-model="borrowData.MaSach" ></v-select>
                    
                </div>
                <button type="submit" class="btn btn-success">Tạo</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, onMounted } from "vue";
import { useBorrowStore } from '../../stores/borrow';
import { useReaderStore } from "../../stores/reader";
import { useBookStore } from '../../stores/book';
import { useRouter } from "vue-router";

export default {
    components: {},
    props: {},
    name:"FileUpload",
    setup() {
        const bookStore = useBookStore();
        const readerStore = useReaderStore();
        const borrowStore = useBorrowStore();
        const router = useRouter();
        const dataReader = ref([]);
        const dataBook = ref([]);
        const borrowData = ref({ 
            MaDocGia: "",
            MaSach: "",
            DaTra: "Đang mượn",
        });
        const errorMessage = ref("");
        
        const submit = async () => {
            const doc = await borrowStore.createBorrow(borrowData.value)     
            .then(res => {
                    router.replace({ name: "admin" });
                })
                .catch(err => {
                    console.log(doc)
                    errorMessage.value = err.message;
                });
        };

        const getData = async () => {
            const readerData = await readerStore.getReader();
            readerData.forEach(element => {
                dataReader.value.push(element.MaDocGia);
            });
            const bookData = await bookStore.getBook();
            bookData.forEach(element => {
                dataBook.value.push(element.MaSach);
            });
            console.log("check reader ",dataReader.value,"check book", dataBook.value);
            return dataBook.value;
        };

        onMounted(() => {
            getData();
        });

        return { dataBook, errorMessage, submit, getData, dataReader,borrowData
            };
    }
};
</script>
<style scoped>
    #createBorrow .card{
        max-width: 40vw;
        margin: auto
    }
</style>