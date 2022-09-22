import { makeAutoObservable } from 'mobx';
import { logIn, getUser, updateProfileData } from 'api';
import { initApi } from 'config/axios';
import { LoginResponse, UpdateUserData } from 'api/types';

export class User {
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
  city: string | null = null;
  country: string | null = null;
  gender: string | null = null;

  private setUser(data: LoginResponse) {
    this.isAuth = true;
    this.id = data!.id;
    this.email = data!.email;
    this.name = data!.name;
    this.userName = data!.userName;
    this.birthDate = data!.birthDate;
    this.gender = data!.gender;
    this.country = data!.country;
    this.city = data!.city;

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

  updateUserData(data: UpdateUserData, id: string) {
    return updateProfileData(data, id)
      .then(() => {
        Object.entries(data).forEach(([key, value]) => {
          (this[key as keyof User] as unknown) = value;
        });
        return { type: 'success', message: 'Данные успешно обновлены' };
      })
      .catch(() => ({ type: 'error', message: 'Неверный пароль' }));
  }
}

export const user = new User();
