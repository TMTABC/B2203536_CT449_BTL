<template>
    <div id="book">
      <v-btn @click="createBook">Tạo sách</v-btn>
      <div class="table-book">
        <v-card
      title="Sách"
      flat
    >
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>
  
      <v-data-table
      v-model="selected"
      show-select
        :headers="headers"
        :items="dataBook"
        :search="search"
        item-value="MaSach"
      return-object
      select-strategy="single"
      ></v-data-table>
    </v-card>
  </div>
  <div ><DetailViewBook :data=selected></DetailViewBook></div>
    </div>
  </template>
  
  <script>
     import { ref, onMounted } from "vue";
  import { useBookStore } from "../../stores/book";
  import { useRouter } from "vue-router";
  import DetailViewBook from "../../components/DetailViewBook.vue"
  
  export default {
    components:{
      DetailViewBook
    },
    setup() {
      const router = useRouter();
  
      const headers = [
        {
          align: 'start',
          key: 'MaSach',
          sortable: false,
          title: 'Mã sách',
        },
        { key: 'TenSach', title: 'Tên sách' },
        { key: 'DonGia', title: 'Đơn giá' },
        { key: 'SoQuyen', title: 'Số quyển' },
        { key: 'NamXuatBan', title: 'Năm xuất bản' },
        { key: 'TacGia', title: 'Tác giả' },
      ];
      const selectedData = ref();
      const search = ref();
      const dataBook = ref();
      const bookStore = useBookStore();
  
      onMounted(async () => {
        const bookData = await bookStore.getBook().then((data) => (dataBook.value = data));
        return bookData;
      });
  
      const createBook = async () => {
        router.replace({ name: "createBook" });
      }
      return {
        headers,
        search,
        selected:selectedData,
        dataBook,
        createBook,
        DetailViewBook
      };
    }
  }
  
  </script>
  
  <style scoped>
      #reader .table-reader .card{
          max-width: 40vw;
          margin: auto
      }
  </style>