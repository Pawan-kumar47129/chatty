
import {axiosInstance} from "../lib/axios.js"
class MessageService{
    async getUsers(){
        try {
            const response=await axiosInstance.get("/message/users");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Error occure in getUsers",error.message);
            return error.response.data;
        }
    }
}