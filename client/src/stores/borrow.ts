import {defineStore} from 'pinia'
import {useApi,useApiPrivate} from '@/composables/useApi'

export interface Borrow{
    MaSach:String,
    MaDocGia:String,
    NgayMuon:String,
    NgayTra:String,
    DaTra:String
}

export interface State{
    user:Borrow
}

export const useBorrowStore = defineStore('followBook', {
    state:() : State =>{
        return{
            user:{} as Borrow,
        }
    },
    getters:{
        userDetail:(state:State)=>state.user,
    },
    actions:{
        
        async createBorrow(payload:Borrow){
            try{
                const {data} = await useApi().post(`/api/followBook`,payload)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async getBorrow(payload:Borrow){
            try{
                const {data} = await useApi().get(`/api/followBook`,payload)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async updateBorrow(_id:any,payload:Borrow){
            try{
                const {data} = await useApi().put(`/api/followBook/${_id}`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async delete(_id:any){
            try{
                const {data} = await useApi().delete(`/api/followBook/${_id}`)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async borrow(_id:any){
            try{
                const {data} = await useApi().put(`/api/followBook/${_id}`)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
    }
})