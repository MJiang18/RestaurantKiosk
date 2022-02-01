import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/forms/SignUp';
import Update from './components/forms/Update';
import Login from './components/forms/Login';
import Main from './components/screens/Main';

import PrivateRoutes from './components/routes/PrivateRoutes';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/*' element={<PrivateRoutes />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
