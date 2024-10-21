import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://192.168.86.20:8000/api/v1';

interface RegisterResponse {
  message?: string;
}
interface LoginResponse {
  access_token?: string;
  token_type?: string;
  detail?: string;
}
interface UserInfo {
  email: string;
  phone_number: String;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  citizenship: String;
  latitude: Number;
  longitude: Number;
  verification_status: String;
}

export const checkEmail = async (email: string): Promise<boolean> => {
    try {
      // Make the axios request to your FastAPI endpoint
      const response = await axios.get<boolean>(`${API_BASE_URL}/check_user`, {
        params: { email },
      });
      
      // Return the boolean value (true if email exists, false otherwise)
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
};

export const registerUser = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password
    });
    return response.data; // Response should be "User registered successfully"
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
  
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/token`, {
      email,
      password
    });
    return response.data; // Should contain the access_token and token_type
  } catch (error) {
    // console.error("Error logging in user:", error);
    console.log("Error logging in user:", error)
    throw error;
  }
};

export const getUserInfo = async(token: string) => {
  try {
    const response: AxiosResponse<UserInfo> = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}` // Include JWT token in the request
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}
