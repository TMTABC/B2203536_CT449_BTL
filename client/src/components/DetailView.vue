
<template>
     <v-sheet v-if="data" class="mx-auto" width="300">
<v-form ref="form">
  <v-text-field
    v-model="data[0].MaDocGia"
    :rules="nameRules"
    :counter="8"
    label="Mã độc giả"
    required
  ></v-text-field>
  <v-text-field
    v-model="data[0].HoLot"
    :rules="otherRules"
    label="Họ lót"
    required
  ></v-text-field>
  <v-text-field
    v-model="data[0].Ten"
    :rules="otherRules"
    label="Tên"
    required
  ></v-text-field>
  <v-text-field
    v-model="data[0].DiaChi"
    label="Địa chỉ"
    :rules="otherRules"
    required
  ></v-text-field>
  <v-text-field
    v-model="data[0].DienThoai"
    :counter="10"
    :rules="phoneRules"
    label="Điện thoại"
    required
  ></v-text-field>
  <!-- <v-text-field
    v-model="data[0].NgaySinh"
    label="Ngày sinh"
    required
  >
</v-text-field> -->
<div class="mb-3">
    <label for="ngaySinh" class="form-label">Ngày sinh:</label>
    <label for="ngaySinh" class="form-label">{{ data[0].NgaySinh }}</label>
    <input v-model="data[0].NgaySinh" type="date" class="form-control" id="ngaySinh" autocomplete="off">
</div>
  <v-select
    v-model="data[0].Phai"
    :items="items"
    :rules="[v => !!v || 'yêu cầu nhập giới tính']"
    label="Phai"
    required
  ></v-select>

  <div class="d-flex flex-column">
    <v-btn
      class="mt-4"
      color="success"
      block
      @click="updateReader(data[0])"
    >
      Cập nhật
    </v-btn>

    <v-btn
      class="mt-4"
      color="error"
      block
      @click="deleteReader(data[0])"
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
import { useReaderStore } from "../stores/reader";
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
        v => (v && v.length <= 8) || 'Name must be less than 8 characters',
      ],
      otherRules: [
        v => !!v || 'Chưa nhập',
      ],
      phoneRules: [
        v => !!v || 'yêu cầu nhập điện thoại',
        v => (v && v.length <= 10) || 'Name must be less than 10 number',
      ],
      select: null,
      items: [
        'Nữ',
        'Nam',
        'Không biết'
      ],
      checkbox: false,
            return: {
            }
        }),
       
        methods: {
            updateReader : async(data)=>{
                const doc = await useReaderStore().updateReader(data._id,data)
                alert(doc.message)
                location.reload(); 
            },
            deleteReader : async(data)=>{
                const doc = await useReaderStore().deleteReader(data._id)
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