import { useAuthStore } from "@/stores/auth"

export const authetication={
    async install(){
        const store = useAuthStore()
        try{
            await store.attempt()
            return 
        }catch(e){
            return 
        }
    }
}