import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const setToken = (token: string) => {
  storage.set('token', token);
};

export const getToken = () => {
  return storage.getString('token');
};

export const clearToken = () => {
  storage.delete('token');
};


export const setProfileData = (profileData: object) => {
  storage.set('profile', JSON.stringify(profileData));
};

export const getProfileData = () => {
  const profileString = storage.getString('profile');
  return profileString ? JSON.parse(profileString) : null;
};

export const clearProfileData = () => {
  storage.delete('profile');
};