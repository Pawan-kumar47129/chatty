import { axiosInstance } from "../lib/axios.js";
class MessageService {
  async getUsers(token) {
    try {
      console.log(token);
      const response = await axiosInstance.get(
        "/messages/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log("Error occure in getUsers ", error);
      return error?.response?.data;
    }
  }

  async getMessages(selectedUserId, token) {
    try {
      const response = await axiosInstance.get(
        `/messages/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("Error in getMessages Services ", error.message);
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }
  async sendMessage(selectedUserId, messageData, token) {
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        messageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("send Message services error", error.message);
      return error?.response?.data;
    }
  }
}

const messageService = new MessageService();

export default messageService;
