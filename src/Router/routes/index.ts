//@ts-nocheck
import { Main, SignUp, SignIn, Profile } from 'pages';

export const protectedRoutes = [
  {
    path: '/',
    Element: Main,
  },
  {
    path: '/profile',
    Element: Profile,
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
