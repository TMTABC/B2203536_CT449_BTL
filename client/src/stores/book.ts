import {defineStore} from 'pinia'
import {useApi} from '@/composables/useApi'

export interface Book{
    MaSach:String,
  TenSach:String,
  DonGia:String,
  SoQuyen:String,
  NamXuatBan:String,
  MaNXB:String,
	TacGia:String
}

export interface State{
    user:Book
}

export const useBookStore = defineStore('book', {
    state:() : State =>{
        return{
            user:{} as Book,
        }
    },
    getters:{
        userDetail:(state:State)=>state.user,
    },
    actions:{
        
        async createBook(payload:Book){
            try{
                console.log(payload)
                const {data} = await useApi().post(`/api/book`,payload)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async getBook(payload:Book){
            try{
                const {data} = await useApi().get(`/api/book`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async updateBook(_id:any,payload:Book){
            try{
                const {data} = await useApi().put(`/api/book/${_id}`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async deleteBook(_id:any){
            try{
                const {data} = await useApi().delete(`/api/book/${_id}`)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
    }
})