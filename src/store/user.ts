import { makeAutoObservable } from 'mobx';
import { logIn } from 'api';
import { initApi } from 'config/axios';

class User {
  constructor() {
    makeAutoObservable(this);
  }
  email: string | null = null;
  name: string | null = null;
  userName: string | null = null;
  birthDate: string | null = null;

  async signIn(userData: { password: string; email: string }) {
    const data = await logIn(userData);
    this.email = data!.email;
    this.name = data!.name;
    this.userName = data!.userName;
    this.birthDate = data!.birthDate;
    localStorage.setItem('token', data!.token);
    initApi(data!.token);
  }
}

export const user = new User();
