import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInAndSignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
