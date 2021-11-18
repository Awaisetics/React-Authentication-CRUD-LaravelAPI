import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from "./Auth/Register";
import Login from "./Auth/Login";

import Students from './Pages/Students';
import AddStudent from './Pages/AddStudent';
import EditStudent from './Pages/EditStudent';

import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

          <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
          <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
          <Route path="/edit-student/:id" element={<PrivateRoute><EditStudent /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
