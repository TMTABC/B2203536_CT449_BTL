import {defineStore} from 'pinia'
import {useApi,useApiPrivate} from '@/composables/useApi'

export interface NXB{
    maNXB:String,
    nameNXB:String,
    addressNXB:String,
}

export interface State{
    user:NXB
}

export const useNXBStore = defineStore('nxb', {
    state:() : State =>{
        return{
            user:{} as NXB,
        }
    },
    getters:{
        userDetail:(state:State)=>state.user,
    },
    actions:{
        
        async createNXB(payload:NXB){
            try{
                console.log(payload)
                const {data} = await useApi().post(`/api/nxb`,payload)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async getNXB(payload:NXB){
            try{
                const {data} = await useApi().get(`/api/nxb`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async updateNXB(_id:any,payload:NXB){
            try{
                const {data} = await useApi().put(`/api/nxb/${_id}`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async deleteNXB(_id:any){
            try{
                const {data} = await useApi().delete(`/api/nxb/${_id}`)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
    }
})