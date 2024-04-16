<script setup lang="ts">
</script>

<template>
  <div id="createBook">
    <button @click="createBook">Tạo sách</button>
    <button @click="createBook">Tạo sách</button>
    
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
    import { useRouter } from "vue-router";
    const router = useRouter();
    async function createBook(){
        router.replace({name:"createBook"})
    }
    
</script>

<style scoped>
    #createBook .card{
        max-width: 40vw;
        margin: auto
    }
</style>