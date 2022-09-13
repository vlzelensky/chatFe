import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from 'pages';

export const Router = () => {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};
