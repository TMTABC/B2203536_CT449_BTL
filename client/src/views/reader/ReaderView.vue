<template>
  <div id="reader">
    <v-btn @click="createReader">Tạo độc giả</v-btn>
    <div class="table-reader">
      <v-card
    title="Độc giả"
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
      :items="dataReader"
      :search="search"
      item-value="MaDocGia"
    return-object
    select-strategy="single"
    ></v-data-table>
  </v-card>
</div>
<div ><DetailView :data=selected></DetailView></div>
  </div>
</template>

<script>
   import { ref, onMounted } from "vue";
import { useReaderStore } from "../../stores/reader";
import { useRouter } from "vue-router";
import DetailView from "../../components/DetailView.vue"

export default {
  components:{
    DetailView
  },
  setup() {
    const router = useRouter();

    const headers = [
      {
        align: 'start',
        key: 'MaDocGia',
        sortable: false,
        title: 'Mã độc giả',
      },
      { key: 'Ten', title: 'Tên' },
      { key: 'DiaChi', title: 'Địa chỉ' },
      { key: 'DienThoai', title: 'Điện thoại' }
    ];
    const selectedData = ref();
    const search = ref();
    const dataReader = ref();
    const readerStore = useReaderStore();

    onMounted(async () => {
      const readerData = await readerStore.getReader().then((data) => (dataReader.value = data));
      return readerData;
    });

    const createReader = async () => {
      router.replace({ name: "createReader" });
    }
    return {
      headers,
      search,
      selected:selectedData,
      dataReader,
      createReader,
      DetailView
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