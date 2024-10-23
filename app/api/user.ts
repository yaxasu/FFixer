// api.js

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
  user_role: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  citizenship: string;
  latitude: number;
  longitude: number;
  verification_status: string;
}

interface CompleteProfileResponse {
  success: boolean;
  message: string;
}

interface ProfileData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  citizenship: string;
  locationGranted: boolean;
  latitude?: number;
  longitude?: number;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

interface UpdateProfileData {
  email?: string;
  phone_number?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  citizenship?: string;
  profile_picture_url?: string
}

export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get<boolean>(`${API_BASE_URL}/check_user`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
};

export const registerUser = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      `${API_BASE_URL}/register`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_BASE_URL}/token`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error logging in user:', error);
    throw error;
  }
};

export const getUserInfo = async (token: string): Promise<UserInfo> => {
  try {
    const response: AxiosResponse<UserInfo> = await axios.get(
      `${API_BASE_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// Add the completeProfile function
export const completeProfile = async (
  token: string,
  profileData: ProfileData
): Promise<CompleteProfileResponse> => {
  try {
    const response: AxiosResponse<CompleteProfileResponse> = await axios.post(
      `${API_BASE_URL}/complete_profile`,
      {
        phone_number: profileData.phoneNumber.replace(/\D/g, ''), // Remove formatting
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        date_of_birth: profileData.dateOfBirth,
        citizenship: profileData.citizenship,
        latitude: profileData.latitude,
        longitude: profileData.longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error completing profile:', error);
    throw error;
  }
};


export const updateProfile = async (
  token: string,
  profileData: UpdateProfileData
): Promise<UpdateProfileResponse> => {
  try {
    const response: AxiosResponse<UpdateProfileResponse> = await axios.post(
      `${API_BASE_URL}/update_profile`,
      {
        email: profileData.email,
        phone_number: profileData.phone_number?.replace(/\D/g, ''), // Remove formatting if phone number provided
        password: profileData.password,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        citizenship: profileData.citizenship,
        profile_picture_url: profileData.profile_picture_url
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/*

import { updateProfile } from './api';

const updateUserProfile = async () => {
  const token = 'your-auth-token-here'; // Retrieve from context/storage
  const profileData = {
    email: 'newemail@example.com',
    phoneNumber: '123-456-7890',
    password: 'newsecurepassword',
    firstName: 'NewFirstName',
    lastName: 'NewLastName',
    citizenship: 'CountryName',
  };

  try {
    const response = await updateProfile(token, profileData);
    console.log('Profile updated successfully:', response);
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};

*/