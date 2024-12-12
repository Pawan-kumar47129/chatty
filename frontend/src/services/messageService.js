
import {axiosInstance} from "../lib/axios.js"
class MessageService{
    async getUsers(){
        try {
            const response=await axiosInstance.get("/messages/users");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Error occure in getUsers",error.message);
            return error.response.data;
        }
    }

    async getMessages(userId){
        try {
            const response=await axiosInstance.get(`/messages/${userId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Error in getMessages Services ",error.message);
            return error.response.data;
        }
    }
}

const messageService=new MessageService();

export default messageService;