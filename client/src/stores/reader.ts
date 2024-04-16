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
    MSNV:String
    password : String
}

export const useReaderStore = defineStore('reader', {
    state:() : State =>{
        return{
            user:{} as Reader,
            accessToken: "" as string,
            listReader:[] as Reader,
        }
    },
    getters:{
        userDetail:(state:State)=>state.user,
        listReaderData:(state:State)=>state.listReader
    },
    actions:{
        
        async createReader(payload:Reader){
            try{
                console.log(payload)
                const {data} = await useApi().post(`/api/reader`,payload)
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async getReader(payload:Reader){
            try{
                const {data} = await useApi().get(`/api/reader`)
                this.listReader = data;
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        
    }
})