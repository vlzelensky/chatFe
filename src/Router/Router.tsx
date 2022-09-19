import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { user } from 'store';
import { protectedRoutes, openRoutes } from './routes';
import { observer } from 'mobx-react-lite';

export const Router = observer(() => {
  return (
    <Routes>
      {openRoutes.map(({ path, Element }) => (
        <Route
          key={path}
          path={path}
          element={user.isAuth ? <Navigate to='/' /> : <Element />}
        />
      ))}
      {protectedRoutes.map(({ path, Element }) => (
        <Route
          key={path}
          path={path}
          element={user.isAuth ? <Element /> : <Navigate to='/signin' />}
        />
      ))}
    </Routes>
  );
});
