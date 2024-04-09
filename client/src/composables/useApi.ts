import { useAuthStore } from '@/stores/auth';
import { axiosInstance,axiosPrivateInstance } from './../utils/axios';
import { watchEffect } from 'vue';
import type { AxiosInstance } from 'axios';


export function useApiPrivate():AxiosInstance{
    const authStore = useAuthStore()
    watchEffect(()=>{
        axiosInstance.interceptors.request.use(
            (config)=>{
                if(config.headers["Authorization"]){
                    config.headers['Authorization']=`Bearer ${authStore.accessToken}`
                }
                return config
            },
            (error)=>{Promise.reject(error)}
        )
        axiosInstance.interceptors.response.use(
            (response)=>response,
            async (error)=>{
                const prevRequest = error?.config
                if((error?.response?.status === 403|| error?.response?.status===401) && !prevRequest.sent){
                    prevRequest.send = true
                    await authStore.refresh()
                    prevRequest.headers['Authorization']= authStore.accessToken
                    return axiosInstance(prevRequest)             
                }
                return Promise.reject(error)
            }
        )
    })
    return axiosPrivateInstance
}

export function useApi(){
    return axiosInstance
}