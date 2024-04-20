<template>
    <div id="borrow">
      <div class="table-borow">
        <v-card
      title="Theo dõi mượn sách"
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
        :items="dataBorrow"
        :search="search"
        item-value="MaDocGia"
      return-object
      select-strategy="single"
      ></v-data-table>
      <!-- <v-data-table v-model="selected"
      show-select
        :headers="headers"
        :items="dataBorrow"
        :search="search"
        item-value="MaDocGia"
      return-object
      select-strategy="single"
      
      ></v-data-table> -->
    </v-card>
  </div>
  <div ><DetailViewBorrow :data=selected></DetailViewBorrow></div>
    </div>
  </template>
  
  <script>
     import { ref, onMounted } from "vue";
  import { useBorrowStore } from "../../stores/borrow";
  import DetailViewBorrow from "../../components/DetailViewBorrow.vue"
  
  export default {
    components:{
      DetailViewBorrow
    },
    setup() {
  
      const headers = [
        {
          align: 'start',
          key: 'MaDocGia',
          sortable: false,
          title: 'Mã độc giả',
        },
        { key: 'MaSach', title: 'Mã sách' },
        { key: 'NgayMuon', title: 'Ngày mượn' },
        { key: 'NgayTra', title: 'Ngày trả' },
        { key: 'DaTra', title: 'Trạng thái' }
      ];
      const selectedData = ref();
      const search = ref();
      const dataBorrow = ref();
      const borrowStore = useBorrowStore();
  
      onMounted(async () => {
        const borrowData = await borrowStore.getBorrow().then((data) => (dataBorrow.value = data));
        return borrowData;
      });
  
      return {
        headers,
        search,
        selected:selectedData,
        dataBorrow,
        DetailViewBorrow
      };
    }
  }
  
  </script>
  
  <style scoped>
      #borrow .table-borrow .card{
          max-width: 40vw;
          margin: auto
      }
  </style>