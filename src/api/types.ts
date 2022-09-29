export interface LoginResponse {
  id: string;
  email: string;
  token: string;
  name: string;
  userName: string;
  birthDate: string;
  gender: string;
  country: string;
  city: string;
}

export interface RegisterUserDataI {
  name: string;
  userName: string;
  password: string;
  repeatPassword?: string;
  birthDate: string;
  email: string;
}

export type LoginUserDataI = Pick<RegisterUserDataI, 'email' | 'password'>;

export interface UpdateUserData {
  email?: string;
  name?: string;
  userName?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  country?: string;
}

export interface UpdateDataResponse {
  message: string;
}
