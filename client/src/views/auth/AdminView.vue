<script setup lang="ts">
</script>

<template>
  <div id="admin">
    <v-btn @click="reader">Độc giả</v-btn>
    <v-btn @click="nxb">Nhà xuất bản</v-btn>
    <v-btn @click="book">Sách</v-btn>
    <v-btn @click="followBook">Mượn sách</v-btn>
  </div>
  <div>
    <FollowBookView></FollowBookView>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref } from "vue";
    import FollowBookView from "../followBook/FollowBookView.vue"
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
        router.replace({name:"borrow"})
    }
</script>

<style scoped>
    #createReader .card{
        max-width: 40vw;
        margin: auto
    }
</style>