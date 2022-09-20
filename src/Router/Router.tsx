import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { user } from 'store';
import { protectedRoutes, openRoutes } from './routes';
import { Layout } from 'components';

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
          element={
            user.isAuth ? (
              <Layout>
                <Element />
              </Layout>
            ) : (
              <Navigate to='/signin' />
            )
          }
        />
      ))}
    </Routes>
  );
});
