<script setup lang="ts">
</script>

<template>
  <div id="admin">
    <button @click="reader">Đọc giả</button>
    <button @click="nxb">Nhà xuất bản</button>
    <button @click="book">Sách</button>
    <button @click="followBook">Mượn sách</button>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    
    import { useRouter } from "vue-router";
    const router = useRouter();
    async function reader(){
        router.replace({name:"reader"})
    }
    async function nxb(){
        router.replace({name:"nxb"})
    }
    async function book(){
        router.replace({name:"book"})
    }
    async function followBook(){
        router.replace({name:"followBook"})
    }
</script>

<style scoped>
    #createReader .card{
        max-width: 40vw;
        margin: auto
    }
</style>