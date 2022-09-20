import { makeAutoObservable } from 'mobx';
import { logIn, getUser, findUser } from 'api';
import { initApi } from 'config/axios';
import { LoginResponse } from 'api/types';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  id: string | null = null;
  isAuth: boolean = false;
  email: string | null = null;
  avatar: string | null = null;
  name: string | null = null;
  userName: string | null = null;
  birthDate: string | null = null;

  private setUser(data: LoginResponse) {
    this.isAuth = true;
    this.id = data!.id;
    this.email = data!.email;
    this.name = data!.name;
    this.userName = data!.userName;
    this.birthDate = data!.birthDate;
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
    this.isAuth = false;
    this.email = null;
    this.name = null;
    this.userName = null;
    this.birthDate = null;
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
