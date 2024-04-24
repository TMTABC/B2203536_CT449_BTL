
<template>
    <v-sheet v-if="data" class="mx-auto" width="300">
<v-form ref="form">
    <v-text-field
      v-model="data[0].MaDocGia"
      :rules="otherRules"
      :counter="8"
      label="Mã độc giả"
      required
    ></v-text-field>
 <v-text-field
   v-model="data[0].MaSach"
   :rules="nameRules"
   label="Mã sách"
   required
 ></v-text-field>
 <v-text-field
   v-model="data[0].NgayMuon"
   :rules="otherRules"
   disabled
   label="Ngày mượn sách"
   required
 ></v-text-field>
 <v-text-field
   v-model="data[0].NgayTra"
   :rules="otherRules"
   label="Ngày trả sách"
   required
 ></v-text-field>
 <v-select
   v-model="data[0].DaTra"
   :rules="otherRules"
   :items="item"
   label="Trạng thái"
   required
 ></v-select>
 <v-btn
     class="mt-4"
     color="success"
     block
     @click="borrow(data[0])"
   >
     Trả sách
   </v-btn>
</v-form>
</v-sheet>
<div v-else></div>
</template>

<script>
import { useRouter } from "vue-router";
import { useBorrowStore } from "../stores/borrow";
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
     item:[
       "Chưa trả",
       "Đã trả",
       "Quá hạn"
     ],
       }),
       methods: {
           borrow : async(data)=>{
               const doc = await useBorrowStore().borrow(data._id)
               alert("Mượn thành công")
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