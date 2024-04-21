import {defineStore} from 'pinia'
import {useApi,useApiPrivate} from '@/composables/useApi'

export interface User{
    id:String,
    MSNV:String,
    HoTen:String,
    SoDienThoai:String,
    ChucVu:String,
    DiaChi:String
}

export interface State{
    user:User
    accessToken:string
}

export interface LoginData{
    MSNV:String
    password : String
}

export interface RegisterData{
    MSNV:String
    HoTen:String
    password : String
    password_confirm:String
    DiaChi:String
    SoDienThoai:String
    ChucVu:String
}

export const useAuthStore = defineStore('auth', {
    state:() : State =>{
        return{
            user:{} as User,
            accessToken: "" as string,
        }
    },
    getters:{
        userDetail:(state:State)=>state.user,
        isAuthenticated: (state:State) => state.user?.id? true:false,
        isStaff: (state:State) => state.user?.ChucVu? true:false
    },
    actions:{
        async attempt(){
            try{
                await this.refresh()
                await this.getUser()
            }catch(error){
                return error
            }
            return
        },
        async login(payload :LoginData){
            try{
                const {data} = await useApi().post(`/api/auth/login`,payload);
                console.log(data)
                this.accessToken=data?.access_token
                await this.getUser()
                return data
            }catch(error : Error | any){
                throw error.message
            }
        },
        async register(payload : RegisterData){
            try{
                const {data} = await useApi().post(`/api/auth/register`,payload);
                return data
            }catch(error : Error | any){
                throw error.response.message
            }
        },
        async getUser(){
            try{
                console.log(this.user)
                const {data} = await useApiPrivate().get(`/api/auth/user`);
                this.user = data
                return data
            }catch(error : Error | any){
                throw error.response.message
            }
        },
        async logout(){
            try{
                const {data} = await useApi().post(`/api/auth/logout`);
                this.accessToken = ''
                this.user = {} as User
                return data
            }catch(error : Error | any){
                throw error.response.message
            }
        },
        async refresh(){
            try{
                //const {data} = await useApiPrivate().post(`/api/auth/refresh`);
                this.accessToken = data?.access_token
                console.log(data)
                return data
            }catch(error : Error | any){
                throw error.response.message
            }
        }
    }
})