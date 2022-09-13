import api from 'config/axios';
import { LoginResponse } from 'api/types';

export const registerUser = async (userData: {
  name: string;
  userName: string;
  password: string;
  repeatPassword: string;
  birthDate: string;
  email: string;
}) => {
  try {
    await api().post('user/register', userData);
    return false;
  } catch (e) {
    return true;
  }
};

export const logIn = (userData: { email: string; password: string }) => {
  try {
    return api()
      .post<LoginResponse>('user/login', userData)
      .then((res) => res.data);
  } catch (e) {
    console.error(e);
  }
};
