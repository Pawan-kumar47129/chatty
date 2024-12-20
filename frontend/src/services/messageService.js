
import {axiosInstance} from "../lib/axios.js"
class MessageService{
    
    async getUsers({signal}){
        let a=async()=>{
           return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("hello");
            },2000)
           }) 
        }
        try {
            const response=await axiosInstance.get("/messages/users",{signal:signal});
            //await a();
            return response.data;
        } catch (error) {
            console.log("Error occure in getUsers",error.message);
            return error.response.data;
        }
    }

    async getMessages(selectedUserId){
        try {
            const response=await axiosInstance.get(`/messages/${selectedUserId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Error in getMessages Services ",error.message);
            console.log(error.response.data);
            return error.response.data;
        }
    }
    async sendMessage(selectedUserId,messageData){

        try {
            const response=await axiosInstance.post(`/messages/send/${selectedUserId}`,messageData,{headers:{'Content-Type':'multipart/form-data'}});
            return response.data;
        } catch (error) {
            console.log("send Message services error", error.message);
            return error.response.data;
        }
    }
}

const messageService=new MessageService();

export default messageService;