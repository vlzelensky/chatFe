//@ts-nocheck
import { Main, SignUp, SignIn, Profile, Conversation } from 'pages';

export const protectedRoutes = [
  {
    path: '/',
    Element: Main,
  },
  {
    path: '/profile',
    Element: Profile,
  },
  {
    path: '/conversation/:userId',
    Element: Conversation,
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
