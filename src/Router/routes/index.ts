//@ts-nocheck
import { Main, SignUp, SignIn } from 'pages';

export const protectedRoutes = [
  {
    path: '/',
    Element: Main,
  },
];

export const openRoutes = [
  {
    path: '/signin',
    Element: SignIn,
  },
  {
    path: '/signup',
    Element: SignUp,
  },
];
