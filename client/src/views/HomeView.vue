<template>
  <div id="reader">
        <div class="container">
            <div v-if="readerData" class="card card-body mt-4">
                <h5 class="card-title">Mã độc giả : {{ readerData.MaDocGia }}</h5>
                <h6 class="card-subtitle mt-2 text-muted">Họ Lót :{{ readerData.HoLot }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Tên : {{ readerData.Ten }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Phái : {{ readerData.Phai }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Ngày sinh: {{ readerData.NgaySinh }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Địa chỉ: {{ readerData.DiaChi }}</h6>
                <h6 class="card-subtitle mt-2 text-muted">Số điện thoại : {{ readerData.DienThoai }}</h6>
            </div>
        </div>
    </div>
  <div id="book">
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
<div ><Borrow :data=selected></Borrow></div>
  </div>
</template>

<script>
   import { ref, onMounted } from "vue";
import { useBookStore } from "../stores/book";
import { useReaderStore } from "@/stores/reader";
import { useRouter } from "vue-router";
import Borrow from "../components/Borrow.vue"
export default {
  components:{
    Borrow
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
    const readerStore = useBookStore();

    onMounted(async () => {
      const bookData = await bookStore.getBook().then((data) => (dataBook.value = data));
      return {bookData};
    });

    return {
      headers,
      search,
      selected:selectedData,
      dataBook,Borrow
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