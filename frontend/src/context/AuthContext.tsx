// Import necessary libraries and hooks
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

// Define the User interface to specify the shape of the user object
interface User {
  username: string;
  email: string;
}

// Define the AuthContextProps interface to specify the shape of the context value
interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null; 
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the AuthContext with an initial undefined value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // State to hold the user object
  const [user, setUser] = useState<User | null>(null);

  // Function to check the current user session
  const checkUserSession = async () => {
    try {
      // Get the current authenticated user
      const currentUser = await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
      setUser({
        username: currentUser.username,
        email: currentUser.attributes.email,
      });
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // useEffect hook to check the user session on component mount and set up event listeners
  useEffect(() => {
    checkUserSession();

    // Listen for authentication events
    Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signIn') {
        checkUserSession();
      } else if (event === 'signOut') {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, []);

  // Function to handle user login
  const login = async (username: string, password: string) => {
    await Auth.signIn(username, password);
    await checkUserSession();
  };

  // Function to handle user logout
  const logout = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  // Provide the authentication context to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};