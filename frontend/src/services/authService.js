import { axiosInstance } from "../lib/axios";

class AuthService {
  async checkAuth(token) {
    try {
      const response = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("checkAuth Services error :", error);
      if (!error.response) {
        return {
          success: false,
          message: "Network Error",
        };
      }
      return error.response.data;
    }
  }
  async signup(data) {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      console.log("signup authservice error ", error);
      if (!error.response) {
        return {
          success: false,
          message: "Network Error or Server Error!",
        };
      }
      return error.response.data;
    }
  }

  async login(data) {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    } catch (error) {
      console.log("login authservice error ", error);
      if (!error.response) {
        return {
          success: false,
          message: "Network Error or Server Error!",
        };
      }
      return error.response.data;
    }
  }

  async logout() {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.log("login authservice error ", error);
      if (!error.response) {
        return {
          success: false,
          message: "Network Error or Server Error!",
        };
      }
      return error.response.data;
    }
  }

  async updateProfile(profilePic, token) {
    try {
      const response = await axiosInstance.put(
        "/auth/update-profile",
        { profilePic, token },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("upadateProfile authservice error ", error);
      return error.response.data;
    }
  }
}

const authService = new AuthService();
export default authService;
