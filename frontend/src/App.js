import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import User from './User';

function App() {
  return (
    <div>
      {/* Wrap everything in BrowserRouter */}
      <Router>
        <Routes>
          {/* Ensure only <Route> components are children of <Routes> */}
          <Route path='/' element={<User />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/update/:id' element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
