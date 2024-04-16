<script setup lang="ts">
</script>

<template>
  <div id="admin">
    <button @click="createReader">Tạo đọc giả</button>
    <div>
      <DataTable :value="readerData" tableStyle="min-width: 50rem">
    <Column field="MaDocGia" header="MaDocGia"></Column>
    <Column field="Ten" header="Ten"></Column>
    <Column field="DienThoai" header="DienThoai"></Column>
    <Column field="DiaChi" header="DiaChi"></Column>
</DataTable>
<DataTable :value="readerData" tableStyle="min-width: 50rem">
    <Column v-for="col of readerData" :key="col.field" :field="col.field" :header="col.header"></Column>
</DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref,computed, onMounted  } from "vue";
    import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
    import { useReaderStore } from "../../stores/reader";
    import { useRouter } from "vue-router";
    const router = useRouter();
    async function createReader(){
        router.replace({name:"createReader"})
    }
    const readerStore = useReaderStore();
    const reader = computed(()=>{
        return readerStore.listReaderData
    })
    console.log("check",reader)
    // async function getReader() {
      

    // }
    onMounted(async()=>{
      const readerData = await readerStore.getReader();
      return readerData
    })
    
</script>

<style scoped>
    #createReader .card{
        max-width: 40vw;
        margin: auto
    }
</style>