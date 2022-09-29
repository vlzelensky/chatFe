import { makeAutoObservable } from 'mobx';
import { logIn, getUser } from 'api';
import { initApi } from 'config/axios';
import { LoginResponse } from 'api/types';
import { Info } from './types';

class User {
  id: null | string;

  constructor() {
    makeAutoObservable(this);
    this.id = null;
  }

  info: Info = {
    isAuth: false,
    email: null,
    avatar: null,
    name: null,
    userName: null,
    birthDate: null,
  };

  private setUser(data: LoginResponse) {
    this.id = data!.id;
    this.info.isAuth = true;
    this.info.email = data!.email;
    this.info.name = data!.name;
    this.info.userName = data!.userName;
    this.info.birthDate = data!.birthDate;
    initApi(data!.token);
  }

  async signIn(userData: { password: string; email: string }) {
    try {
      const data = await logIn(userData);
      this.setUser(data);
      localStorage.setItem('token', data!.token);
    } catch {
      return 'Неправильный логин или пароль';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.info.isAuth = false;
    this.info.email = null;
    this.info.name = null;
    this.info.userName = null;
    this.info.birthDate = null;
  }

  async getUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = await getUser(token);
        this.setUser(data);
      } catch (e) {
        this.logout();
      }
    }
  }
}

export const user = new User();
