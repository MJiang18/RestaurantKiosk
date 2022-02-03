import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/forms/SignUp/SignUp';
import UpdateItem from './components/forms/foodForms/updateItem';
import Details from './components/forms/foodForms/Details';
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
          <Route path='/update/:id'   element={  <UpdateItem /> } />
          <Route path='/food/:id/edit'   element={  <Details /> } />
          <Route path='/menu' element={<MenuItems />} />
          <Route path='/addFoodpage' element={<CreateFood />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
