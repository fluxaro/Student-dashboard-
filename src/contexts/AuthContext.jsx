import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockStudent } from '../data/mockData';

const AuthContext = createContext(null);

const STORAGE_KEY = 'guild_auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return null;
    } catch (e) {
      console.error('Error loading auth from localStorage:', e);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error persisting auth state:', e);
    }
  }, [user]);

  /**
   * Log in the student and save user session.
   * @param {Object|string} studentData - Student object or email
   */
  const login = (studentData) => {
    const studentUser = typeof studentData === 'object' && studentData !== null
      ? studentData
      : {
          ...mockStudent,
          email: studentData || mockStudent.email,
        };
    setUser(studentUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
