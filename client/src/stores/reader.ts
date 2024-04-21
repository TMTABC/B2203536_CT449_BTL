import {defineStore} from 'pinia'
import {useApi,useApiPrivate} from '@/composables/useApi'

export interface Reader{
    MaDocGia:String,
    HoLot:String,
    Ten:String,
    NgaySinh:String,
    Phai:String,
    DiaChi:String,
    DienThoai:String
}

export interface State{
    user:Reader
    accessToken:string
}

export interface LoginData{
    MaDocGia:String
    password : String
}

export const useReaderStore = defineStore('reader', {
    state:() : State =>{
        return{
            user:{} as Reader,
            accessToken: "" as string,
        }
    },
    getters:{
        userDetail:(state:State)=>state.user,
    },
    actions:{
        async getReader(payload:Reader){
            try{
                const {data} = await useApi().get(`/api/reader`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async login(payload:LoginData){
            try{
                const {data} = await useApi().post(`/api/reader/login`,payload);
                console.log(data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async createReader(payload:Reader){
            try{
                console.log(payload);
                const {data} = await useApi().post(`/api/reader`,payload)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        
        async updateReader(_id:any,payload:Reader){
            try{
                const {data} = await useApi().put(`/api/reader/${_id}`,payload)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async deleteReader(_id:any){
            try{
                const {data} = await useApi().delete(`/api/reader/${_id}`)
                console.log("data ",data)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
    }
})