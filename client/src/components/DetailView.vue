
<template>
    <Card style="width: 25rem; overflow: hidden">
        <template #header>
            <!-- <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" /> -->
        </template>
        <template #title>{{ data.MaDocGia }}</template>
        <template #subtitle>
            <div>
                {{ data.HoLot }}
                {{ data.Ten }}
            </div>
            {{ data.DienThoai }}
            {{ data.NgaySinh }}
            <div v-if="data.Phai==1">Nam</div>
            <div v-else>Nữ</div>
        </template>
        <template #content>
            <p class="m-0">
                {{ data.DiaChi }}
            </p>
        </template>
        <template #footer>
            <div class="flex gap-3 mt-1">
                <Button label="Hiệu chỉnh" severity="secondary" outlined class="w-full" />
                <Button label="Xóa" class="w-full" />
            </div>
        </template>
    </Card>
</template>

<script>
    import Card from 'primevue/card';
    import Button from 'primevue/button';
    export default {
        props: {
            data:{type:Object,required:true}
        },
        components:{
            Card,
            Button
        },
        methods: {
            async getData(){
                console.log("Check data",this.data)
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>