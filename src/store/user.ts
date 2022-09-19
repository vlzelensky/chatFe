import { makeAutoObservable } from 'mobx';
import { logIn, getUser } from 'api';
import { initApi } from 'config/axios';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  isAuth: boolean = false;
  email: string | null = null;
  name: string | null = null;
  userName: string | null = null;
  birthDate: string | null = null;

  async signIn(userData: { password: string; email: string }) {
    try {
      const data = await logIn(userData);
      this.isAuth = true;
      this.email = data!.email;
      this.name = data!.name;
      this.userName = data!.userName;
      this.birthDate = data!.birthDate;
      localStorage.setItem('token', data!.token);
      initApi(data!.token);
    } catch {
      return 'Неправильный логин или пароль';
    }
  }

  async getUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = await getUser(token);
        this.isAuth = true;
        this.email = data!.email;
        this.name = data!.name;
        this.userName = data!.userName;
        this.birthDate = data!.birthDate;
        initApi(data!.token);
      } catch (e) {
        localStorage.removeItem('token');
        this.isAuth = false;
        this.email = null;
        this.name = null;
        this.userName = null;
        this.birthDate = null;
      }
    }
  }
}

export const user = new User();
