import api from 'config/axios';
import { LoginResponse, RegisterUserDataI, LoginUserDataI } from 'api/types';

export const registerUser = (userData: RegisterUserDataI) => {
  return api()
    .post('user/register', userData)
    .catch(() => 'Пользователь с такой почтой уже существует');
};

export const logIn = (userData: LoginUserDataI) => {
  return api()
    .post<LoginResponse>('user/login', userData)
    .then((res) => res.data);
};

export const getUser = (token: string) => {
  return api()
    .get<LoginResponse>('user/me', { headers: { Authorization: token } })
    .then((res) => res.data);
};
