export interface LoginResponse {
  id: string;
  email: string;
  token: string;
  name: string;
  userName: string;
  birthDate: string;
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
