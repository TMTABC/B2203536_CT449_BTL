<template>
  <div id="reader">
    <v-btn @click="createNXB">Tạo nhà xuất bản</v-btn>
    <div class="table-reader">
      <v-card
    title="Nhà xuất bản"
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
      :items="dataNXB"
      :search="search"
      item-value="MaNXB"
    return-object
    select-strategy="single"
    ></v-data-table>
  </v-card>
</div>
<div ><DetailViewNXB :data=selected></DetailViewNXB></div>
  </div>
</template>

<script>
   import { ref, onMounted } from "vue";
import { useNXBStore } from "../../stores/nxb";
import { useRouter } from "vue-router";
import DetailViewNXB from "../../components/DetailViewNXB.vue"

export default {
  components:{
    DetailViewNXB
  },
  setup() {
    const router = useRouter();

    const headers = [
      {
        align: 'start',
        key: 'maNXB',
        sortable: false,
        title: 'Mã nhà xuất bản',
      },
      { key: 'nameNXB', title: 'Tên' },
      { key: 'addressNXB', title: 'Địa chỉ' },
    ];
    const selectedData = ref();
    const search = ref();
    const dataNXB = ref();
    const nxbStore = useNXBStore();

    onMounted(async () => {
      const nxbData = await nxbStore.getNXB().then((data) => (dataNXB.value = data));
      return nxbData;
    });

    const createNXB = async () => {
      router.replace({ name: "createNXB" });
    }
    return {
      headers,
      search,
      selected:selectedData,
      dataNXB,
      createNXB,
      DetailViewNXB
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