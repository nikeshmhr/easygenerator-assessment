import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Welcome from './welcome';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './signin';
import SignUp from './signup';
import PrivateRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Welcome />} />
        </Route>
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
