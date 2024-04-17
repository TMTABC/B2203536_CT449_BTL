<template>
  <div id="reader">
    <button @click="createReader">Tạo độc giả</button>
    <div class="table-reader">
      <DataTable 
              selectionMode="single" 
              dataKey="MaDocGia" 
              :value="dataReader" 
              @row-click="getDataIndex"
              tableStyle="min-width: 50rem" >
        <Column field="MaDocGia" header="Mã độc giả"></Column>
        <Column field="Ten" header="Tên"></Column>
        <Column field="DienThoai" header="Điện thoại"></Column>
        <Column field="DiaChi" header="Địa chỉ"></Column>
        <!-- <Column  v-for="col of dataReader" :key="col.field" :field="col.field" :header="col.header"></Column> -->
      </DataTable>
    </div>
    <data v-if="selectedData"><DetailView :data="selectedData.data"></DetailView></data>
    <div>
      <Listbox v-model="dataReader" :options="dataReader" filter optionLabel="MaDocGia" class="w-full md:w-14rem" />
    </div>
  </div>
</template>

<script setup>
    import { reactive,ref,computed, onMounted  } from "vue";
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import Listbox from 'primevue/listbox';
    import { useReaderStore } from "../../stores/reader";
    import { useRouter } from "vue-router";
    import DetailView from "../../components/DetailView.vue"

    const router = useRouter();
    async function createReader(){
        router.replace({name:"createReader"})
    }

    const selectedData = ref(null)
    const getDataIndex =  async(event)=>{
      selectedData.value=event
      console.log(typeof(event))
      console.log("select ",selectedData)
      //getData()
    }
    const getData=()=>{
      console.log("data reader",dataReader[selectedData])
    }
    const dataReader = ref();
    const readerStore = useReaderStore();
    onMounted(async()=>{
      const readerData = await readerStore.getReader().then((data)=>(dataReader.value=data));
      return readerData
    })
</script>

<style scoped>
    #reader .table-reader .card{
        max-width: 40vw;
        margin: auto
    }
</style>