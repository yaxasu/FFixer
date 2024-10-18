import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://192.168.86.20:8000/api/v1';

interface RegisterResponse {
  message: string;
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
  

