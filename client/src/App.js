import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/forms/SignUp/SignUp';
import Update from './components/forms/Update/Update';
import Login from './components/forms/Login/Login';
import Main from './components/screens/Main';
import MenuItems from './components/forms/foodForms/MenuItems';
import CreateFood from './components/forms/foodForms/createItems';

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
          <Route path='/menu' element={<MenuItems />} />
          <Route path='/addFoodpage' element={<CreateFood />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
