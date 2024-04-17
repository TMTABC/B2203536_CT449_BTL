<template>
    <div >
        <InputGroup>
            <Button label="Search" @click="submit">
            </Button>
            <InputText placeholder="Keyword" @input="getSearch" 
        @keyup.enter="getSearch" :value="modelValue"/>
        </InputGroup>
    </div>
</template>
<script>
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    components:{
        InputGroup,
        InputText,
        Button
    },
    props:{
        modelValue:{type:String , default:""},
    },
    emits:["submit","update:modelValue"],
    methods: {
      getSearch(e) {
        this.$emit("update:modelValue",e.target.value)
        console.log("Giá trị của InputText là:", e.target.value);
      },
      submit(){
        this.$emit("submit");
      }
    }
  }
</script>