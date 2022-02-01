import React from 'react';
import SignUp from './components/forms/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Update from './components/forms/Update';
import Login from './components/forms/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
