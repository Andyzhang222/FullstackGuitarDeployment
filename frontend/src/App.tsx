// Import necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginSuccess from './components/LoginSuccess'; 
import ProtectedComponent from './components/ProtectedComponent';
import { AuthProvider } from './context/AuthContext';

// Define the main App component
const App: React.FC = () => {
  return (
    // Provide authentication context to the entire app
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Define routes for the application */}
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<MainPage />} />
            <Route path="/login" element={<MainPage />} />
            <Route path="/login-success" element={<LoginSuccess />} /> 
            <Route path="/protected" element={<ProtectedComponent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;