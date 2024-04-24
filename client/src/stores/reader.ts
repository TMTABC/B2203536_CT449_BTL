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
        isReader:(state:State) => state.user?.MaDocGia? true:false,
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
        async getReaderLogin(){
            console.log("user",this.userDetail);
            return this.userDetail
        },
        async login(payload:LoginData){
            try{
                const {data} = await useApiPrivate().post(`/api/reader/login`,payload);
                console.log("asd",data.data)
                this.user= data.data
                this.accessToken=data?.access_token
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async logout(){
            try{
                const {data} = await useApi().post(`/api/auth/logout`);
                this.accessToken = ''
                this.user = {} as Reader
                return data
            }catch(error : Error | any){
                throw error.response.message
            }
        },
        async refresh(){
            try{
                const {data} = await useApiPrivate().post(`/api/auth/refresh`);
                this.accessToken = data?.access_token
                console.log(data)
                return data
            }catch(error : Error | any){
                throw error.response.message
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