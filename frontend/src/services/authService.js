import { axiosInstance } from "../lib/axios";

class AuthService{

    async checkAuth(){
        try {
            const response=await axiosInstance.get('/auth/check');
            return response.data;
        } catch (error) {
            console.log("checkAuth Services error :",error);
            return error.response.data;;
        }
    }
    async signup(data){
        try {
            const response=await axiosInstance.post('/auth/signup',data);
            return response.data;
        } catch (error) {
            console.log("signup authservice error ",error);
            return error.response.data;
        }
    }

    async login(data){
        try {
            const response=await axiosInstance.post('/auth/login',data);
            return response.data;
        } catch (error) {
            console.log("login authservice error ",error);
            return error.response.data;
        }
    }

    async logout(){
        try {
            const response=await axiosInstance.post('/auth/logout');
            return response.data;
        } catch (error) {
            console.log("login authservice error ",error);
            return error.response.data;
        }
    }

    async updateProfile(profilePic){
        console.log(profilePic);
        try {
            const response=await axiosInstance.put("/auth/update-profile",profilePic,{headers: { 'Content-Type': 'multipart/form-data' }});
            return response.data;

        } catch (error) {
            console.log("upadateProfile authservice error ",error);
            return error.response.data;
        }
    }
}

const authService=new AuthService();
export default authService;