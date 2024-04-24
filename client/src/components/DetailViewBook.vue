
<template>
    <v-sheet v-if="data" class="mx-auto" width="300">
<v-form ref="form">
 <v-text-field
   v-model="data[0].MaSach"
   :rules="nameRules"
   :counter="8"
   label="Mã sách"
   required
 ></v-text-field>
 <v-text-field
   v-model="data[0].TenSach"
   :rules="otherRules"
   label="Tên sách"
   required
 ></v-text-field>
 <v-text-field
   v-model="data[0].DonGia"
   :rules="otherRules"
   label="Đơn giá"
   required
 ></v-text-field>
 <v-text-field
   v-model="data[0].TacGia"
   :rules="otherRules"
   label="Tác giả"
   required
 ></v-text-field>
 <v-text-field
   v-model="data[0].N"
   :rules="otherRules"
   label="Đơn giá"
   required
 ></v-text-field>
 
 <div class="d-flex flex-column">
   <v-btn
     class="mt-4"
     color="success"
     block
     @click="updateNXB(data[0])"
   >
     Cập nhật
   </v-btn>

   <v-btn
     class="mt-4"
     color="error"
     block
     @click="deleteNXB(data[0])"
   >
     Xóa độc giả
   </v-btn>

   <v-btn
     class="mt-4"
     color="warning"
     block
     @click="reset"
   >
   Xóa dữ liệu mẫu điền
   </v-btn>
 </div>
</v-form>
</v-sheet>
<div v-else></div>
</template>

<script>
import { useRouter } from "vue-router";
import { useNXBStore } from "../stores/nxb";
   export default {
       components:{
          
       },
       props: {
           data:{type:Object,required:true}
       },
       setup:()=>({
           name: '',
     nameRules: [
       v => !!v || 'yêu cầu nhập tên',
     ],
     otherRules: [
       v => !!v || 'Chưa nhập',
     ],
     select: null,
     checkbox: false,
       }),
      
       methods: {
           updateNXB : async(data)=>{
               const doc = await useNXBStore().updateNXB(data._id,data)
               alert(doc.message)
               location.reload(); 
           },
           deleteNXB : async(data)=>{
               const doc = await useNXBStore().deleteNXB(data._id)
               alert(doc.message);
               location.reload(); 
           },
           async getData(){
              
           },
           async validate () {
       const { valid } = await this.$refs.form.validate()

       if (valid) alert('Form is valid')
     },
     reset () {
       this.$refs.form.reset()
     },
       },
       mounted(){
           this.getData()
       }
   }
</script>