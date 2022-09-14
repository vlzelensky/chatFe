import React, { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Router } from 'Router';
import { user } from 'store';

import 'antd/dist/antd.css';

const App = () => {
  useEffect(() => {
    user.getUser();
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
